import { Recipient } from '../../../../src/types/recipient.types';
import { CommunicationDocument } from '../../../../src/types/communication-document.types';
import { NotificationRequest } from '../../../../src/types/notification-request.types';
import { Notification } from '../../../../src/types/notification.types';
import { Pagination } from '../../../../src/types/pagination.types';
import { NotificationStats } from '../../../../src/types/notification-stats.types';

const recipients: Recipient = {
  groups: null,
  users: null,
};

const documents: CommunicationDocument = {
  documentId: 'string',
  name: 'string',
  size: 1,
};

const notificationRequest: NotificationRequest = {
  recipients,
  subject: 'subject',
  body: 'body',
  startDate: new Date(),
  endDate: new Date(),
  applicationKeys: 'any',
  documents: [ documents ],
  customData: 'any',
  createdByGlobalProfileID: '12',
};

export const requestData = {
  globalProfileId: 'globalProfileId',
  notificationId: 'notificationId',
  applicationKey: 'applicationKey',

  page: 1,
  limit: 10,
  sort: { 'sortString': 5 },

  hideRead: false,
  hideDeleted: false,
  hideUnread: false,
  customData: {},

  startDateFrom: new Date(),
  startDateTo: new Date(),

  expireDate: 123456789,

  notificationRequest,
};

export const notification: Notification = {
  id: 'stringId',
  recipients,
  subject: 'subject',
  body: 'body',
  startDate: new Date(),
  endDate: new Date(),
  applicationKeys: 'applicationKeys',
  status: 'status',
  documents: [ documents ],
  customData: 'any',
  createdByGlobalProfileID: 12345,
};

export const paginatedNotifications: Pagination<Notification> = {
  docs: [ notification ],
  limit: 10,
  page: 1,
  total: 20
};

export const notificationStatResponse: NotificationStats = {
  deleted: 0,
  read: 1,
  total: 5,
};
