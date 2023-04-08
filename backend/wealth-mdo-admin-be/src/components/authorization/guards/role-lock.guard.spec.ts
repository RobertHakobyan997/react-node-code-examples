import { from } from 'rxjs';
import { IAuthData } from 'ngpd-merceros-wealth-mdo-common-fe';
import { BadRequestException } from '@nestjs/common';

import { getContext } from '../../../../test/mocks/setup-execution-context';
import { mockAuthUser, mockSecurityAdminRole } from '../../../../test/data/authorization';
import { mockJwtUser } from '../../../../test/data/authorization/authorization.user.const';

import { RoleLockGuard } from './role-lock.guard';
import { assert } from './role-lock.guard.spec-setup';

describe('Role lock guard:', () => {
  let roleLockGuard: RoleLockGuard;

  beforeAll(async () => {
    roleLockGuard = await assert();
  });

  describe('canActivate', () => {
    it('should return true if there are more than 1 activated user with security admin role', () => {
      const context = getContext({ body: {}, query: { id: mockAuthUser._id }, user: mockJwtUser });
      jest.spyOn(
        roleLockGuard['service'],
        'getUsersWithRoles',
      ).mockReturnValue(from<IAuthData[]>([
        { user: { ...mockAuthUser }, roles: [ mockSecurityAdminRole ] },
        { user: { ...mockAuthUser, _id: '6020e66d9fb8c58e72335bd6' }, roles: [ mockSecurityAdminRole ] },
      ]));

      roleLockGuard
        .canActivate(context)
        .subscribe(res => expect(res).toBeTruthy());
    });

    it('should throw an error if there is only 1 activated user with security admin role', async () => {
      const context = getContext({ body: { _id: mockAuthUser._id }, query: {}, user: mockJwtUser });
      jest.spyOn(
        roleLockGuard['service'],
        'getUsersWithRoles',
      ).mockReturnValue(from<IAuthData[]>([
        { user: { ...mockAuthUser }, roles: [ mockSecurityAdminRole ] },
        { user: { ...mockAuthUser, activated: false }, roles: [ mockSecurityAdminRole ] },
      ]));

      const throws = () => roleLockGuard.canActivate(context).toPromise();
      await expect(throws()).rejects.toThrow(BadRequestException);
    });
  });
});

