import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import { plainToClass } from 'class-transformer';
import DataTransferJobsStatusModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-status';

export const dataTransferJobsStatusRaw = {
  _id          : '611f68a99f217cce3a4d91f8',
  jobMetaDataId: '611d04f5204471d32fd1c18e',
  state        : {
    processingStatus         : 'technicalError',
    errorMessage             : '',
    lastSuccessfulProcessTime: '2021-08-05T17:20:30.437Z',
    lastRunTime              : '2021-08-05T17:20:15.413Z',
    totalSuccessCount        : 1,
  },
  updatedAt: '2021-08-05T17:20:30.437Z'
};

export const dataTransferJobsStatus: DataTransferJobsStatus[] = [ plainToClass(DataTransferJobsStatusModel, dataTransferJobsStatusRaw) ];
