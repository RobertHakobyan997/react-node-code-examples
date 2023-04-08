import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { locations } from '../../../test/data/locations/locations.const';

import { LocationsService } from './locations.service';
import { assert } from './locations.spec-setup';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('getLocations()', () => {
    it('should return all locations', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(locations as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(locations);
      expect(res.length).toBe(3);
    });
  });
});
