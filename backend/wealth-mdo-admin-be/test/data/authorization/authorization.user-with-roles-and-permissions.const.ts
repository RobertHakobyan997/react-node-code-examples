import { ForbiddenException, HttpStatus } from '@nestjs/common';

import { mockAuthData, mockSecurityAdminRole, mockDBUser, mockAuthPermission } from '../authorization';
import { testPagesPermissions } from '../user-settings/pages-permissions.const';

export const userWithRolesAndPermissions = {
  ...mockAuthData,
  accessiblePages: [
    {
      actionPermissions: testPagesPermissions[0].actionPermissions,
      route: testPagesPermissions[0].route,
      permission: testPagesPermissions[0].permission
    }
  ],
  availableRolesToSet: [
    {
      _id: mockSecurityAdminRole._id,
      name: 'advanced user',
    }
  ],
  availableRolesToManagePermissions: []
};

export const mockUserWithoutPermissions = {
  user: mockDBUser,
  roles: [ { permissions: [] } ]
};

export  const mockDeactivatedUser = {
  user: { activated: false },
  roles: [ { permissions: [ mockAuthPermission ] } ]
};

export const mockNotFoundUser = {
  user: null,
  roles: [ { permissions: [ mockAuthPermission ] } ]
};

export const mockForbiddenError =  new ForbiddenException({
  // eslint-disable-next-line max-len
  message:`The email address entered was not found or has not yet been granted permissions to access this site. Please contact your account administrator.`,
  shouldLogout: true,
  statusCode: HttpStatus.FORBIDDEN
});
