import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { ObjectId } from 'mongodb';

export const testPagesPermissions = [
  {
    _id: new ObjectId('6078f858194984ad90f1b507'),
    permission: Permissions.dashboardPage,
    actionPermissions: [],
    route: '/dashboard',
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    permission: Permissions.manageUsersPage,
    actionPermissions: [],
    route: '/manage-users',
  }
];
