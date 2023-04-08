import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { SuppliersService } from './suppliers.service';
import { SuppliersDal } from './suppliers.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SuppliersService,
      SuppliersDal,
      { provide: SuppliersModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<SuppliersService>(SuppliersService);
};
