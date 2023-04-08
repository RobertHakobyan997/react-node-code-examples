import { Test, TestingModule } from '@nestjs/testing';
import { FrequenciesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/frequencies';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { FrequenciesService } from './frequencies.service';
import { FrequenciesDal } from './frequencies.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      FrequenciesService,
      FrequenciesDal,
      { provide: FrequenciesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<FrequenciesService>(FrequenciesService);
};
