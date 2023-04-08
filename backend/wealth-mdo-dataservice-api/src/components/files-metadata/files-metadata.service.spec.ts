import { Frequency, ScheduleStatus, Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { cloneDeep } from 'lodash';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import { ObjectId } from 'mongodb';
import { BadRequestException } from '@nestjs/common';
import { Settings } from 'luxon';

import {
  getTestFileMetadata,
  testFileId,
  testFileMetadataFilterQuery,
  testFileMetadata,
  testFilesMetadata,
  testFilesMonthlyMetadata,
  testFilesMonthlyMetadataStartsOnHoliday,
  testNotBusinessMonthlyMetadata,
  testPaginateFilesMetadata,
  testMetadataId,
} from '../../../test/data/files-metadata/test-files-metadata.const';
import { testCalendarId, testHolidayCalendars, } from '../../../test/holiday-calendars/holiday-calendars.const';
import { testScheduleStatuses } from '../../../test/data/files-metadata/test-schedule-statuses.const';
import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';
import { fileTypes } from '../../../test/data/file-types/file-types.const';
import { entityTypes } from '../../../test/data/entity-types/entity-types.const';
import { regions } from '../../../test/data/regions/regions.const';
import { processingStatuses } from '../../../test/data/processing-statuses/processing-statuses.const';
import { countries } from '../../../test/data/countries/countries.const';
import { testEvent } from '../../../test/data/events/test-events.const';
import {
  testFile,
  testFileDocId,
  testFilesList,
  testFilesWithFinishedWithErrorsFile,
  testFilesWithoutSuccessOrErrorFile,
  testFilesWithSuccessFile,
  testFilteredNumberOfRecords,
} from '../../../test/data/documents/test-file.const';
import { testContactId } from '../../../test/data/contacts/contacts.const';
import { getTestSydneyMetadata } from '../../../test/data/files-metadata/test-files-metadata-sydney.const';

import { FilesMetadataService } from './files-metadata.service';
import { assert, getMonthlySchedule } from './files-metadata.spec-setup';
import { FilesMetadataFilter } from './types/files-metadata-filter.interface';
import { ScheduleDaysOfTheWeek } from './enums/schedule-day-of-the-week.enum';
import * as pure from './pure/files-metadata.pure';

describe('FilesMetadataService', () => {
  let service: FilesMetadataService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('findAll()', () => {
    it('should return filtered files metadata', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as any);
      const res = await service.findAll();
      expect(res.length).toBeGreaterThan(0);
      expect(res).toEqual(testFilesMetadata);
    });
  });

  describe('getFileMetadata()', () => {
    it('should return file metadata', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      await service.getFileMetadata(testFileId);
      expect(service['dal'].findById).toHaveBeenCalledWith(testFileId, {}, { lean: true });
    });
  });

  describe('create()', () => {
    it('should create and return file metadata', async () => {
      jest.spyOn(service['dal'], 'insert').mockImplementation((data: any) => data as any);
      const res = await service.create(testFilesMetadata);
      expect(res).toEqual(testFilesMetadata);
      expect(service['dal'].insert).toHaveBeenCalledWith(
        testFilesMetadata,
      );
    });
  });

  describe('delete()', () => {
    it('should delete file metadata and return result of the operation', async () => {
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockResolvedValue(null);
      await service.delete(testFileId);
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalledWith(testFileId);
    });
  });

  describe('updateMany()', () => {
    it('should update multiple files metadatas', async () => {
      jest.spyOn(service['dal'], 'updateMany');

      await service.updateMany(testFileMetadataFilterQuery, testFileMetadata);

      expect(service['dal'].updateMany).toHaveBeenCalledWith(testFileMetadataFilterQuery, testFileMetadata);
    });
  });

  describe('getMetadaByRelatedFileDocumentId()', () => {
    it('should return files metadata by files metadata id from file found by document id', async () => {
      const file = {
        ...testFile,
        filesMetadataId: testFileMetadata._id,
      };
      const docId = testFileDocId();
      jest.spyOn(service['filesService'], 'getLatestFileByDocumentId').mockResolvedValue(file as any);
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      await service.getMetadaByRelatedFileDocumentId(docId);
      expect(service['dal'].findById).toHaveBeenCalledWith(file.filesMetadataId.toString(), {}, { lean: true });
    });
  });

  describe('getSchedule()', () => {
    beforeEach(async () => {
      jest.spyOn(
        service['eventsService'],
        'create',
      ).mockResolvedValue(testEvent as any);
    });

    it('should return active file metadata', done => {
      jest.spyOn(service, 'getScheduleData').mockResolvedValue([
        [ getTestFileMetadata(0, null) ],
        testFilesList,
        testSuppliers,
        testHolidayCalendars
      ] as any);
      Settings.now = () => new Date('2022-03-03T08:00:00.000Z').valueOf(); // make sure if mock date is suitable for test

      service.getSchedule()
        .subscribe(res => {
          expect(res.length).toBeGreaterThan(0);
          expect(service['eventsService'].create).toHaveBeenCalled();
          done();
        });
    });

    it('should return metadata which contains name and number of records of last finished with errors file', done => {
      jest.spyOn(service, 'getScheduleData').mockResolvedValue([
        [ getTestFileMetadata(0, null) ],
        testFilesWithFinishedWithErrorsFile,
        testSuppliers,
        testHolidayCalendars
      ] as any);
      Settings.now = () => new Date('2022-03-03T08:00:00.000Z').valueOf(); // make sure if mock date is suitable for test

      service.getSchedule()
        .subscribe(([ file ]) => {
          expect(file.state.previousFileName).toBe(Status.finishedWithErrors);
          expect(file.state.previousFileNumberOfRecords).toBe(testFilteredNumberOfRecords);
          expect(service['eventsService'].create).toHaveBeenCalled();
          done();
        });
    });

    it('should return metadata which contains name and number of records of last success file', done => {
      jest.spyOn(service, 'getScheduleData').mockResolvedValue([
        [ getTestFileMetadata(0, null) ],
        testFilesWithSuccessFile,
        testSuppliers,
        testHolidayCalendars
      ] as any);
      Settings.now = () => new Date('2022-03-03T08:00:00.000Z').valueOf(); // make sure if mock date is suitable for test

      service.getSchedule()
        .subscribe(([ file ]) => {
          expect(file.state.previousFileName).toBe(Status.success);
          expect(file.state.previousFileNumberOfRecords).toBe(testFilteredNumberOfRecords);
          expect(service['eventsService'].create).toHaveBeenCalled();
          done();
        });
    });

    it('should return metadata which contains default name and number of records', done => {
      jest.spyOn(service, 'getScheduleData').mockResolvedValue([
        [ getTestFileMetadata(0, null) ],
        testFilesWithoutSuccessOrErrorFile,
        testSuppliers,
        testHolidayCalendars
      ] as any);
      Settings.now = () => new Date('2022-03-03T08:00:00.000Z').valueOf(); // make sure if mock date is suitable for test

      service.getSchedule()
        .subscribe(([ file ]) => {
          expect(file.state.previousFileName).toBe('');
          expect(file.state.previousFileNumberOfRecords).toBe(null);
          expect(service['eventsService'].create).toHaveBeenCalled();
          done();
        });
    });

    it('should return work days metadata if start date has passed', done => {
      getMonthlySchedule(service, '2021-08-09', testFilesMonthlyMetadata(Frequency.ContinuousMonthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(3);
            done();
          }
        );
    });

    it('should not return Monthly metadata in work day if start date has not passed', done => {
      getMonthlySchedule(service, '2021-08-02', testFilesMonthlyMetadata(Frequency.Monthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(0);
            done();
          }
        );
    });

    it('should return ContinuousMonthly metadata in work day even if start date has not passed', done => {
      getMonthlySchedule(service, '2021-08-02', testFilesMonthlyMetadata(Frequency.ContinuousMonthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(3);
            done();
          }
        );
    });

    // TODO fix the test
    it('should not return metadata before next work days start time if start date in on holiday', done => {
      getMonthlySchedule(service, '2021-08-09', testFilesMonthlyMetadataStartsOnHoliday(Frequency.Monthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(0);
            done();
          }
        );
    });

    it('should not return metadata before next work days start time if start date in on holiday', done => {
      getMonthlySchedule(service, '2021-08-08', testFilesMonthlyMetadataStartsOnHoliday(Frequency.ContinuousMonthly, 7))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(0);
            done();
          }
        );
    });

    it('should return only allDAysOfWeek metadata if it is weekend', done => {
      getMonthlySchedule(service, '2021-08-08', testNotBusinessMonthlyMetadata(Frequency.ContinuousMonthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(1);
            expect(files[0].schedule.expectedDays[0].dayOfTheWeek).toBe(ScheduleDaysOfTheWeek.AllDaysOfWeek);
            done();
          }
        );
    });

    // TODO fix the test
    it('should not return AllDaysOfWeek metadata if start Day is holiday', done => {
      getMonthlySchedule(service, '2021-08-06', testNotBusinessMonthlyMetadata(Frequency.ContinuousMonthly))
        .subscribe(
          (files: FilesMetadata[]) => {
            expect(files.length).toBe(0);
            done();
          }
        );
    });
  });

  describe('getNextWorkingDay()', () => {
    it('should return next working day by files metadata id since today or date from request', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getNextWorkingDay('', '2021-04-01', 'yyyy-MM-dd');
      expect(date).toEqual('2021-04-06');
    });

    it('should return next working day by files metadata id since today or date from request - yyyy-m-d format', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getNextWorkingDay('', '2021-4-1', 'yyyy-M-d');
      expect(date).toEqual('2021-04-06');
    });

    it('should return next working day by files metadata id since today or date from request - yyyy/m/d format', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getNextWorkingDay('', '2021/4/1', 'yyyy/M/d');
      expect(date).toEqual('2021-04-06');
    });
  });

  describe('getLastWorkingDay()', () => {
    it('should return last working day by files metadata id since today or date from request', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getLastWorkingDay('', '2021-04-01', undefined);
      expect(date).toEqual('2021-03-31');
    });

    it('should return last working day by files metadata id since today or date from request - yyyy-m-d format', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getLastWorkingDay('', '2021-4-1', 'yyyy-M-d');
      expect(date).toEqual('2021-03-31');
    });

    it('should return last working day by files metadata id since today or date from request - yyyy/m/d format', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const { date } = await service.getLastWorkingDay('', '2021/4/1', 'yyyy/M/d');
      expect(date).toEqual('2021-03-31');
    });
  });

  describe('getHolidayCalendar()', () => {
    it('should return holiday calendar by file metadata id', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as any);
      jest.spyOn(
        service['holidayCalendarsService'],
        'getHolidayCalendar',
      ).mockResolvedValue(testHolidayCalendars[0] as any);
      const res = await service.getHolidayCalendar(testCalendarId);
      expect(res).toEqual(testHolidayCalendars[0]);
    });
  });

  describe('getScheduleStatuses()', () => {
    it('should return schedule statuses from file metadata', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as any);
      const res = await service.getScheduleStatuses();
      expect(res['alertSent']).toBeDefined();
      expect(res['all']).toBeDefined();
      expect(res['late']).toBeDefined();
      expect(res['onTime']).toBeDefined();
      expect(service['dal'].findAll).toHaveBeenCalledWith({ isMaster: true });
    });
  });

  describe('sorted()', () => {
    it('should return all sorted metadata for admin ui', async () => {
      const filter: FilesMetadataFilter = {
        statuses : Object.values(ScheduleStatus),
        field    : 'fileType',
        limit    : 50,
        offset   : 0,
        sortOrder: 'asc',
        received : '',
        isEnabled: 'true',
      };
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as any);
      jest.spyOn(service['holidayCalendarsService'], 'getHolidayCalendars').mockResolvedValue(testHolidayCalendars as any);

      const res = await service.sorted(filter);
      expect(service['dal'].findAll).toHaveBeenCalledWith(
        {
          isMaster              : true,
          'state.scheduleStatus': { $in: Object.values(ScheduleStatus) },
          'isEnabled'           : true,
        },
        {},
        { lean: true },
      );
      expect(res.docs.length).toBeGreaterThan(0);
    });
    it('should return all sorted metadata for admin ui with specific logic for sorting dayOfTheWeek field', async () => {
      const filter: FilesMetadataFilter = {
        statuses : Object.values(ScheduleStatus),
        field    : 'dayOfTheWeek',
        limit    : 50,
        offset   : 0,
        sortOrder: 'asc',
        received : '',
        isEnabled: '',
      };
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as any);
      jest.spyOn(service['holidayCalendarsService'], 'getHolidayCalendars').mockResolvedValue(testHolidayCalendars as any);

      const res = await service.sorted(filter);
      const docsLength = testPaginateFilesMetadata.docs.length;
      expect(res).not.toEqual(testPaginateFilesMetadata);
      expect(service['dal'].findAll).toHaveBeenCalledWith(
        {
          isMaster              : true,
          'state.scheduleStatus': { $in: Object.values(ScheduleStatus) },
        },
        {},
        { lean: true }
      );
      expect(res.docs.length).toEqual(docsLength);
    });
  });

  describe('sorted-for-edge-cases', () => {
    it('should return all sorted metadata for admin ui', async () => {
      const filter: FilesMetadataFilter = {
        statuses : Object.values(ScheduleStatus),
        field    : 'fileType',
        limit    : 50,
        offset   : 0,
        sortOrder: 'asc',
        received : '',
        isEnabled: 'false',
      };
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);

      const testMetadata = getTestSydneyMetadata(true, true);
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue([ cloneDeep(testMetadata) ] as any);
      jest.spyOn(service['holidayCalendarsService'], 'getHolidayCalendars').mockResolvedValue(testHolidayCalendars as any);

      const res = await service.sorted(filter);
      expect(service['dal'].findAll).toHaveBeenCalledWith(
        {
          isMaster              : true,
          'state.scheduleStatus': { $in: Object.values(ScheduleStatus) },
          'isEnabled'           : false
        },
        {},
        { lean: true },
      );
      expect(res.docs.length).toBeGreaterThan(0);
      const timeResult = res.docs[0].scheduleDisplay.nextFileExpectedOn;
      expect(timeResult !== undefined).toBeTruthy();
    });
  });

  describe('getDetailedFileMetadata()', () => {
    it('should return metadata by id for admin ui', async () => {
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        entityTypes,
        regions,
        processingStatuses,
        testScheduleStatuses,
      ]) as any);
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFilesMetadata[0] as any);
      jest.spyOn(pure, 'replaceKeys');
      await service.getDetailedFileMetadata(testFilesMetadata[0]._id.toString());
      expect(service['dal'].findById).toHaveBeenCalledWith(
        testFilesMetadata[0]._id.toString(),
        {},
        { lean: true },
      );
      expect(service['dal'].findById).toHaveBeenCalled();
      expect(service.getStaticData).toHaveBeenCalled();
    });
  });

  describe('getFilesMetadataIds()', () => {
    it('should return all files metadata by ids', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as any);
      jest.spyOn(service['filesService'], 'findAll').mockResolvedValue(testFilesList as any);
      const ids = testFilesMetadata.map(el => el._id).join(',');
      const res = await service.getFilesMetadataByIds(ids);
      expect(res.length).toBeGreaterThan(0);
    });
  });

  describe('deleteContacts()', () => {
    it('should delete contactId from metadata', async ()=> {
      const contactId = testFileMetadata.contacts[0];
      jest.spyOn(service['dal'], 'updateMany').mockResolvedValue({ ...testFileMetadata, contacts: [] } as any);
      await service.deleteContacts(contactId.toString());
      expect(service['dal'].updateMany).toHaveBeenCalled();
    });
  });

  describe('updateContacts', () => {
    it('should update contacts in specified metadata', async ()=> {
      jest.spyOn(service, 'deleteContacts');
      jest.spyOn(service['dal'], 'updateMany');
      await service.updateContacts(testContactId, [ testMetadataId ]);
      expect(service.deleteContacts).toHaveBeenCalled();
      expect(service['dal'].updateMany).toHaveBeenCalled();
    });

    it('should throw error',  async () => {
      jest.spyOn(service['dal'], 'updateMany');
      expect(service.updateContacts('', [])).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateHolidayCalendars', () => {
    it('should update metadata with Id from parameter', async () => {
      const holidayCalendarId = new ObjectId();
      const newId = new ObjectId();
      jest.spyOn(service['holidayCalendarsService'], 'findOne');
      jest.spyOn(service['dal'], 'updateMany');

      service.updateHolidayCalendars(holidayCalendarId.toString(), newId.toString());

      expect(service['holidayCalendarsService'].findOne).not.toHaveBeenCalled();
      expect(service['dal'].updateMany).toHaveBeenCalledWith(
        expect.anything(),
        { $set: { holidayCalendarId: newId } }
      );
    });

    it('should update metadata with found default calendar Id', async () => {
      const holidayCalendarId = new ObjectId();
      jest.spyOn(service['holidayCalendarsService'], 'findOne');
      jest.spyOn(service['dal'], 'updateMany');

      service.updateHolidayCalendars(holidayCalendarId.toString(), 'invalidId');

      expect(service['holidayCalendarsService'].findOne).toHaveBeenCalled();
    });
  });

  describe('updateNotificationEmails', () => {
    beforeEach(async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testFileMetadata as Document<FilesMetadata>);
      jest.spyOn(service['dal'], 'patchOne');
    });
    it('should throw error',  () => {
      expect(service.updateNotificationEmails(testMetadataId, 'nonexistentKey', []))
        .rejects.toThrow(BadRequestException);
    });

    it('should update emails', async () => {
      await service.updateNotificationEmails(testMetadataId, 'email', []);
      expect(service['dal'].patchOne).toHaveBeenCalled();
    });
  });

  describe('getFilesMetadataBySupplier', () => {
    beforeEach(async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testFilesMetadata as Document<FilesMetadata>[]);
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        testSuppliers,
        fileTypes,
        entityTypes,
        regions,
        countries,
      ]) as any);
      jest.spyOn(pure, 'mapDisplayKeys');
    });

    it('should return omitted and mapped metadata', async () => {
      await service.getFilesMetadataBySupplier('');
      expect(service['dal'].findAll).toHaveBeenCalled();
      expect(service.getStaticData).toHaveBeenCalled();
      expect(pure.mapDisplayKeys).toHaveBeenCalled();
    });
  });
});
