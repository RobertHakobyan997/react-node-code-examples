import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';

import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';

import { SuppliersService } from './suppliers.service';
import { assert } from './suppliers.service.spec-setup';

describe('SuppliersService', () => {
  let service: SuppliersService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('getSuppliers()', () => {
    it('should return all suppliers', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testSuppliers as Document<Suppliers>[]);
      const res = await service.findAll();
      expect(res).toEqual(testSuppliers);
    });
  });
});
