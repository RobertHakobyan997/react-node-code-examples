import { Test, TestingModule } from '@nestjs/testing';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { RegionsService } from './regions.service';
import { RegionsDal } from './regions.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RegionsService,
      RegionsDal,
      { provide: RegionsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<RegionsService>(RegionsService);
};
