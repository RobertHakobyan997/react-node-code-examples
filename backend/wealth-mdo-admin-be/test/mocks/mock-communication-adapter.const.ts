import { NotificationsApi } from '../../src/types/notifications-api.types';
import { MessagesApi } from '../../src/types/messages-api.types';

export const mockNotificationsApi: NotificationsApi = {
  archiveNotifications: () => null,
  createNotification: () => null,
  deleteNotification: () => null,
  getAllNotifications: () => null,
  getArchivedNotification: () => null,
  getArchivedNotifications: () => null,
  getNotification: () => null,
  getNotificationStats: () => null,
  getUserNotifications: () => null,
  markNotificationAsDeleted: () => null,
  markNotificationAsRead: () => null,
  markNotificationAsUnread: () => null,
  sendNotification: () => null,
  updateNotification: () => null,
};
export const mockMessagesApi: MessagesApi = {
  archiveMessages: () => null,
  createMessage: () => null,
  deleteMessage: () => null,
  getArchivedMessage: () => null,
  getArchivedMessages: () => null,
  getFailedMessage: () => null,
  getFailedMessageIds: () => null,
  getFailedMessages: () => null,
  getMessage: () => null,
  getMessages: () => null,
  markMessageAsDeleted: () => null,
  markMessageAsRead: () => null,
  sendMessage: () => null,
  updateMessage: () => null,
};

export const mockCommunicationAdapter = {
  getNotificationsAdapter(): NotificationsApi {
    return mockNotificationsApi;
  },
  getMessagesAdapter(): MessagesApi {
    return mockMessagesApi;
  },
};
