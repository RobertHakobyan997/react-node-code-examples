import { AuthorizationService } from '../../src/components/authorization/authorization.service';

export class mockAuthorizationService {
  getAppName = () => null;
  getConfig = () => null;
  getUserAuthData = () => null;
  getUserWithRoles = () => null;
  hasUserPermissions = () => null;
  hasUserRoles = () => null;
  hasAnyUserPermissions = () => null;
  hasAnyUserRoles = () => null;
  getUser = () => null;
  updateUser = () => null;
  changeGlobalProfileId = () => null;
  findClaims = () => null;
  getApp = () => null;
  getApps = () => null;
  getAppByName = () => null;
  createApp = () => null;
  updateClaim = () => null;
  createClaims = () => null;
  deleteClaims = () => null;
  deleteClaimsByNames = () => null;
  enrichUsers = () => null;
  checkUsersPerms = () => null;
  getPermissions = () => null;
  getUserRolesNames = () => null;
  getUserGroupsNames = () => null;
  createRole = () => null;
  getRole = () => null;
  getAppRoles = () => null;
  updateRole = () => null;
  deleteRole = () => null;
  createGroup = () => null;
  getGroup = () => null;
  getAppGroups = () => null;
  updateGroup = () => null;
  deleteGroup = () => null;
  getGroupsRoles = () => null;
  assignGroupsRoles = () => null;
  addGroupUser = () => null;
  deleteGroupUser = () => null;
  getGroupUsers = () => null;
  getUserIdsBelongToGroup = () => null;
  getUsersWithRoles = () => null;
  getUserById = () => null;
  createUser = () => null;
  deleteUser = () => null;
  deleteUsers = () => null;
  createPermission = () => null;
  deleteAllAppUsers = () => null;
  deleteAllAppPermissions = () => null;
  deleteAllAppUserRoles = () => null;
  deleteAllAppRoles = () => null;
  deleteApp = () => null;
  getUserWithPermissionsAndRoles = () => null;
}

export function provideMockAuthorizationService() {
  return {
    provide: AuthorizationService,
    useClass: mockAuthorizationService,
  };
}
