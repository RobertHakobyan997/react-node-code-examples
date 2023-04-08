import { Test, TestingModule } from '@nestjs/testing';
import { FileTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';

import { FileTypesDal } from '../file-types/file-types.dal';
import { FileTypesService } from '../file-types/file-types.service';
import { RegionsDal } from '../regions/regions.dal';
import { RegionsService } from '../regions/regions.service';
import { SuppliersDal } from '../suppliers/suppliers.dal';
import { SuppliersService } from '../suppliers/suppliers.service';
import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { StaticDataService } from './static-data.service';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      StaticDataService,
      SuppliersService,
      SuppliersDal,
      FileTypesService,
      FileTypesDal,
      RegionsService,
      RegionsDal,
      { provide: SuppliersModelToken, useValue: mockMongooseModel },
      { provide: FileTypesModelToken, useValue: mockMongooseModel },
      { provide: RegionsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<StaticDataService>(StaticDataService);
};
