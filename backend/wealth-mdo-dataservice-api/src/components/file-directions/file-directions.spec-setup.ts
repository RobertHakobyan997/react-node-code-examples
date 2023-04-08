import { Test, TestingModule } from '@nestjs/testing';
import { FileDirectionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { FileDirectionsService } from './file-directions.service';
import { FileDirectionsDal } from './file-directions.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      FileDirectionsService,
      FileDirectionsDal,
      { provide: FileDirectionsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<FileDirectionsService>(FileDirectionsService);
};
