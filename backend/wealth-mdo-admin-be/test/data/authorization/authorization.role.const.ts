import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { mockAuthCommonData } from './authorization.common.data.const';

export const mockAuthRole = {
  ...mockAuthCommonData,
  permissions: [ Permissions.dashboardPage, Permissions.createAdvancedUser ],
  readonly: true,
};

export const mockSecurityAdminRole = {
  permissions: [
    '5db311af5794e200194891de'
  ],
  _id: '5db311afef8df000195645b7',
  appId: '5db311aed7e95996b336f461',
  name: 'security admin',
  readonly: false
};

export const mockSuperAdminRole = {
  permissions: [
    '60ba0cd35b0d39865a5760af',
    '61cab1df19571116ec674086',
    '61cc3f17557d7555fe29721f'
  ],
  _id: '5db312af5794e200194891e0',
  appId: '5db311aed7e95996b336f461',
  name: 'superadmin',
  readonly: false
};

export const mockBasicUserRole = {
  permissions: [
    '60ba0cd35b0d39865a5760af'
  ],
  _id: '6151c4c42d6e37b573c4484e',
  appId: '5db311aed7e95996b336f461',
  name: 'basic user',
  readonly: false
};

export const mockAdvancedUserRole = {
  permissions: [
    '60ba0cd35b0d39865a5760af',
    '61cab1df19571116ec674086',
    '61cc3f17557d7555fe29721f'
  ],
  _id: '5db311af5794e200194891e0',
  appId: '5db311aed7e95996b336f461',
  name: 'advanced user',
  readonly: false
};
