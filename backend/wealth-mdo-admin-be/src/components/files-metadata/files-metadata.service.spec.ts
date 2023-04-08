import { of } from 'rxjs';
import { DateTime } from 'luxon';

import { testFileMetadata } from '../../../test/data/file-metadata/file-metadata.const';
import { testScheduleStatuses } from '../../../test/data/file-metadata/schedule-statuses.const';
import { FileMetadataResponse, FileMetadataScheduling, FileMetadataSortedRequest } from '../../types/file-metadata-sorted.types';
import { userWithRolesAndPermissions } from '../../../test/data/authorization';

import { assert } from './files-metadata.service.spec-setup';
import { FilesMetadataService } from './files-metadata.service';

describe('Files metadata service: ', () => {
  let filesMetadataService: FilesMetadataService;

  beforeAll(async () => {
    filesMetadataService = await assert();
  });

  describe('getScheduleStatuses', () => {
    it('should return scheduleStatuses for scheduling page', async () => {
      jest.spyOn(filesMetadataService['request'], 'get').mockReturnValue(
        of(testScheduleStatuses) as any
      );

      const files = filesMetadataService.getScheduleStatuses();
      files.subscribe(res => expect(res).toEqual(testScheduleStatuses));
    });
  });

  describe('getSortedFileMetadata', () => {
    it('should return filtred/sorted files-metadata', async () => {
      const firstScheduleDay = testFileMetadata.schedule.expectedDays[0];
      const testMetadata: FileMetadataScheduling = {
        ...testFileMetadata,
        received: 'Yes',
        scheduleDisplay: {
          frequency: testFileMetadata.schedule.frequency,
          dayOfTheWeek: firstScheduleDay.dayOfTheWeek,
          startTime: firstScheduleDay.startTime,
          endTime: firstScheduleDay.endTime,
          endOfOnSchedule: firstScheduleDay.endOfOnSchedule,
          endOfOnTime: firstScheduleDay.endOfOnTime,
          endOfLate: firstScheduleDay.endOfLate,
          timeZone: testFileMetadata.schedule.timeZone,
          nextFileExpectedOn: DateTime.utc().setLocale('en-US'),
        }
      };
      const response: FileMetadataResponse = {
        docs: [ testMetadata ],
        page: 1,
        pages: 1,
        totalDocs: 1,
      };
      jest.spyOn(filesMetadataService['request'], 'post').mockReturnValue(
        of({ data: [ response ] }) as any
      );
      const sortParams: FileMetadataSortedRequest = {
        field: 'date',
        sortOrder: 'asc',
        limit: 1,
        offset: 0,
        statuses: [],
        received: 'No',
        isEnabled: 'true',
      };

      const files = filesMetadataService.getSortedFileMetadata(sortParams);
      files.subscribe(res => expect(res).toEqual({ data: [ response ] }));
    });
  });
  describe('getBySupplier', () => {
    it('should return scheduleStatuses for scheduling page', async () => {
      jest.spyOn(filesMetadataService['request'], 'get').mockReturnValue(
        of(testFileMetadata) as any
      );

      const files = filesMetadataService.getBySupplier('mockSupplier');
      files.subscribe(res => expect(res).toEqual(testFileMetadata));
    });
  });

  describe('getById', () => {
    it('should call data service', () => {
      jest.spyOn(filesMetadataService['request'], 'get').mockReturnValue(
        of(testFileMetadata) as any
      );

      const files = filesMetadataService.getById(testFileMetadata._id.toString());
      files.subscribe(res => {
        expect(res).toEqual(testFileMetadata);
        expect(filesMetadataService['request'].get).toHaveBeenCalled();
      });
    });
  });

  describe('getDetailedById', () => {
    it('should call data service', () => {
      jest.spyOn(filesMetadataService['request'], 'get').mockReturnValue(
        of(testFileMetadata) as any
      );

      const files = filesMetadataService.getDetailedById(testFileMetadata._id.toString());
      files.subscribe(res => {
        expect(res).toEqual(testFileMetadata);
        expect(filesMetadataService['request'].get).toHaveBeenCalled();
      });
    });
  });

  describe('update', () => {
    it('should log event', done => {
      jest.spyOn(filesMetadataService['request'], 'get').mockReturnValue(
        of(testFileMetadata) as any
      );
      jest.spyOn(filesMetadataService['request'], 'put').mockReturnValue(
        of(testFileMetadata) as any
      );
      jest.spyOn(filesMetadataService['authorizationService'], 'getUserWithPermissionsAndRoles').mockReturnValue(
        of(userWithRolesAndPermissions) as any
      );
      jest.spyOn(filesMetadataService as any, 'logEvent');

      const files = filesMetadataService.update(
        testFileMetadata._id.toString(),
        testFileMetadata,
        userWithRolesAndPermissions.user._id.toString());
      files.subscribe(() => {
        expect(filesMetadataService['logEvent']).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('patch', () => {
    it('should log event', done => {
      jest.spyOn(filesMetadataService['request'], 'patch').mockReturnValue(
        of(testFileMetadata) as any
      );
      jest.spyOn(filesMetadataService['authorizationService'], 'getUserWithPermissionsAndRoles').mockReturnValue(
        of(userWithRolesAndPermissions) as any
      );
      jest.spyOn(filesMetadataService as any, 'logEvent');

      const files = filesMetadataService.patch(
        testFileMetadata._id.toString(),
        testFileMetadata,
        userWithRolesAndPermissions.user._id.toString());
      files.subscribe(() => {
        expect(filesMetadataService['logEvent']).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('logEvent', () => {
    it('should create event', done => {
      jest.spyOn(filesMetadataService['request'], 'post');
      const eventsUrl = 'https://localhost:3002/events';

      const res = filesMetadataService['logEvent'](testFileMetadata, testFileMetadata, eventsUrl, userWithRolesAndPermissions.user);
      res.subscribe(() => {
        expect(filesMetadataService['logEvent']).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('updateValidation', () => {
    it('should call data service', async () => {
      jest.spyOn(filesMetadataService['request'], 'put').mockReturnValue(
        of(testFileMetadata) as any
      );

      const files = await filesMetadataService.updateValidation(testFileMetadata._id.toString(), testFileMetadata.validations[0]);
      files.subscribe(res => {
        expect(res).toEqual(testFileMetadata);
        expect(filesMetadataService['request'].put).toHaveBeenCalled();
      });
    });
  });

  describe('updateNotificationEmails', () => {
    it('should call data service', async () => {
      jest.spyOn(filesMetadataService['request'], 'patch').mockReturnValue(
        of(testFileMetadata) as any
      );

      const files = await filesMetadataService.updateNotificationEmails(
        testFileMetadata._id.toString(), testFileMetadata.notification[0].notificationKey, [ 'example@mail.com' ]);
      files.subscribe(res => {
        expect(res).toEqual(testFileMetadata);
        expect(filesMetadataService['request'].patch).toHaveBeenCalled();
      });
    });
  });
});
