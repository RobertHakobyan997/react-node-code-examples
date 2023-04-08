import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { chain, findIndex, groupBy, isEmpty, map, orderBy } from 'lodash';
import { Timing } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/timing.decorator';
import { Directions, ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import HolidayCalendarDate from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-date';
import Validation from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/validation';
import { ObjectId } from 'mongodb';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { EventsService } from '../events/events.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { FileTypesService } from '../file-types/file-types.service';
import { EntityTypesService } from '../entity-types/entity-types.service';
import { RegionsService } from '../regions/regions.service';
import { CountriesService } from '../countries/countries.service';
import { ProcessingStatusesService } from '../processing-statuses/processing-statuses.service';
import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { FilesService } from '../files/files.service';
import { dateFormat, getDateFromIso, periodPreviousDays, periodRemainingDays } from '../../core/utils/luxon';
import { paginate } from '../../core/utils/paginate';
import { getAllYearsHolidays } from '../holiday-calendars/pure/holiday-calendars.pure';
import { getLastProcessedFiles } from '../files/pure/files.pure';

import {
  filterMetadata,
  getRecordWithSuppliers,
  getReferenceMetadata,
  getScheduleEvent,
  getScheduleTableFields,
  mapDisplayKeys,
  mapScheduleToUtc,
  metadataMapper,
  nonWorkingDays,
  reorderMetadata,
  sortBy,
  sortByDayOfTheWeek,
  replaceKeys,
  joinMetadataWithLatestProcessedFile
} from './pure/files-metadata.pure';
import { FilesMetadataFilter } from './types/files-metadata-filter.interface';
import { CUSTOM_SORT_FIELDS } from './constants/files-metadata-fields.consts';
import { FilesMetadataDal } from './files-metadata.dal';
import { PartialFilesMetadata } from './files-metadata.controller';

@Injectable()
export class FilesMetadataService {
  constructor(
    private readonly dal: FilesMetadataDal,
    private readonly holidayCalendarsService: HolidayCalendarsService,
    private readonly eventsService: EventsService,
    private readonly suppliersService: SuppliersService,
    private readonly fileTypesService: FileTypesService,
    private readonly entityTypesService: EntityTypesService,
    private readonly regionsService: RegionsService,
    private readonly countryService: CountriesService,
    private readonly processingStatusesService: ProcessingStatusesService,
    private readonly scheduleStatusesService: ScheduleStatusesService,
    private readonly filesService: FilesService,
  ) {
  }

  @Timing
  findAll(filter: FilterQuery<Document<FilesMetadata>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  @Timing
  async importData(metadata: FilesMetadata[], omitKeys = '') {
    if (isEmpty(metadata)) metadata = await getReferenceMetadata();
    const keysToOmit = omitKeys.split(',').map(key => key.trim());
    const oldData = await this.dal.findAll({}, {}, { lean: true });
    const merged = metadata.map(m => {
      const oldM = oldData.find(o => o._id.toString() === m._id.toString());
      if (!oldM) return m;

      const resultM = {};
      const allKeys = Object.keys(m);
      allKeys.forEach(key => {
        if (keysToOmit.includes(key)) {
          resultM[key] = oldM[key] ?? m[key];
        } else {
          resultM[key] = m[key];
        }
      });
      return resultM;
    }) as FilesMetadata[];
    await this.dal.dropCollection();
    return this.dal.insert(merged);
  }

  @Timing
  async importDataOld(metadata: FilesMetadata[]) {
    if (isEmpty(metadata)) metadata = await getReferenceMetadata();
    const oldData = await this.dal.findAll({}, {}, { lean: true });
    const newData = metadata.map(({ state, holidayCalendarId, contacts, ...data }) => {
      const oldMetadata = chain(oldData).find(({ _id }: FilesMetadata) => _id.equals(data._id));
      return {
        ...data,
        state            : oldMetadata.get('state', state).value(),
        contacts         : oldMetadata.get('contacts', contacts).value(),
        holidayCalendarId: oldMetadata.get('holidayCalendarId', holidayCalendarId).value(),
      };
    });
    await this.dal.dropCollection();
    return this.dal.insert(newData);
  }

  @Timing
  async exportData(sort: string) {
    return reorderMetadata(await this.dal.findAll({}, { _id: sort }, { lean: true }));
  }

  async getFileMetadata(id: string) {
    return this.dal.findById(id, {}, { lean: true });
  }

  @Timing
  async getNextWorkingDay(id: string, startDate: string, format: string) {
    try {
      const fileMetadata = await this.dal.findById(id, {}, { lean: true });
      const holidayCalendarId = fileMetadata.holidayCalendarId?.toString();
      let listOfHolidays: HolidayCalendarDate[] = [];

      const parsedDate = getDateFromIso(startDate, (format ?? dateFormat));
      if (holidayCalendarId) {
        const calendar = await this.holidayCalendarsService.getHolidayCalendar(holidayCalendarId);
        listOfHolidays = getAllYearsHolidays(calendar.listOfHolidays);
      }

      const date = chain(periodRemainingDays(parsedDate))
        .filter(d => !nonWorkingDays(fileMetadata, listOfHolidays, parsedDate).includes(d))
        .first()
        .value();
      return { date };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Timing
  async getLastWorkingDay(id: string, todayDate: string, format: string) {
    try {
      const fileMetadata = await this.dal.findById(id);
      const holidayCalendarId = fileMetadata.holidayCalendarId?.toString();
      let listOfHolidays: HolidayCalendarDate[] = [];

      const parsedDate = getDateFromIso(todayDate, (format ?? dateFormat));
      if (holidayCalendarId) {
        const calendar = await this.holidayCalendarsService.getHolidayCalendar(holidayCalendarId);
        listOfHolidays = getAllYearsHolidays(calendar.listOfHolidays);
      }

      const date = chain(periodPreviousDays(parsedDate))
        .filter(d => !nonWorkingDays(fileMetadata, listOfHolidays, parsedDate).includes(d))
        .last()
        .value();
      return { date };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  create(metadata: FilesMetadata[]) {
    return this.dal.insert(metadata);
  }

  update(id: string, metadata: PartialFilesMetadata) {
    return this.dal.updateOne(id, metadata);
  }

  patch(id: string, metadata: PartialFilesMetadata) {
    return this.dal.findByIdAndUpdate(id, metadata);
  }

  updateMany(filter: FilterQuery<Document<FilesMetadata>> = {}, doc: UpdateQuery<FilesMetadata>) {
    return this.dal.updateMany(filter, doc);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }

  getStaticData() {
    return Promise.all<Enum[]>([
      this.suppliersService.findAll({}, {}, { lean: true }),
      this.fileTypesService.findAll({}, {}, { lean: true }),
      this.entityTypesService.findAll({}, {}, { lean: true }),
      this.regionsService.findAll({}, {}, { lean: true }),
      this.countryService.findAll({}, {}, { lean: true }),
      this.processingStatusesService.findAll({}, {}, { lean: true }),
      this.scheduleStatusesService.findAll({}, {}, { lean: true }),
    ]);
  }

  getScheduleData() {
    return Promise.all([
      this.dal.findAll({ isEnabled: true, isMaster: true }, { 'sourceFileData.uploadedDate': -1 }, { lean: true }),
      this.filesService.findAll(
        { 'sourceFileData.fileDirection': Directions.inbound },
        { 'mosDocumentData.uploadDate': -1 },
        { lean: true }
      ),
      this.suppliersService.findAll({}, {}, { lean: true }),
      this.holidayCalendarsService.findAll({}, {}, { lean: true }),
    ]);
  }

  getSchedule() {
    return from(this.eventsService.create(getScheduleEvent() as any))
      .pipe(
        switchMap(() => from(this.getScheduleData())),
        getRecordWithSuppliers()
      );
  }

  async getHolidayCalendar(id: string) {
    try {
      const fileMetadata = await this.dal.findById(id);
      const holidayCalendarId = fileMetadata?.holidayCalendarId?.toString();
      return holidayCalendarId ? this.holidayCalendarsService.getHolidayCalendar(holidayCalendarId) : {};
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getMetadaByRelatedFileDocumentId(documentId: string) {
    const relatedFile = await this.filesService.getLatestFileByDocumentId(documentId);
    if (!relatedFile) throw new BadRequestException(`There is no file in database with following document id: ${documentId}`);

    return this.getFileMetadata(relatedFile.filesMetadataId.toString());
  }

  @Timing
  async sorted({ statuses, field, sortOrder, limit, offset, received, isEnabled }: FilesMetadataFilter) {
    // TODO: fix filter types (possibly on UI)
    const isEnabledFilter = isEnabled === '' ? {} : { isEnabled: isEnabled === 'true' };
    const filter = {
      isMaster              : true,
      'state.scheduleStatus': { $in: statuses },
      ...isEnabledFilter
    };
    const metadata = await this.dal.findAll(filter, {}, { lean: true });
    const calendars = await this.holidayCalendarsService.getHolidayCalendars(map(metadata, 'holidayCalendarId'));
    const filesMetadata = getScheduleTableFields(metadata as any, calendars);
    const sortedFilesMetadata = field === CUSTOM_SORT_FIELDS.DAY_OF_THE_WEEK
      ? sortByDayOfTheWeek(filesMetadata, sortOrder)
      : filesMetadata;
    const mapped = mapScheduleToUtc(sortedFilesMetadata);
    const staticData = await this.getStaticData();
    const ordered = orderBy(metadataMapper(mapped, staticData), sortBy(field), sortOrder as any);
    const filtered = filterMetadata(ordered as any, received);
    return paginate(filtered, { limit: (limit ?? 50), offset: (offset ?? 0) }); // HOTFIX
  }

  async getDetailedFileMetadata(id: string) {
    const metadata = await this.dal.findById(id, {}, { lean: true });
    const staticData = await this.getStaticData();
    return replaceKeys(metadata, staticData);
  }

  @Timing
  async getScheduleStatuses() {
    const metadata = await this.dal.findAll({ isMaster: true });
    const all = metadata.length;
    const groupedStatuses = groupBy(metadata.map(({ state }) => state.scheduleStatus));
    const onTime = groupedStatuses[ScheduleStatus.onTime]?.length ?? 0;
    const onSchedule = groupedStatuses[ScheduleStatus.onSchedule]?.length ?? 0;
    const late = groupedStatuses[ScheduleStatus.late]?.length ?? 0;
    const alert = groupedStatuses[ScheduleStatus.alert]?.length ?? 0;
    return {
      all,
      [ScheduleStatus.onTime]: onTime + onSchedule,
      [ScheduleStatus.late]  : late,
      [ScheduleStatus.alert] : alert,
    };
  }

  getFilesMetadataByIds(filesMetadataIds: string) {
    const metadataIds = chain(filesMetadataIds)
      .split(',')
      .uniq()
      .map(metadataId => {
        if (!ObjectId.isValid(metadataId)) {
          throw new BadRequestException('Incorrect metadataId');
        }
        return new ObjectId(metadataId);
      })
      .value();

    return Promise.all([
      this.dal.findAll(
        { _id: { $in: metadataIds } },
        {},
        { lean: true }
      ),
      this.filesService.findAll(
        { 'sourceFileData.fileDirection': Directions.inbound },
        { 'mosDocumentData.uploadDate': -1 },
        { lean: true }
      ),
    ]).then(([ metadata, files ]) =>
      joinMetadataWithLatestProcessedFile(metadata, getLastProcessedFiles(files))
    );
  }

  async deleteContacts(deletedContactId: string) {
    if (!ObjectId.isValid(deletedContactId)) {
      throw new BadRequestException('Incorrect deletedContactId');
    }

    const deletedContactObjectId = new ObjectId(deletedContactId);

    return this.dal.updateMany(
      { contacts: { $in: [ deletedContactObjectId ] } },
      { $pull: { contacts: deletedContactObjectId } }
    );
  }

  async updateContacts(contactId: string, filesMetadataIds: string[]) {
    await this.deleteContacts(contactId);

    await this.dal.updateMany(
      { _id: { $in: filesMetadataIds } },
      { $push: { contacts: contactId } }
    );
  }

  async updateValidation(id, validation: Validation) {
    const metadata = await this.dal.findById(id, { id: 0 }, { lean: true });
    const index = findIndex(metadata.validations, { validationName: validation.validationName });
    metadata.validations[index] = validation;
    return this.dal.updateOne(id, { validations: metadata.validations });
  }

  async updateNotificationEmails(id: string, key: string, emails: string[]) {
    const prev = await this.dal.findById(id);
    if (!prev || !prev.notification.some(notification => notification.notificationKey === key)) {
      throw new BadRequestException(`File Metadata with id ${id} and ${key} notification does not exist in the database`);
    }
    return this.dal.patchOne(id,
      { _id: new ObjectId(id), 'notification.notificationKey': key },
      { $set: { 'notification.$.notificationIds': emails } }
    );
  }

  async updateHolidayCalendars(holidayCalendarId: string, newHolidayCalendarId: string) {
    if (!ObjectId.isValid(holidayCalendarId)) {
      throw new BadRequestException('Incorrect holidayCalendarId');
    }

    const holidayCalendarObjectId = new ObjectId(holidayCalendarId);
    const newHolidayCalendarObjectId = ObjectId.isValid(newHolidayCalendarId)
      ? new ObjectId(newHolidayCalendarId)
      : await this.holidayCalendarsService
        .findOne({ isDefault: true })
        .then(res => res._id);

    return this.dal.updateMany(
      { holidayCalendarId: { $eq: holidayCalendarObjectId } },
      { $set: { holidayCalendarId: newHolidayCalendarObjectId } }
    );
  }

  async getFilesMetadataBySupplier(supplier: string) {
    const fieldsToInclude = [
      '_id',
      'supplier',
      'country',
      'fileType',
      'fileMask',
      'contacts'
    ];
    const metadata = await this.dal.findAll({ supplier }, {}, { lean: true }, fieldsToInclude);
    const [ suppliers, fileTypes, , , countries ] = await this.getStaticData();
    return metadata.map(doc => ({
      ...doc,
      supplier: mapDisplayKeys(suppliers, doc.supplier),
      fileType: mapDisplayKeys(fileTypes, doc.fileType),
      country : mapDisplayKeys(countries, doc.country),
    }));
  }
}
