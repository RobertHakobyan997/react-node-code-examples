import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { plainToClass } from 'class-transformer';
import EntityTypesModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';
import { Types } from 'mongoose';

import { entityTypes, entityTypesRaw } from '../../../test/data/entity-types/entity-types.const';

import { EntityTypesService } from './entity-types.service';
import { assert } from './entity-types.spec-setup';

describe('EntityTypesService', () => {
  let service: EntityTypesService;

  beforeEach(async () => {
    service = await assert();
  });

  it('plainToClass', () => {
    const mapped = plainToClass(EntityTypesModel, entityTypesRaw);
    expect(mapped._id).toBeInstanceOf(Types.ObjectId);
    expect(mapped).toMatchSnapshot();
  });

  describe('getEntityTypes()', () => {
    it('should return all entity types', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(entityTypes as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(entityTypes);
      expect(res.length).toBe(1);
    });
  });
});
