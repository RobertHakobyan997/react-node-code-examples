import { cloneDeep } from 'lodash';
import { Directions, ScheduleStatus, Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { InternalServerErrorException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';

import {
  testFile,
  testFileFilter,
  testFilesList,
  testFilesStatuses,
  testPaginatedSortedFileList,
  testPaginateFiles,
} from '../../../test/data/documents/test-file.const';
import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';
import { fileTypes } from '../../../test/data/file-types/file-types.const';
import { fileDirections } from '../../../test/data/file-directions.const';
import { entityTypes } from '../../../test/data/entity-types/entity-types.const';
import { regions } from '../../../test/data/regions/regions.const';
import { processingStatuses } from '../../../test/data/processing-statuses/processing-statuses.const';
import { testScheduleStatuses } from '../../../test/data/files-metadata/test-schedule-statuses.const';
import {
  getFileStatusCalculationAlertDaily,
  getFileStatusCalculationAlertMonthly,
  getFileStatusCalculationBase,
  getFileStatusCalculationLateDaily,
  getFileStatusCalculationLateMonthly,
} from '../../../test/data/files/file-status-calculation.const';
import { testHolidayCalendars } from '../../../test/holiday-calendars/holiday-calendars.const';
import * as luxon from '../../core/utils/luxon';
import { testEvents } from '../../../test/data/events/test-events.const';

import * as filesPure from './pure/files.pure';
import { assert } from './files.service.spec-setup';
import { FilesService } from './files.service';
import { FileStatusCalculation } from './types/file-status-calculation.interface';

describe('Files service: ', () => {
  const testFileId = testFile._id.toString();
  let filesService: FilesService;
  let currentDate: DateTime;

  beforeEach(async () => {
    currentDate = luxon.now().set({ hour: 6 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    filesService = await assert();
  });

  describe('getFiles', () => {
    it('should return list of files', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(testFilesList as any);
      const res = await filesService.findAll();
      expect(res).toEqual(testFilesList);
    });
    it('should return an empty list of files', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue([]);
      const res = await filesService.findAll();
      expect(res).toEqual([]);
    });
  });

  describe('getStatusData', () => {
    it('should return statuses for the files', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue([ testFilesStatuses ] as any);
      const res = await filesService.getStatusData();
      expect(res['all']).toBeDefined();
      expect(res['success']).toBeDefined();
      expect(res['failed']).toBeDefined();
      expect(res['finishedWithErrors']).toBeDefined();
      expect(res['inProgress']).toBeDefined();
      expect(res['technicalError']).toBeDefined();
      expect(res['waitingToBeProcessed']).toBeDefined();
      expect(filesService['dal'].findAll).toHaveBeenCalled();
    });
  });

  describe('getSortedFiles', () => {
    it('should return sorted files', async () => {
      jest.spyOn(filesService, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        fileDirections,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);
      jest.spyOn(filesService['dal'], 'paginate').mockResolvedValue(cloneDeep(testPaginateFiles) as any);
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(cloneDeep(testFilesList) as any);
      jest.spyOn(filesService['eventsService'], 'findAll').mockResolvedValue(cloneDeep(testEvents) as any);
      const res = await filesService.getSortedFiles(
        'sourceFileData.uploadedBy',
        'desc',
        Status.success,
        Directions.inbound,
      );
      expect(filesService['dal'].paginate).toHaveBeenCalledWith(
        {
          'state.processingStatus'      : filesPure.getProcessingStatus(Status.success),
          'sourceFileData.fileDirection': Directions.inbound,
          $or                           : [
            { 'sourceFileData.fileName': { $regex: '', $options: 'i' } },
            { 'masterFileName': { $regex: '', $options: 'i' } }
          ],
        },
        {
          limit    : 50,
          offset   : 0,
          sort     : { 'sourceFileData.uploadedBy': 'desc' },
          collation: {
            locale: 'en'
          },
          lean: true },
      );
      expect(res.docs.every(doc => 'masterFileName' in doc && 'errorFile' in doc)).toBeTruthy();
    });
  });

  describe('filesMapping', () => {
    it('should not override DB sorting', async () => {
      jest.spyOn(filesPure, 'getFilesSortingIteratee');
      jest.spyOn(filesService, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        fileDirections,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);
      jest.spyOn(filesService['eventsService'], 'findAll').mockResolvedValue(cloneDeep(testEvents) as any);

      // MDO-5091 DB sorting is opposite of JS sorting
      const fieldToSkipJSSorting = 'masterFileName';
      const filesSortedByDB = cloneDeep(testPaginatedSortedFileList);
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue([] as any);
      const data = await filesService.filesMapping(filesSortedByDB, { field: fieldToSkipJSSorting, sortOrder: 'asc' });
      expect(data.docs.map(({ masterFileName }) => masterFileName)).toEqual([ undefined, 'A', 'a' ]);
      expect(filesPure.getFilesSortingIteratee).toHaveReturnedWith('');
    });
  });

  describe('createFile', () => {
    it('should create file', async () => {
      const localFile = { ...testFile }; // prevent overriding in tests below
      jest.spyOn(filesService['dal'], 'findOne').mockResolvedValue(localFile as any);
      jest.spyOn(filesService['dal'], 'insertOne').mockResolvedValue(localFile as any);
      const data = await filesService.create(localFile);
      expect(data).toEqual(localFile);
      expect(filesService['dal'].insertOne).toHaveBeenCalledWith(localFile);
    });
  });

  describe('delete', () => {
    it('should delete file by id', async () => {
      const localFile = { ...testFile };
      jest.spyOn(filesService['dal'], 'findByIdAndDelete').mockResolvedValue(localFile as any);
      const data = await filesService.delete(testFileId);
      expect(data).toEqual(localFile);
      expect(filesService['dal'].findByIdAndDelete).toHaveBeenCalledWith(testFileId);
    });
    it('should throw error if file cannot be deleted', async () => {
      jest.spyOn(filesService['dal'], 'findByIdAndDelete').mockRejectedValue(new InternalServerErrorException());
      await expect(filesService.delete(testFileId))
        .rejects.toThrow(new InternalServerErrorException());
    });
  });

  describe('getLastSuccessFile', () => {
    it('should return file', async () => {
      jest.spyOn(filesService['dal'], 'findOne').mockResolvedValue(testFile as any);
      const data = await filesService.getRecentFile(testFile.sourceFileData.fileName);
      expect(data).toEqual(testFile);
      expect(filesService['dal'].findOne).toHaveBeenCalledWith(
        {
          'sourceFileData.fileName': testFile.sourceFileData.fileName,
        },
        { 'sourceFileData.uploadedDate': -1 }
      );
    });
  });

  describe('getFile', () => {
    it('should return file by id', async () => {
      jest.spyOn(filesService['dal'], 'findById').mockImplementation(id =>
        testFilesList.find(({ _id }) => _id.toString() === id) as any
      );
      const res = await filesService.getFile(testFileId);
      expect(res).toEqual(testFile);
    });
  });

  describe('getFilesByMetadataId', () => {
    it('should return files by metadataId', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue([ testFile ] as Document<Files>[]);
      const res = await filesService.getFilesByMetadataId(testFile.filesMetadataId.toString());
      expect(res).toEqual([ testFile ]);
    });
  });

  describe('getFileByMasterFileId', () => {
    it('should return files by masterFileId', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue([ testFile ] as Document<Files>[]);
      const res = await filesService.getFileByMasterFileId(testFile.masterFileId.toString());
      expect(res).toEqual([ testFile ]);
    });
  });

  describe('getLastProcessedFile', () => {
    it('should return most recent processed file for metadata', async () => {
      jest.spyOn(filesService['dal'], 'findOne').mockResolvedValue(testFile as Document<Files>);
      const res = await filesService.getLastProcessedFile(testFile.filesMetadataId.toString());
      expect(res).toEqual(testFile);
      expect(filesService['dal'].findOne).toHaveBeenCalledWith(
        {
          'filesMetadataId'               : testFile.filesMetadataId,
          'sourceFileData.fileDirection'  : Directions.inbound,
          'sourceFileData.numberOfRecords': { $gt: 0 }
        },
        { 'mosDocumentData.uploadDate': -1 }
      );
    });
    it('should return most recent successfully processed file for metadata', async () => {
      jest.spyOn(filesService['dal'], 'findOne').mockResolvedValue(testFile as any);
      const res = await filesService.getLastProcessedFile(testFile.filesMetadataId.toString(), true);
      expect(res).toEqual(testFile);
      expect(filesService['dal'].findOne).toHaveBeenCalledWith(
        {
          'filesMetadataId'               : testFile.filesMetadataId,
          'sourceFileData.fileDirection'  : Directions.inbound,
          'sourceFileData.numberOfRecords': { $gt: 0 },
          'state.processingStatus'        : { $in: [ Status.success, Status.finishedWithErrors ] }
        },
        { 'mosDocumentData.uploadDate': -1 }
      );
    });
  });

  describe('calculateStatus', () => {
    let fileStatusCalculationBase: FileStatusCalculation;

    beforeEach(() => {
      fileStatusCalculationBase = getFileStatusCalculationBase(currentDate);
    });

    it('should invoke calculateStatusForNonMonthlyFiles', async () => {
      jest.spyOn(filesService, 'calculateStatusForNonMonthlyFiles').mockReturnValue('onTime' as any);

      const res = await filesService.calculateStatus(fileStatusCalculationBase);
      expect(res).toEqual({ scheduleStatus: 'onTime' });
      expect(filesService['calculateStatusForNonMonthlyFiles']).toHaveBeenCalled();
      expect(filesService['calculateStatusForNonMonthlyFiles']).toHaveBeenCalledTimes(1);
    });
    it('should invoke calculateStatusForMonthlyFiles', async () => {
      jest.spyOn(filesService, 'calculateStatusForMonthlyFiles').mockResolvedValue('onTime' as any);

      const res = await filesService.calculateStatus({ ...fileStatusCalculationBase, frequency: 'ContinuousMonthly' });
      expect(res).toEqual({ scheduleStatus: 'onTime' });
      expect(filesService['calculateStatusForMonthlyFiles']).toHaveBeenCalled();
      expect(filesService['calculateStatusForMonthlyFiles']).toHaveBeenCalledTimes(1);
    });
  });

  describe('calculateStatusForNonMonthlyFiles', () => {
    beforeEach(() => {
      jest.spyOn(filesService['holidayCalendarsService'], 'getHolidayCalendar')
        .mockResolvedValue(testHolidayCalendars[0] as Document<HolidayCalendars>);
    });

    it('should return On Time status', () => {
      const res = filesService.calculateStatusForNonMonthlyFiles(getFileStatusCalculationBase(currentDate), currentDate);
      expect(res).toEqual(ScheduleStatus.onTime);
    });
    it('should return Late status', () => {
      const res = filesService.calculateStatusForNonMonthlyFiles(getFileStatusCalculationLateDaily(currentDate), currentDate);
      expect(res).toEqual(ScheduleStatus.late);
    });
    it('should return Alert Sent status', () => {
      const res = filesService.calculateStatusForNonMonthlyFiles(getFileStatusCalculationAlertDaily(currentDate), currentDate);
      expect(res).toEqual(ScheduleStatus.alert);
    });
  });

  describe('calculateStatusForMonthlyFiles', () => {
    let baseTime: DateTime;

    beforeEach(() => {
      baseTime = currentDate.set({ day: 7 });
      jest.spyOn(luxon, 'now').mockReturnValue(baseTime);
      jest.spyOn(filesService['holidayCalendarsService'], 'getHolidayCalendar')
        .mockResolvedValue(testHolidayCalendars[0] as Document<HolidayCalendars>);
    });

    it('should return On Time status', async () => {
      const res = await filesService.calculateStatusForMonthlyFiles(getFileStatusCalculationBase(baseTime), baseTime);
      expect(res).toEqual(ScheduleStatus.onTime);
    });
    it('should return Late status', async () => {
      const res = await filesService.calculateStatusForMonthlyFiles(getFileStatusCalculationLateMonthly(baseTime), baseTime);
      expect(res).toEqual(ScheduleStatus.late);
    });
    it('should return Alert Sent status', async () => {
      const res = await filesService.calculateStatusForMonthlyFiles(getFileStatusCalculationAlertMonthly(baseTime), baseTime);
      expect(res).toEqual(ScheduleStatus.alert);
    });
  });

  describe('getFilteredFiles', () => {
    it('should return filtered files', async () => {
      jest.spyOn(filesService['dal'], 'paginate').mockResolvedValue(cloneDeep(testPaginateFiles) as any);
      jest.spyOn(filesService['fileTypesService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['fileDirectionsService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['scheduleStatusesService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(cloneDeep(testFilesList) as any);
      jest.spyOn(filesService, 'getLatestTechnicalErrors').mockResolvedValue({});
      jest.spyOn(filesService, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        fileDirections,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);

      await filesService.getFilteredFiles(testFileFilter);

      expect(filesService['dal'].paginate).toHaveBeenCalledWith(
        {
          'sourceFileData.fileName'     : { $regex: testFileFilter.fileName, $options: 'i' },
          'sourceFileData.fileType'     : { $nin: [] },
          'sourceFileData.fileDirection': { $nin: [] },
          'state.scheduleStatus'        : { $nin: [] },
        },
        {
          limit : 50,
          offset: 0,
          sort  : { 'sourceFileData.uploadedBy': 'desc' },
          lean  : true },
      );
    });
  });

  describe('getFilesByStatus', () => {
    it('should return files by status', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(cloneDeep(testPaginateFiles) as any);
      await filesService.getFilesByStatus(Status.success);
      expect(filesService['dal'].findAll).toHaveBeenCalledWith(
        { 'state.processingStatus': Status.success },
        { 'mosDocumentData.uploadDate': -1 },
        { lean: true });
    });
  });

  describe('getLatestFileByDocumentId', () => {
    it('should return file', async () => {
      jest.spyOn(filesService['dal'], 'findOne').mockResolvedValue({} as any);
      await filesService.getLatestFileByDocumentId(testFile._id.toString());
      expect(filesService['dal'].findOne).toHaveBeenCalledWith(
        { 'mosDocumentData.documentId': testFile._id },
        { 'sourceFileData.uploadedDate': -1 },
        { lean: true });
    });
  });

  describe('getLastFilesByMetadataIds', () => {
    it('should return files by metadata ids', async () => {
      const ids = `${testFile._id.toString(),testFile._id.toString()}`;
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(testFilesList as Document<Files>[]);
      await filesService.getLastFilesByMetadataIds(ids);
      expect(filesService['dal'].findAll).toHaveBeenCalledWith(
        {
          'filesMetadataId'             : { $in: [ testFile._id ], },
          'sourceFileData.fileDirection': Directions.inbound,
        },
        { 'mosDocumentData.uploadDate': -1 },
        { lean: true });
    });

    it('should throw error', async () => {
      jest.spyOn(filesService['dal'], 'findAll').mockResolvedValue(testFilesList as Document<Files>[]);
      await expect(async() => {
        await filesService.getLastFilesByMetadataIds('I will fail');
      }).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update file', async () => {
      jest.spyOn(filesService['dal'], 'updateOneOrFail').mockResolvedValue({} as any);
      await filesService.update(testFile._id.toString(), testFile);
      expect(filesService['dal'].updateOneOrFail).toHaveBeenCalledWith(testFile._id.toString(), testFile);
    });
  });

  describe('getStaticData', () => {
    it('should return static data', async () => {
      jest.spyOn(filesService['suppliersService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['fileTypesService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['fileDirectionsService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['entityTypesService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['regionsService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['processingStatusesService'], 'findAll').mockResolvedValue([]);
      jest.spyOn(filesService['scheduleStatusesService'], 'findAll').mockResolvedValue([]);
      await filesService.getStaticData();
      expect(filesService['suppliersService'].findAll).toHaveBeenCalled();
      expect(filesService['fileTypesService'].findAll).toHaveBeenCalled();
      expect(filesService['fileDirectionsService'].findAll).toHaveBeenCalled();
      expect(filesService['entityTypesService'].findAll).toHaveBeenCalled();
      expect(filesService['regionsService'].findAll).toHaveBeenCalled();
      expect(filesService['processingStatusesService'].findAll).toHaveBeenCalled();
      expect(filesService['scheduleStatusesService'].findAll).toHaveBeenCalled();
    });
  });
});
