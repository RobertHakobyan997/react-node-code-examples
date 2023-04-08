import { of } from 'rxjs';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { mockAuthData } from '../../../../../test/data/authorization/authorization.data.const';
import { getContext } from '../../../../../test/mocks/setup-execution-context';

import { PermissionsGuard } from './permissions.guard';
import { assert } from './permissions.guard.spec-setup';

describe('Authorization guard:', () => {
  let permissionsGuard: PermissionsGuard;

  beforeAll(async () => {
    permissionsGuard = await assert();
  });

  describe('canActivate', () => {
    it('should return true when there are no permissions on the endpoint', async () => {
      const context = getContext({});
      jest.spyOn(permissionsGuard[`reflector`], 'getAllAndOverride').mockReturnValue(null);

      const result = await permissionsGuard.canActivate(context);
      expect(result).toEqual(true);
    });

    it('should return true when there are permissions on the endpoint and user has a permission', async () => {
      const context = getContext({ headers: { authorization: 'smth' }, user: { globalprofileid: '12345' } });
      jest.spyOn(permissionsGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        Permissions.dashboardPage,
        'name',
      ]);
      jest.spyOn(permissionsGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of(mockAuthData)
      );

      const result = await permissionsGuard.canActivate(context);
      expect(result).toEqual(true);
    });

    it('should return false when user has no permission', async () => {
      const context = getContext({ headers: { authorization: 'Bearer smth' }, user: { globalprofileid: '12345' } });
      jest.spyOn(permissionsGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'name',
      ]);
      jest.spyOn(permissionsGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of(mockAuthData)
      );

      const result = await permissionsGuard.canActivate(context);
      expect(result).toEqual(false);
    });

    it('should return false if there are no permissions for the user', async () => {
      const context = getContext({ headers: { authorization: 'Bearer smth' }, user: { globalprofileid: '12345' } });
      jest.spyOn(permissionsGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'dashboard',
      ]);
      jest.spyOn(permissionsGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of({}) as any
      );

      const result = await permissionsGuard.canActivate(context);
      expect(result).toEqual(undefined);
    });

    it('should return false if there is no authorization header', async () => {
      const context = getContext({ headers: {} });
      jest.spyOn(permissionsGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'dashboard',
      ]);

      const result = await permissionsGuard.canActivate(context);
      expect(result).toEqual(false);
    });
  });
});
