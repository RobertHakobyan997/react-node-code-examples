import { of } from 'rxjs';

import { mockAuthApp, mockAuthUser } from '../../../test/data/authorization';

import { assert } from './registered-users.service.spec-setup';
import { RegisteredUsersService } from './registered-users.service';

describe('Files metadata service: ', () => {
  let registeredUsersService: RegisteredUsersService;

  beforeAll(async () => {
    registeredUsersService = await assert();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const userMock = { ...mockAuthUser, __v: '0' };
      jest
        .spyOn(
          registeredUsersService[`authorizationService`],
          'getUsersWithRoles'
        )
        .mockReturnValue(
          of({
            user: userMock,
            roles: [],
            isLastSecurityAdmin: true,
          }) as any
        );
      jest
        .spyOn(registeredUsersService[`authorizationService`], 'getApp')
        .mockReturnValue(of(mockAuthApp));
      registeredUsersService.getUsers().subscribe(res =>
        expect(res).toEqual([
          {
            userId: userMock._id,
            firstName: userMock.firstName,
            lastName: userMock.lastName,
            userEmail: userMock.email,
            employeeId: userMock.globalProfileId,
            domain: 'MERCER',
            clientAcess: 'no access',
            appName: mockAuthApp.name,
          },
        ])
      );
    });
  });
});
