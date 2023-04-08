import { cloneDeep } from 'lodash';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { plainToClass } from 'class-transformer';
import { ObjectId } from 'mongodb';

import { dataTransferJobsStatus, dataTransferJobsStatusRaw } from '../../../test/data/data-transfer-jobs/data-transfer-jobs-status.const';

import { DataTransferJobsStatusService } from './data-transfer-jobs-status.service';
import { assert } from './data-transfer-jobs-status.spec-setup';

describe('ProcessingStatusesService', () => {
  let service: DataTransferJobsStatusService;
  let jobStatus;

  beforeEach(async () => {
    service = await assert();
    jobStatus = cloneDeep(dataTransferJobsStatus[0]);
  });

  xit('plainToClass', () => {
    const mapped = plainToClass(DataTransferJobsStatus, dataTransferJobsStatusRaw);
    // ToDo: fix structure and entity in common
    // expect(mapped._id).toBeInstanceOf(Types.ObjectId);
    expect(mapped).toMatchSnapshot();
  });

  describe('findAll()', () => {
    it('should return all data transfer jobs status', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(dataTransferJobsStatus as Document<DataTransferJobsStatus>[]);
      const res = await service.findAll();
      expect(res).toEqual(dataTransferJobsStatus);
      expect(res.length).toBe(1);
    });
  });

  describe('findById()', () => {
    it('should return data transfer job status by id', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(jobStatus);
      const res = await service.findById(dataTransferJobsStatus[0]._id.toString());
      expect(res).toEqual(jobStatus);
    });
  });

  describe('create()', () => {
    it('should create and return data transfer job status', async () => {
      jest.spyOn(service['dal'], 'insert').mockImplementation((data: DataTransferJobsStatus[]) => data as any);
      const res = await service.create(dataTransferJobsStatus);
      expect(res).toEqual(dataTransferJobsStatus);
      expect(service['dal'].insert).toHaveBeenCalledWith(dataTransferJobsStatus);
    });
  });

  describe('delete()', () => {
    it('should delete data transfer job status and return result of the operation', async () => {
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockResolvedValue(jobStatus);
      await service.delete(jobStatus._id.toString());
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalledWith(jobStatus._id.toString());
    });
  });

  describe('getJobMetadataStatuses', () => {
    it('should return job metadata statuses', async () => {
      jest.spyOn(service['dal'], 'findOne').mockResolvedValue(jobStatus);
      await service.getJobMetadataStatuses(jobStatus.jobMetaDataId.toString());
      expect(service['dal'].findOne).toHaveBeenCalledWith(
        { jobMetaDataId: new ObjectId(jobStatus.jobMetaDataId) },
        {},
        { lean: true }
      );
    });
    it('should return undefined', async () => {
      const result = await service.getJobMetadataStatuses('');
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update', async () => {
      const test = { state: {} } as DataTransferJobsStatus;
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(jobStatus);
      jest.spyOn(service, 'updateExistingStatus').mockResolvedValue(jobStatus);
      await service.update(jobStatus._id.toString(), test);
      expect(service.updateExistingStatus).toHaveBeenCalledWith(test, jobStatus);
    });
    it('should throw exception', async () => {
      const test = { state: {} } as DataTransferJobsStatus;
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(undefined);
      await expect(async() => {
        await service.update(jobStatus._id.toString(), test);
      }).rejects.toThrowError();
    });
  });

  describe('updateJobMetadataStatuses', () => {
    it('should call updateExistingStatus', async () => {
      const statusWithId = {
        jobMetaDataId: jobStatus._id.toString(),
        state        : {
          processingStatus         : jobStatus.state.processingStatus,
          errorMessage             : jobStatus.state.errorMessage,
          lastSuccessfulProcessTime: jobStatus.state.lastSuccessfulProcessTime,
          lastRunTime              : jobStatus.state.lastRunTime,
          totalSuccessCount        : jobStatus.state.totalSuccessCount,
        }
      };
      jest.spyOn(service, 'getJobMetadataStatuses').mockResolvedValue(jobStatus);
      jest.spyOn(service, 'updateExistingStatus').mockResolvedValue(jobStatus);
      await service.updateJobMetadataStatuses(jobStatus._id.toString(), jobStatus);
      expect(service.updateExistingStatus).toHaveBeenCalledWith(statusWithId, jobStatus);
    });
    it('should call create', async () => {
      const statusWithId = {
        jobMetaDataId: jobStatus._id.toString(),
        state        : {
          processingStatus         : jobStatus.state.processingStatus,
          errorMessage             : jobStatus.state.errorMessage,
          lastSuccessfulProcessTime: jobStatus.state.lastSuccessfulProcessTime,
          lastRunTime              : jobStatus.state.lastRunTime,
          totalSuccessCount        : jobStatus.state.totalSuccessCount,
        }
      };
      jest.spyOn(service, 'getJobMetadataStatuses').mockResolvedValue(undefined);
      jest.spyOn(service, 'create').mockResolvedValue(jobStatus);
      await service.updateJobMetadataStatuses(jobStatus._id.toString(), jobStatus);
      expect(service.create).toHaveBeenCalledWith([ statusWithId ]);
    });
  });

  describe('updateExistingStatus', () => {
    it('should update existing status', async () => {
      const test = { state: {} } as DataTransferJobsStatus;
      jest.spyOn(service['dal'], 'update').mockResolvedValue(jobStatus);
      await service.updateExistingStatus(test, jobStatus);
      expect(service['dal'].update).toHaveBeenCalled();
    });
  });
});
