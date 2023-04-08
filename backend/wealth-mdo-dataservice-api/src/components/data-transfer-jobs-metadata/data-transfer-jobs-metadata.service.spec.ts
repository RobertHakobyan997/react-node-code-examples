import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { plainToClass } from 'class-transformer';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import { of } from 'rxjs';
import { DateTime, Settings } from 'luxon';

import {
  dataTransferJobsMetadata,
  dataTransferJobsMetadataRaw
} from '../../../test/data/data-transfer-jobs/data-transfer-jobs-metadata.const';
import { dataTransferJobsStatus } from '../../../test/data/data-transfer-jobs/data-transfer-jobs-status.const';
import { testHolidayCalendars } from '../../../test/holiday-calendars/holiday-calendars.const';

import { DataTransferJobsMetadataAndState, DataTransferJobsMetadataService } from './data-transfer-jobs-metadata.service';
import { assert } from './data-transfer-jobs-metadata.spec-setup';

describe('ProcessingStatusesService', () => {
  let service: DataTransferJobsMetadataService;

  beforeEach(async () => {
    service = await assert();
  });

  it('plainToClass', () => {
    const mapped = plainToClass(DataTransferJobsMetadata, JSON.parse(JSON.stringify(dataTransferJobsMetadataRaw)));
    // ToDo: fix structure and entity in common
    // expect(mapped._id).toBeInstanceOf(Types.ObjectId);
    expect(mapped).toMatchSnapshot();
  });

  describe('findAll()', () => {
    it('should return all data transfer jobs metadata', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(dataTransferJobsMetadata as Document<DataTransferJobsMetadata>[]);
      const res = await service.findAll();
      expect(res).toEqual(dataTransferJobsMetadata);
      expect(res.length).toBe(1);
    });
  });

  describe('findById()', () => {
    it('should return data transfer job metadata by id', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(dataTransferJobsMetadata[0] as Document<DataTransferJobsMetadata>);
      const res = await service.findById(dataTransferJobsMetadata[0]._id.toString());
      expect(res).toEqual(dataTransferJobsMetadata[0]);
    });
  });

  describe('create()', () => {
    it('should create and return data transfer job metadata', async () => {
      jest.spyOn(service['dal'], 'insert').mockImplementation((data: DataTransferJobsMetadata[]) => data as any);
      const res = await service.create(dataTransferJobsMetadata);
      expect(res).toEqual(dataTransferJobsMetadata);
      expect(service['dal'].insert).toHaveBeenCalledWith(dataTransferJobsMetadata);
    });
  });

  describe('delete()', () => {
    it('should delete data transfer job metadata and return result of the operation', async () => {
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockResolvedValue(dataTransferJobsMetadata[0] as Document<DataTransferJobsMetadata>);
      await service.delete(dataTransferJobsMetadata[0]._id.toString());
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalledWith(dataTransferJobsMetadata[0]._id.toString());
    });
  });

  describe('findByJobKey()', () => {
    it('should return data transfer job metadata with state by job key', async () => {
      jest.spyOn(service['dal'], 'findOne').mockResolvedValue(dataTransferJobsMetadata[0] as Document<DataTransferJobsMetadata>);
      jest.spyOn(service['dtJobStatusService'], 'getJobMetadataStatuses')
        .mockResolvedValue(dataTransferJobsStatus[0] as Document<DataTransferJobsStatus>);
      const res = await service.findByJobKey(dataTransferJobsMetadata[0].dataTransferJobKey);
      expect(res).toEqual({ ...dataTransferJobsMetadata[0], state: dataTransferJobsStatus[0].state });
    });

    it('should return data transfer job metadata without state by job key', async () => {
      jest.spyOn(service['dal'], 'findOne').mockResolvedValue(dataTransferJobsMetadata[0] as Document<DataTransferJobsMetadata>);
      jest.spyOn(service['dtJobStatusService'], 'getJobMetadataStatuses')
        .mockResolvedValue(null);
      const res = await service.findByJobKey(dataTransferJobsMetadata[0].dataTransferJobKey);
      expect(res).toEqual(dataTransferJobsMetadata[0]);
    });
  });

  describe('getScheduleData()', () => {
    it('should return data transfer job metadata, statuses and holiday calendars', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(dataTransferJobsMetadata as any);
      jest.spyOn(service['holidayCalendarsService'], 'findAll')
        .mockResolvedValue(testHolidayCalendars as any);
      jest.spyOn(service['dtJobStatusService'], 'findAll')
        .mockResolvedValue(dataTransferJobsStatus as any);
      const res = await service.getScheduleData();
      expect(res).toEqual([ dataTransferJobsMetadata, testHolidayCalendars, dataTransferJobsStatus ]);
    });
  });

  describe('resetTotalSuccessCount()', () => {
    it('should return metadata without state update', async () => {
      const job = { schedule: dataTransferJobsMetadata[0].schedule, state: dataTransferJobsStatus[0].state };
      const data = [ job ] as DataTransferJobsMetadataAndState[];
      jest.spyOn(service['dtJobStatusService'], 'updateJobMetadataStatuses').mockResolvedValue('test');
      const res = await of(data).pipe(service.resetTotalSuccessCount()).toPromise();
      expect(res).toEqual(data);
      expect(service['dtJobStatusService'].updateJobMetadataStatuses).not.toHaveBeenCalled();
    });

    it('should return metadata with state update', async () => {
      const expectedDays = dataTransferJobsMetadata[0].schedule.expectedDays.map(item => ({
        ...item,
        periodStartDate: DateTime.fromISO('2021-08-06T05:00:30.437Z'),
        periodEndDate  : DateTime.fromISO('2021-08-06T23:59:59.437Z')
      }));
      const scheduleWithPeriod = {
        ...dataTransferJobsMetadata[0].schedule,
        expectedDays
      };
      const state = {
        ...dataTransferJobsStatus[0].state,
        lastSuccessfulProcessTime: '2021-08-05T17:20:30.437Z',
      };
      const job = { _id: dataTransferJobsMetadata[0]._id, schedule: scheduleWithPeriod, state };
      const resultState = { ...state, totalSuccessCount: 0 };
      const resultJob = { ...job, state: resultState };
      const data = [ job ] as unknown as DataTransferJobsMetadataAndState[];

      Settings.now = () => new Date('2021-08-06T15:00:00.000Z').valueOf();
      jest.spyOn(service['dtJobStatusService'], 'updateJobMetadataStatuses').mockResolvedValue('test');
      const res = await of(data).pipe(service.resetTotalSuccessCount()).toPromise();
      expect(res).toEqual([ resultJob ]);
      expect(service['dtJobStatusService'].updateJobMetadataStatuses).toHaveBeenCalledTimes(1);
    });
  });
});
