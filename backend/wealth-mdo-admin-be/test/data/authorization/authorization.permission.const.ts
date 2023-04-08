import { mockAuthCommonData } from './authorization.common.data.const';

export const mockAuthPermission = {
  ...mockAuthCommonData,
};

export const mockResendPermission = {
  _id: '61cab1df19571116ec674086',
  name: 'resend file',
  appId: '5db311aed7e95996b336f461'
};

export const mockReprocessPermission = {
  _id: '61cc3f17557d7555fe29721f',
  name: 'reprocess file',
  appId: '5db311aed7e95996b336f461'
};

export const mockDashboardPermission = {
  _id: '60ba0cd35b0d39865a5760af',
  name: 'dashboard page',
  appId: '5db311aed7e95996b336f461'
};
