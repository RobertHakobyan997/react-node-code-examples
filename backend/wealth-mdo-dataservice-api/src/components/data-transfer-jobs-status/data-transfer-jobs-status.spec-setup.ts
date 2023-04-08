import { Test, TestingModule } from '@nestjs/testing';
import { DataTransferJobsStatusModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-status';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { DataTransferJobsStatusService } from './data-transfer-jobs-status.service';
import { DataTransferJobsStatusDal } from './data-transfer-jobs-status.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DataTransferJobsStatusService,
      DataTransferJobsStatusDal,
      { provide: DataTransferJobsStatusModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<DataTransferJobsStatusService>(DataTransferJobsStatusService);
};
