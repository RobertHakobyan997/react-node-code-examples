import { testLocalizations, testLocalizationsResult } from '../../../test/data/user-settings/localizations.const';

import { LocalizationService } from './localization.service';
import { assert } from './localization.service.spec-setup';

describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('getLocalizations()', () => {
    it('should return all localization objects', async () => {
      jest.spyOn(service['model'], 'find').mockReturnValue({
        lean: () => ({ exec: () => Promise.resolve(testLocalizations) })
      } as any);
      const res = await service.getLocalizations();
      expect(res).toEqual(testLocalizationsResult);
    });
  });
});
