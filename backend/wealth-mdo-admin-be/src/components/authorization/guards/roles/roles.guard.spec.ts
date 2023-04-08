import { of } from 'rxjs';

import { mockAuthData } from '../../../../../test/data/authorization/authorization.data.const';
import { getContext } from '../../../../../test/mocks/setup-execution-context';

import { RolesGuard } from './roles.guard';
import { assert } from './roles.guard.spec-setup';

describe('Authorization guard:', () => {
  let rolesGuard: RolesGuard;

  beforeAll(async () => {
    rolesGuard = await assert();
  });

  describe('canActivate', () => {
    it('should return true when there are no roles on the endpoint', async () => {
      const context = getContext({});
      jest.spyOn(rolesGuard[`reflector`], 'getAllAndOverride').mockReturnValue(null);

      const result = await rolesGuard.canActivate(context);
      expect(result).toEqual(true);
    });

    it('should return true when there are roles on the endpoint and user has a role', async () => {
      const context = getContext({ headers: { authorization: 'smth' } });
      jest.spyOn(rolesGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'admin',
        'name',
      ]);
      jest.spyOn(rolesGuard[`jwtService`], 'decode').mockReturnValue({
        globalprofileid: 'smth',
      });
      jest.spyOn(rolesGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of(mockAuthData)
      );

      const result = await rolesGuard.canActivate(context);
      expect(result).toEqual(true);
    });

    it('should return false when user has no role', async () => {
      const context = getContext({ headers: { authorization: 'Bearer smth' } });
      jest.spyOn(rolesGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'operator',
      ]);
      jest.spyOn(rolesGuard[`jwtService`], 'decode').mockReturnValue({
        globalprofileid: 'smth',
      });
      jest.spyOn(rolesGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of(mockAuthData)
      );

      const result = await rolesGuard.canActivate(context);
      expect(result).toEqual(false);
    });

    it('should return false if there are no roles for the user', async () => {
      const context = getContext({ headers: { authorization: 'Bearer smth' } });
      jest.spyOn(rolesGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'operator',
      ]);
      jest.spyOn(rolesGuard[`jwtService`], 'decode').mockReturnValue({
        globalprofileid: 'smth',
      });
      jest.spyOn(rolesGuard[`authService`], 'getUserWithRoles').mockReturnValue(
        of({}) as any
      );

      const result = await rolesGuard.canActivate(context);
      expect(result).toEqual(false);
    });

    it('should return false if there is no authorization header', async () => {
      const context = getContext({ headers: {} });
      jest.spyOn(rolesGuard[`reflector`], 'getAllAndOverride').mockReturnValue([
        'operator',
      ]);

      const result = await rolesGuard.canActivate(context);
      expect(result).toEqual(false);
    });
  });
});
