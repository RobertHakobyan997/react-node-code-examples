import { Test, TestingModule } from '@nestjs/testing';
import { LocationsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/locations';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { LocationsService } from './locations.service';
import { LocationsDal } from './locations.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LocationsService,
      LocationsDal,
      { provide: LocationsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<LocationsService>(LocationsService);
};
