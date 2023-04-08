import { Test, TestingModule } from '@nestjs/testing';
import { FileTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { FileTypesService } from './file-types.service';
import { FileTypesDal } from './file-types.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      FileTypesService,
      FileTypesDal,
      { provide: FileTypesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<FileTypesService>(FileTypesService);
};
