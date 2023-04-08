import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { ObjectId } from 'mongodb';

export const testRoleCreationPermissions = [
  {
    _id: new ObjectId('6078f858194984ad90f1b507'),
    permission: Permissions.createSecurityAdmin,
    role: 'security admin',
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    permission: Permissions.createAdvancedUser,
    role: 'advanced user',
  }
];
