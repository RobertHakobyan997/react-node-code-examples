import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { ObjectId } from 'mongodb';

export const testManageRolesPermissions = [
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    permission: Permissions.createSecurityAdmin,
    roles: [ 'advanced user' ],
    disabledRolesForManage: [],
  }
];
