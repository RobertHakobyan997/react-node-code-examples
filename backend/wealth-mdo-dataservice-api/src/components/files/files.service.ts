import { Document, FilterQuery, PaginateResult } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { chain, compact, groupBy, map, orderBy, mapValues, isEmpty } from 'lodash';
import { Directions, Status, EventChannel, EventSource } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { Timing } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/timing.decorator';
import { DateTime } from 'luxon';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { merge } from '../../core/utils/lodash';
import { fromFormat, now, scheduleTimeFormat } from '../../core/utils/luxon';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { isNonDailyMetadata } from '../../core/utils/types';
import { SuppliersService } from '../suppliers/suppliers.service';
import { FileDirectionsService } from '../file-directions/file-directions.service';
import { EntityTypesService } from '../entity-types/entity-types.service';
import { RegionsService } from '../regions/regions.service';
import { ProcessingStatusesService } from '../processing-statuses/processing-statuses.service';
import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { getYearHolidays } from '../holiday-calendars/pure/holiday-calendars.pure';
import { FileTypesService } from '../file-types/file-types.service';
import { EventsService } from '../events/events.service';

import { FilesDal } from './files.dal';
import { FileStatusCalculation } from './types/file-status-calculation.interface';
import { FileFilterRequest } from './types/file-filter.interface';
import {
  calculateDate,
  calculateStatusForTimeBoundaries,
  calculateWorkingDays,
  filesMapper,
  getDateFilter,
  getFilesSortingIteratee,
  getMasterFileIds,
  getProcessingStatus,
  mapFilterOptions,
} from './pure/files.pure';
import { PartialFiles } from './files.controller';

@Injectable()
export class FilesService {
  constructor(
    private readonly dal: FilesDal,
    private readonly holidayCalendarsService: HolidayCalendarsService,
    private readonly suppliersService: SuppliersService,
    private readonly fileTypesService: FileTypesService,
    private readonly fileDirectionsService: FileDirectionsService,
    private readonly entityTypesService: EntityTypesService,
    private readonly regionsService: RegionsService,
    private readonly processingStatusesService: ProcessingStatusesService,
    private readonly scheduleStatusesService: ScheduleStatusesService,
    private readonly eventsService: EventsService
  ) {
  }

  @Timing
  findAll(filter: FilterQuery<Files & Document> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  @Timing
  async getStatusData(direction: Directions = Directions.inbound) {
    const files = await this.dal.findAll({ 'sourceFileData.fileDirection': direction });
    const all = files.length;
    const filesByStatus = groupBy(files, 'state.processingStatus');
    const success =
      (filesByStatus[Status.success]?.length || 0) +
      (filesByStatus[Status.successNoOutput]?.length || 0) +
      (filesByStatus[Status.successFileSaved]?.length || 0);
    const failed = filesByStatus[Status.failed]?.length || 0;
    const inProgress =
      (filesByStatus[Status.inProgress]?.length || 0) +
      (filesByStatus[Status.resend]?.length || 0) +
      (filesByStatus[Status.reprocess]?.length || 0);
    const technicalError = filesByStatus[Status.technicalError]?.length || 0;
    const finishedWithErrors = filesByStatus[Status.finishedWithErrors]?.length || 0;
    const waitingToBeProcessed = filesByStatus[Status.waitingToBeProcessed]?.length || 0;
    return {
      all,
      success,
      failed,
      inProgress,
      technicalError,
      finishedWithErrors,
      waitingToBeProcessed
    };
  }

  @Timing
  async getSortedFiles(
    field: string,
    sortOrder: string,
    status: string,
    fileDirection: string,
    limit = 50,
    offset = 0,
    queryString = '',
  ) {
    const files = await this.dal.paginate(
      {
        'state.processingStatus'      : getProcessingStatus(status),
        'sourceFileData.fileDirection': fileDirection,
        $or                           : [
          { 'sourceFileData.fileName': { $regex: queryString, $options: 'i' } },
          { 'masterFileName': { $regex: queryString, $options: 'i' } }
        ],
      },
      {
        sort     : { [field]: sortOrder },
        collation: {
          locale: 'en'
        },
        limit,
        offset,
        lean: true,
      },
    );
    return this.filesMapping(files, { field, sortOrder });
  }

  // ToDo: refactor and extend errorFile logic to outbound
  @Timing
  async getFilteredFiles(filterRequest: FileFilterRequest) {
    const { quickFilter } = filterRequest.filterOptions;
    const filterQuery = mapFilterOptions(filterRequest.filterOptions);
    const dateFilter = getDateFilter(quickFilter);

    const [
      hiddenFileTypes,
      hiddenFileDirections,
      hiddenScheduleStatuses,
    ] = await Promise.all([
      this.fileTypesService.findAll({ hidden: true }),
      this.fileDirectionsService.findAll({ hidden: true }),
      this.scheduleStatusesService.findAll({ hidden: true }),
    ]);

    const hiddenFilters = {
      'sourceFileData.fileType'     : { $nin: map(hiddenFileTypes, 'key') },
      'sourceFileData.fileDirection': { $nin: map(hiddenFileDirections, 'key') },
      'state.scheduleStatus'        : { $nin: map(hiddenScheduleStatuses, 'key') },
    };

    const files = await this.dal.paginate(
      {
        'sourceFileData.fileName': { $regex: filterRequest.fileName, $options: 'i' },
        ...merge(filterQuery, hiddenFilters),
        ...dateFilter,
      },
      {
        sort  : { [filterRequest.field]: filterRequest.sortOrder },
        limit : filterRequest.limit,
        offset: filterRequest.offset,
        lean  : true,
      },
    );
    return this.filesMapping(files, filterRequest);
  }

  async create(body: Files) {
    return this.dal.insertOne(body);
  }

  @Timing
  getRecentFile(fileName: string) {
    return this.dal.findOne({ 'sourceFileData.fileName': fileName }, { 'sourceFileData.uploadedDate': -1 });
  }

  getFilesByStatus(processingStatus: string) {
    const filter = { 'state.processingStatus': processingStatus };
    return this.dal.findAll(filter, { 'mosDocumentData.uploadDate': -1 }, { lean: true });
  }

  getLastProcessedFile(filesMetadataId: string, findSuccessful = false) {
    const filter = {
      filesMetadataId                 : new ObjectId(filesMetadataId),
      'sourceFileData.fileDirection'  : Directions.inbound,
      'sourceFileData.numberOfRecords': { $gt: 0 }
    };

    if (findSuccessful) {
      filter['state.processingStatus'] = { $in: [ Status.success, Status.finishedWithErrors ] };
    }
    return this.dal.findOne(filter, { 'mosDocumentData.uploadDate': -1 });
  }

  @Timing
  getLatestFileByDocumentId(documentId: string) {
    const filter = { 'mosDocumentData.documentId': new ObjectId(documentId) };
    return this.dal.findOne(
      filter,
      { 'sourceFileData.uploadedDate': -1 },
      { lean: true }
    );
  }

  async getLastFilesByMetadataIds(filesMetadataIds: string) {
    const metadataIds = chain(filesMetadataIds)
      .split(',')
      .uniq()
      .map(
        metadataId => {
          if (!ObjectId.isValid(metadataId)) {
            throw new BadRequestException('Incorrect metadataId');
          }
          return new ObjectId(metadataId);
        }
      )
      .value();
    const filter = {
      filesMetadataId               : { $in: metadataIds },
      'sourceFileData.fileDirection': Directions.inbound,
    };
    const files = await this.dal.findAll(filter, { 'mosDocumentData.uploadDate': -1 }, { lean: true });
    const latestFiles = metadataIds
      .map(
        metadata => files.find(({ filesMetadataId }) => filesMetadataId.equals(metadata))
      );
    return compact(latestFiles);
  }

  update(id: string, file: PartialFiles) {
    return this.dal.updateOneOrFail(id, file);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }

  getFile(fileId: string) {
    return this.dal.findById(fileId);
  }

  @Timing
  getFilesByMetadataId(filesMetadataId: string) {
    return this.dal.findAll({ filesMetadataId: new ObjectId(filesMetadataId) });
  }

  @Timing
  getFileByMasterFileId(masterFileId: string) {
    return this.dal.findAll({ masterFileId: new ObjectId(masterFileId) });
  }

  async calculateStatus(body: FileStatusCalculation) {
    const currentDate = now();
    const { frequency } = body;
    return {
      scheduleStatus: isNonDailyMetadata(frequency)
        ? await this.calculateStatusForMonthlyFiles(body, currentDate)
        : this.calculateStatusForNonMonthlyFiles(body, currentDate)
    };
  }

  calculateStatusForNonMonthlyFiles(body: FileStatusCalculation, currentDate: DateTime) {
    const { endOfOnTime, endOfLate, received }: FileStatusCalculation = body;
    const onTimeDate = fromFormat(endOfOnTime.time, scheduleTimeFormat);
    const lateDate = fromFormat(endOfLate.time, scheduleTimeFormat);
    return calculateStatusForTimeBoundaries(currentDate, onTimeDate, lateDate, received);
  }

  async calculateStatusForMonthlyFiles(body: FileStatusCalculation, currentDate: DateTime) {
    const { startDay, endOfOnTime, endOfLate, received, isBusinessDay, holidayCalendarId } = body;
    const listOfHolidays = holidayCalendarId
      ? getYearHolidays((await this.holidayCalendarsService.getHolidayCalendar(holidayCalendarId))?.listOfHolidays)
      : [];

    const endOfOnTimeWorkDays = calculateWorkingDays(endOfOnTime, startDay, currentDate, listOfHolidays, isBusinessDay);
    const endOfLateWorkDays = calculateWorkingDays(endOfLate, startDay, currentDate, listOfHolidays, isBusinessDay);

    const onTimeDate = calculateDate(endOfOnTime, endOfOnTimeWorkDays, isBusinessDay);
    const lateDate = calculateDate(endOfLate, endOfLateWorkDays, isBusinessDay);

    return calculateStatusForTimeBoundaries(currentDate, onTimeDate, lateDate, received);
  }

  getStaticData() {
    return Promise.all<Enum[]>([
      this.suppliersService.findAll({}, {}, { lean: true }),
      this.fileTypesService.findAll({}, {}, { lean: true }),
      this.fileDirectionsService.findAll({}, {}, { lean: true }),
      this.entityTypesService.findAll({}, {}, { lean: true }),
      this.regionsService.findAll({}, {}, { lean: true }),
      this.processingStatusesService.findAll({}, {}, { lean: true }),
      this.scheduleStatusesService.findAll({}, {}, { lean: true }),
    ]);
  }

  async getLatestTechnicalErrors(fileIds: string[], filesMetadataIds: string[]) {
    const technicalErrors = await this.eventsService.findAll({
      source              : EventSource.Camunda,
      collectionId        : { $in: filesMetadataIds },
      channel             : { $in: [ EventChannel.CamundaWorkflowFailed, EventChannel.CamundaWorkTimeout ] },
      'data.inboundFileId': { $in: fileIds }
    }, {
      createdAt: -1
    });
    const processInstanceIds = technicalErrors.map(error => error.data['processInstanceId']);
    const snapLogicErrors = await this.eventsService.findAll({
      collectionId            : { $in: filesMetadataIds },
      channel                 : { $in: [ EventChannel.SnaplogicError ] },
      'data.camundaInstanceId': { $in: processInstanceIds }
    }, {
      createdAt: -1
    });
    const realErrors = technicalErrors.map(camundaError => {
      const error = snapLogicErrors.find(item => camundaError.data['processInstanceId'] === item.data['camundaInstanceId']);
      return isEmpty(error)
        ? camundaError
        : { ...error, data: { ...error.data, inboundFileId: camundaError.data['inboundFileId'] } };
    });
    const groupedTechnicalErrors = groupBy(realErrors, 'data.inboundFileId');
    return mapValues(groupedTechnicalErrors, value => value[0]); // TODO: think on it
  }

  async filesMapping(files: PaginateResult<Files>, { field, sortOrder }) {
    const staticData = await this.getStaticData();
    const masterFileIds = getMasterFileIds(files);
    const masterFiles = await this.dal.findAll({
      'sourceFileData.fileDirection': {
        $in: [ Directions.inbound, Directions.error ]
      },
      masterFileId: { $in: masterFileIds },
    });
    const latestTechnicalErrors = await this.getLatestTechnicalErrors(
      files.docs.map(doc => doc._id.toString()),
      files.docs.map(doc => doc.filesMetadataId.toString()),
    );
    files.docs = orderBy(
      filesMapper(files.docs, staticData, masterFiles, latestTechnicalErrors),
      getFilesSortingIteratee(field),
      sortOrder
    );
    return files;
  }
}
