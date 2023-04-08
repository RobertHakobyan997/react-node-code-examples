import { Test, TestingModule } from '@nestjs/testing';
import { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { CountriesService } from './countries.service';
import { CountriesDal } from './countries.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CountriesService,
      CountriesDal,
      { provide: CountriesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<CountriesService>(CountriesService);
};
