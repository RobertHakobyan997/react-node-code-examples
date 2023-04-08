import { PagesPermissions } from '../core/schemas/pages-permissions.schema';

export interface IAuthApp {
  _id: string;
  name: string;
}

export interface IAuthData {
  user: IAuthUser;
  roles: IAuthRole[];
  isLastSecurityAdmin?: boolean;
}

export interface UserData extends IAuthData {
  availableRolesToSet: AuthRoleCommon[];
  accessiblePages: PagesPermissions[];
  availableRolesToManagePermissions: AvailableRoleToManagePermissions[];
}

export interface AuthRoleCommon {
  _id?: string;
  name: string;
}
export interface AvailableRoleToManagePermissions extends AuthRoleCommon {
  permissions: string[];
}
export interface IAuthRole extends AuthRoleCommon {
  appId: string;
  permissions?: string[];
  readonly: boolean;
}

export interface IAuthGroup {
  _id?: string;
  appId: string;
  name: string;
}

export interface IAuthClaim {
  _id?: string;
  appId?: string;
  globalProfileId?: string | number;
  name: string;
  value: any;
}

export interface IAuthClaimCriteria {
  ids?: string | string[];
  appId?: string;
  globalProfileId?: string | number;
  name?: string;
  value?: any;
  regex?: boolean;
  query?: any;
}

export interface IAuthUser {
  _id?: string;
  appId?: string;
  email: string;
  firstName: string;
  lastName: string;
  globalProfileId: string | number;
  phone?: string;
  title?: string;
  roles?: string[];
  groups?: string[];
  claims?: string[];
  activated: boolean;
}

export interface IAuthPermission {
  _id?: string;
  appId?: string;
  name: string;
}

export interface IAuthUserCriteria {
  appId: string;
  email?: string;
  includeRoles?: boolean;
  name?: string;
  permissionsOr?: string[];
  permissionsAnd?: string[];
  activated?: boolean;
  skip?: string;
  limit?: string;
}

export interface IAuthGroupUser {
  groupId: string;
  globalProfileId: string;
}
