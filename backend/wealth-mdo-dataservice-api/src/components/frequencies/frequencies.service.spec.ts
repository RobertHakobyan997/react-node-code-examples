import Frequencies from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/frequencies';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { frequencies } from '../../../test/data/frequencies/frequencies.const';

import { FrequenciesService } from './frequencies.service';
import { assert } from './frequencies.service.spec-setup';

describe('ActiveDaysService', () => {
  let service: FrequenciesService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('findAll()', () => {
    it('should return all possible frequencies', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(frequencies as Document<Frequencies>[]);
      const res = await service.findAll();
      expect(res).toEqual(frequencies);
    });
  });
});
