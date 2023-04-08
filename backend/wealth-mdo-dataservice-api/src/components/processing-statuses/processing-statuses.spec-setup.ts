import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/processing-statuses';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { ProcessingStatusesService } from './processing-statuses.service';
import { ProcessingStatusesDal } from './processing-statuses.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProcessingStatusesService,
      ProcessingStatusesDal,
      { provide: ProcessingStatusesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<ProcessingStatusesService>(ProcessingStatusesService);
};
