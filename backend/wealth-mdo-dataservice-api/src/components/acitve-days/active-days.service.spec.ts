import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { activeDays } from '../../../test/data/active-days/active-days.const';

import { ActiveDaysService } from './active-days.service';
import { assert } from './active-days.service.spec-setup';

describe('ActiveDaysService', () => {
  let service: ActiveDaysService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('findAll()', () => {
    it('should return all possible active days', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(activeDays as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(activeDays);
    });
  });
});
