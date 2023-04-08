import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';

import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';
import { fileTypesRaw } from '../../../test/data/file-types/file-types.const';
import { regions } from '../../../test/data/regions/regions.const';

import { StaticDataService } from './static-data.service';
import { assert } from './static-data.service.spec-setup';

describe('StaticDataService', () => {
  let service: StaticDataService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('findStaticDataForValidation()', () => {
    it('should return all suppliers, fileTypes, regions', async () => {
      jest
        .spyOn(service['suppliersService'], 'findAll')
        .mockResolvedValue(testSuppliers as Document<Suppliers>[]);
      jest
        .spyOn(service['fileTypesService'], 'findAll')
        .mockResolvedValue(fileTypesRaw as Document<Enum>[]);
      service.findStaticDataForValidation().subscribe(data => {
        expect(data).toEqual([
          testSuppliers,
          fileTypesRaw
        ]);
      });
    });
  });

  describe('findStaticDataForMissingFile()', () => {
    it('should return all suppliers, fileTypes, regions', async () => {
      jest
        .spyOn(service['suppliersService'], 'findAll')
        .mockResolvedValue(testSuppliers as Document<Suppliers>[]);
      jest
        .spyOn(service['fileTypesService'], 'findAll')
        .mockResolvedValue(fileTypesRaw as Document<Enum>[]);
      jest
        .spyOn(service['regionsService'], 'findAll')
        .mockResolvedValue(regions as Document<Enum>[]);
      service.findStaticDataForMissingFile().subscribe(data => {
        expect(data).toEqual([
          testSuppliers,
          fileTypesRaw,
          regions
        ]);
      });
    });
  });
});
