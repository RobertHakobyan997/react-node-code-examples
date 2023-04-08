import { of, throwError } from 'rxjs';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SiemEvent } from 'ngpd-merceros-logger-be';

import { AUTH_DATA } from '../../../test/data/authorization/authorization.const';
import {
  matchingField,
  mockAdvancedUserRole,
  mockAuthApp,
  mockAuthData,
  mockAuthDataArray,
  mockAuthGroupData,
  mockAuthGroupRolesRequest,
  mockAuthGroupRolesResponse,
  mockAuthGroupUser,
  mockAuthPermission,
  mockAuthRole,
  mockAuthUser,
  mockAuthUserCriteria,
  mockBasicUserRole,
  mockDashboardPermission,
  mockDBUser,
  mockDeactivatedUser,
  mockForbiddenError,
  mockJwtUser,
  mockNotFoundUser,
  mockReprocessPermission,
  mockResendPermission,
  mockSecurityAdminRole,
  mockSuperAdminRole,
  mockUserWithoutPermissions,
  userWithRolesAndPermissions,
} from '../../../test/data/authorization';
import { newTestUser, oldTestUser } from '../../../test/data/events/events.const';
import { testPagesPermissions } from '../../../test/data/user-settings/pages-permissions.const';
import { testRoleCreationPermissions } from '../../../test/data/user-settings/role-creation-permissions.const';
import { mockMssoUser } from '../../../test/data/authentication/msso-saml-user';
import { testManageRolesPermissions } from '../../../test/data/user-settings/manage-roles-permissions.const';

import { assert } from './authorization.service.spec-setup';
import { AuthorizationService } from './authorization.service';

describe('Authorization service: ', () => {
  let authorizationService: AuthorizationService;

  beforeAll(async () => {
    authorizationService = await assert();
    jest.spyOn(authorizationService[`authClientApi`], 'getApp').mockReturnValue(
      of(mockAuthApp),
    );
  });

  describe('getUserWithRoles', () => {
    it('should return user auth data', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockAuthData));
      authorizationService
        .getUserWithRoles(AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => expect(res).toEqual(mockAuthData));
    });
  });

  describe('getUser', () => {
    it('should return list of users', async () => {
      jest.spyOn(authorizationService[`authClientApi`], 'getUser').mockReturnValue(
        of([ mockAuthUser ]),
      );
      authorizationService
        .getUser(mockAuthUserCriteria)
        .subscribe(res => expect(res).toEqual([ mockAuthUser ]));
    });
  });

  describe('createEvent', () => {
    it('should create event based on user action and event to the events collection', async () => {
      jest.spyOn(authorizationService['authClientApi'], 'getUserWithRoles').mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['eventEmitter'], 'emit');
      await authorizationService
        .createEvent({
          jwtUser : mockJwtUser,
          topic   : '',
          oldValue: oldTestUser,
          newValue: newTestUser,
        }, SiemEvent.UserCreated);
      expect(authorizationService['eventEmitter'].emit).toHaveBeenCalled();
    });
  });

  describe('hasUniqueGlobalProfileId', () => {
    it('should check if a user with provided globalProfileId already exists in DB', async () => {
      const newUser = { ...mockAuthUser, __v: '0' };

      jest.spyOn(authorizationService[`authClientApi`], 'getUser').mockReturnValue(
        of([ mockAuthUser ]),
      );
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppRoles',
      ).mockReturnValue(of([ mockAuthRole, mockAuthRole ]));

      await expect(authorizationService.hasUniqueGlobalProfileId(newUser.globalProfileId))
        .rejects
        .toThrowError(ConflictException);
    });
  });

  describe('createUser', () => {
    it('should create user for current app based on appId and log user creation to events collection', async () => {
      const newUser = { ...mockAuthUser, __v: '0' };

      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService, 'hasUniqueGlobalProfileId').mockResolvedValue([]);
      jest.spyOn(authorizationService['authClientApi'], 'createUser').mockReturnValue(of(newUser) as any);

      const result = await authorizationService
        .createUser(mockJwtUser, newUser);
      expect(result).toEqual(newUser);
    });

    it('should catch ConflictException', async () => {
      const newUser = { ...mockAuthUser, __v: '0' };

      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService, 'hasUniqueGlobalProfileId').mockResolvedValue([]);
      jest.spyOn(authorizationService['authClientApi'], 'createUser').mockImplementation(() => {
        throw new ConflictException('test message');
      });

      await expect(authorizationService.createUser(mockJwtUser, newUser))
        .rejects
        .toThrowError(ConflictException);
    });

    it('should catch InternalServerErrorException', async () => {
      const newUser = { ...mockAuthUser, __v: '0' };

      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService, 'hasUniqueGlobalProfileId').mockResolvedValue([]);
      jest.spyOn(authorizationService['authClientApi'], 'createUser').mockImplementation(() => {
        throw new InternalServerErrorException('test message');
      });

      await expect(authorizationService.createUser(mockJwtUser, newUser))
        .rejects
        .toThrowError(InternalServerErrorException);
    });
  });

  describe('updateUser', () => {
    it('should update user and log event to events collection', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'updateUser').mockReturnValue(of(mockAuthUser) as any);
      jest.spyOn(authorizationService['userService'], 'updateUser').mockReturnValue(mockMssoUser as any);

      const result = await authorizationService.updateUser(mockJwtUser, mockAuthUser);
      expect(authorizationService['userService'].updateUser).toHaveBeenCalledWith(result.globalProfileId.toString(), {
        firstName: result.firstName,
        lastName: result.lastName,
        username: result.email,
        role: result.roles[0]
      });
      expect(result).toEqual(mockAuthUser);
    });

    it('should catch InternalServerErrorException', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'updateUser').mockImplementation(() => {
        throw new InternalServerErrorException('test message');
      });
      jest.spyOn(authorizationService['userService'], 'updateUser').mockReturnValue(mockMssoUser as any);

      await expect(authorizationService.createUser(mockJwtUser, mockAuthUser))
        .rejects
        .toThrowError(InternalServerErrorException);
    });
  });

  describe('deleteUser', () => {
    it('should return deleted user', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'deleteUser').mockReturnValue(of(mockAuthUser) as any);
      jest.spyOn(authorizationService['userService'], 'deleteUser');

      const result = await authorizationService.deleteUser(mockJwtUser, mockAuthUser.globalProfileId.toString());
      expect(authorizationService['userService'].deleteUser).toHaveBeenCalledWith(result.globalProfileId.toString());
      expect(result).toEqual(mockAuthUser);
    });

    it('should catch InternalServerErrorException', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'deleteUser').mockReturnValue(of(mockAuthUser) as any);
      jest.spyOn(authorizationService['userService'], 'deleteUser').mockImplementation(() => {
        throw new InternalServerErrorException('test message');
      });

      await expect(authorizationService.deleteUser(mockJwtUser, mockAuthUser.globalProfileId.toString()))
        .rejects
        .toThrowError(InternalServerErrorException);
    });
  });

  describe('activateUser', () => {
    it('should return updated user', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'updateUser').mockReturnValue(of(mockAuthUser) as any);
      const result = await authorizationService
        .activateUser(mockJwtUser, mockAuthUser, true);
      expect(result).toEqual(mockAuthUser);
    });
    it('should throw an error', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDBUser) as any);
      jest.spyOn(authorizationService['authClientApi'], 'updateUser').mockImplementation(() => throwError('Error'));
      await expect(authorizationService
        .activateUser(mockJwtUser, mockAuthUser, true)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getApp', () => {
    it('should return app info', async () => {
      authorizationService
        .getApp()
        .subscribe(res => expect(res).toEqual(mockAuthApp));
    });
  });

  describe('getPermissions', () => {
    it('should return permissions', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getPermissions',
      ).mockReturnValue(of(mockAuthPermission) as any);
      authorizationService
        .getPermissions()
        .subscribe(res => expect(res).toEqual(mockAuthPermission));
    });
  });

  describe('createRole', () => {
    it('should return created role', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'createRole',
      ).mockReturnValue(of(mockAuthRole) as any);
      authorizationService
        .createRole(mockAuthRole)
        .subscribe(res => expect(res).toEqual(mockAuthRole));
    });
  });

  describe('getAppRoles', () => {
    it('should return app roles', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppRoles',
      ).mockReturnValue(of([ mockAuthRole, mockAuthRole ]) as any);
      authorizationService
        .getRoles()
        .subscribe(res => expect(res).toEqual([ mockAuthRole, mockAuthRole ]));
    });
  });

  describe('createGroup', () => {
    it('should return created group', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'createGroup',
      ).mockReturnValue(of(mockAuthGroupData) as any);
      authorizationService
        .createGroup(mockAuthGroupData)
        .subscribe(res => expect(res).toEqual(mockAuthGroupData));
    });
  });

  describe('getAppGroups', () => {
    it('should return app groups', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppGroups',
      ).mockReturnValue(of([ mockAuthGroupData, mockAuthGroupData ]) as any);
      authorizationService
        .getGroups()
        .subscribe(res =>
          expect(res).toEqual([ mockAuthGroupData, mockAuthGroupData ]),
        );
    });
  });

  describe('assignGroupsRoles', () => {
    it('should return assigned group roles', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'assignGroupsRoles',
      ).mockReturnValue(of(mockAuthGroupRolesResponse) as any);
      authorizationService
        .assignGroupsRoles(mockAuthGroupRolesRequest.data)
        .subscribe(res => expect(res).toEqual(mockAuthGroupRolesResponse));
    });
  });

  describe('addGroupUser', () => {
    it('should return group user', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'addGroupUser',
      ).mockReturnValue(of(mockAuthGroupUser) as any);
      authorizationService
        .addGroupUser(AUTH_DATA.GROUP_ID, AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => expect(res).toEqual(mockAuthGroupUser));
    });
  });

  describe('createPermission', () => {
    it('should delete app permissions and mongo remove info', async () => {
      const result = { ...mockAuthPermission, __v: '0' };
      jest.spyOn(
        authorizationService[`authClientApi`],
        'createPermission',
      ).mockReturnValue(of(result) as any);
      authorizationService
        .createPermission(AUTH_DATA.PERMISSION_FIRST)
        .subscribe(res => expect(res).toEqual(result));
    });
  });

  describe('getUsersWithRoles', () => {
    it('should return an array of users with roles for each user', done => {
      const userMock = { ...mockAuthUser, __v: '0' };
      const userRoles = [ { ...mockAuthRole, __v: '0' } ];
      jest.spyOn(authorizationService[`authClientApi`], 'getUser').mockReturnValue(
        of([ userMock ]) as any,
      );
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppRoles',
      ).mockReturnValue(of(userRoles) as any);
      authorizationService
        .getUsersWithRoles()
        .subscribe(res => {
          expect(res).toEqual({ user: userMock, roles: [], isLastSecurityAdmin: false });
          done();
        });
    });
  });

  describe('getUsersWithRolesFiltered', () => {
    it('should return an array of users with roles for each user filtered by role', async () => {
      const userMock = { ...mockAuthUser, __v: '0' };
      const userRoles = [ { ...mockAuthRole, __v: '0' } ];
      userMock.roles = [ mockAuthRole._id ];
      jest.spyOn(authorizationService[`authClientApi`], 'getUser').mockReturnValue(
        of([ userMock ]) as any,
      );
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppRoles',
      ).mockReturnValue(of(userRoles) as any);
      authorizationService
        .getUsersWithRolesFiltered(mockAuthRole._id, '', '')
        .subscribe(res => expect(res).toEqual([ { user: userMock, roles: userRoles, isLastSecurityAdmin: false } ]));
    });

    it('should return an array of users with roles filtered by role and queryString', async () => {
      jest.spyOn(authorizationService, 'getUsersWithRoles').mockReturnValue(
        of(mockAuthDataArray[1]) as any,
      );

      authorizationService
        .getUsersWithRolesFiltered(mockAuthRole._id, '', matchingField)
        .subscribe(res =>
          expect(res).toEqual([ mockAuthDataArray[1] ]),
        );
    });

    it('should return an empty array', async () => {
      jest.spyOn(authorizationService, 'getUsersWithRoles').mockReturnValue(
        of(mockAuthData) as any,
      );

      authorizationService
        .getUsersWithRolesFiltered(mockAuthRole._id, '', 'queryWithoutMatches')
        .subscribe(res =>
          expect(res.length).toEqual(0),
        );
    });
  });

  describe('getCurrentAppRoles', () => {
    it('should return all roles for current app based on appId', async () => {
      const userRoles = [ { ...mockAuthRole, __v: '0' } ];
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getAppRoles',
      ).mockReturnValue(of(userRoles) as any);
      authorizationService
        .getRoles()
        .subscribe(res => expect(res).toEqual(userRoles));
    });
  });

  describe('getUserWithPermissionsAndRoles', () => {
    beforeEach(() => {
      jest.spyOn(
        authorizationService,
        'getRoles',
      ).mockReturnValue(of([ { ...mockSecurityAdminRole, name: 'advanced user' } ]));
      jest.spyOn(
        authorizationService[`userSettingsService`],
        'getPagesPermissions',
      ).mockReturnValue(of(testPagesPermissions) as any);
      jest.spyOn(
        authorizationService[`userSettingsService`],
        'getRoleCreationPermissions',
      ).mockReturnValue(of(testRoleCreationPermissions) as any);
      jest.spyOn(
        authorizationService[`manageRolesPermissionsService`],
        'findAll',
      ).mockReturnValue(of(testManageRolesPermissions) as any);
    });
    it('should return user auth data', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockAuthData));

      authorizationService
        .getUserWithPermissionsAndRoles(AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => expect(res).toEqual(userWithRolesAndPermissions));
    });
    it('should throw error if user has no permissions', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockUserWithoutPermissions as any));

      authorizationService
        .getUserWithPermissionsAndRoles(AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => res, error => expect(error).toEqual(mockForbiddenError));
    });
    it('should throw error if user is not activated', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDeactivatedUser) as any);

      authorizationService
        .getUserWithPermissionsAndRoles(AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => res, error => expect(error).toEqual(mockForbiddenError));
    });
    it('should throw error if user is not found in authorization DB', async () => {
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockNotFoundUser as any));

      authorizationService
        .getUserWithPermissionsAndRoles(AUTH_DATA.GLOBAL_PROFILE_ID)
        .subscribe(res => res, error => expect(error).toEqual(mockForbiddenError));
    });
  });

  describe('mapAvailableManageRolesPermissions', () => {
    it('should include disabled role without resend/reprocess permissios in result', () => {
      const testRoles = [
        mockSuperAdminRole,
        mockAdvancedUserRole,
        mockBasicUserRole
      ];
      const testManageRolesPermissions = [
        {
          permission: 'resend file',
          roles: [],
          disabledRolesForManage: [ 'basic user' ]
        },
        {
          permission: 'reprocess file',
          roles: [],
          disabledRolesForManage: [ 'basic user' ]
        }
      ];
      const testPermissions = [
        mockResendPermission,
        mockReprocessPermission,
        mockDashboardPermission
      ];

      const result = authorizationService['mapAvailableManageRolesPermissions'](testRoles, testManageRolesPermissions, testPermissions);
      console.log(result);
      expect(result).toEqual(
        expect.arrayContaining([ {
          _id: mockBasicUserRole._id,
          name: mockBasicUserRole.name,
          permissions: []
        } ])
      );
    });
  });
});

