import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { regions } from '../../../test/data/regions/regions.const';

import { RegionsService } from './regions.service';
import { assert } from './regions.spec-setup';

describe('RegionsService', () => {
  let service: RegionsService;

  beforeEach(async () => {
    service = await assert();
  });

  it('should return all regions', async () => {
    jest.spyOn(service['dal'], 'findAll').mockResolvedValue(regions as Document<Enum>[]);
    const res = await service.findAll();
    expect(res).toEqual(regions);
    expect(res.length).toBe(4);
  });
});
