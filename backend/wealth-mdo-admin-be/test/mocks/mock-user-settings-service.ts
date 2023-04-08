import { UserSettingsService } from '../../src/components/user-settings/user-settings.service';

export class MockUserSettingsService {
  getUserSettings = () => null;
  getQuickFilters = () => null;
  getPageHeaders = () => null;
  getPagesPermissions = () => null;
  getRoleCreationPermissions = () => null;
}

export function provideMockUserSettingsService() {
  return {
    provide: UserSettingsService,
    useClass: MockUserSettingsService,
  };
}
