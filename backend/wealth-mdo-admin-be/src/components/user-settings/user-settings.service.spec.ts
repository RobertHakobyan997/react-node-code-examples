import { testPagesPermissions } from '../../../test/data/user-settings/pages-permissions.const';
import { testQuickDateFilters } from '../../../test/data/user-settings/quick-date-filters.const';
import { testUserSettings } from '../../../test/data/user-settings/user-settings.const';

import { UserSettingsService } from './user-settings.service';
import { assert } from './user-settings.spec-setup';

describe('UserSettingsService', () => {
  let service: UserSettingsService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('getQuickFilters()', () => {
    it('should return all quick date filters', async () => {
      jest.spyOn(service['model'], 'find').mockReturnValue({
        exec: () => Promise.resolve(testQuickDateFilters)
      } as any);
      const res = await service.getQuickFilters();
      expect(res).toEqual(testQuickDateFilters);
      expect(res.length).toBe(6);
      expect(res[0]).toBe(testQuickDateFilters[0]);
    });
  });

  describe('getPagesPermissions()', () => {
    it('should return all permissionRoute objects', async () => {
      jest.spyOn(service['model'], 'find').mockReturnValue({
        exec: () => Promise.resolve(testPagesPermissions)
      } as any);
      const res = await service.getPagesPermissions();
      expect(res).toEqual(testPagesPermissions);
      expect(res.length).toBe(2);
      expect(res[0]).toBe(testPagesPermissions[0]);
    });
  });

  describe('getUserSettings()', () => {
    it('should return all permissionRoute objects', async () => {
      jest.spyOn(service, 'getQuickFilters').mockResolvedValue(testQuickDateFilters as any);
      const res = await service.getUserSettings();
      expect(res).toEqual(testUserSettings);
    });
  });
});
