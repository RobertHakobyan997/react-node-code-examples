import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

import { timeZones } from '../../../test/data/time-zones/time-zones.const';

import { assert } from './time-zones.service.spec-setup';
import { TimeZonesService } from './time-zones.service';

describe('TimeZonesService', () => {
  let service: TimeZonesService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('findAll()', () => {
    it('should return all time zones', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(timeZones as Document<TimeZones>[]);
      const res = await service.findAll();
      expect(res).toEqual(timeZones);
    });
  });
});
