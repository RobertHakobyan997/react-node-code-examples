import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { Localization } from '../../core/schemas/localizations.schema';

import { LocalizationService } from './localization.service';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LocalizationService,
      { provide: getModelToken(Localization.name), useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<LocalizationService>(LocalizationService);
};
