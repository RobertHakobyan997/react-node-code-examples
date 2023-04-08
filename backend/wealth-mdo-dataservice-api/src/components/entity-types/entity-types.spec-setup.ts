import { Test, TestingModule } from '@nestjs/testing';
import { EntityTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { EntityTypesService } from './entity-types.service';
import { EntityTypesDal } from './entity-types.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EntityTypesService,
      EntityTypesDal,
      { provide: EntityTypesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<EntityTypesService>(EntityTypesService);
};
