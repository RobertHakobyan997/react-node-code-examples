import { Pagination } from './pagination.types';
import { NotificationStats } from './notification-stats.types';
import { NotificationRequest } from './notification-request.types';

export interface NotificationsApi {
  getUserNotifications: (
    globalProfileId: string,
    applicationKey: string,
    hideRead: boolean,
    hideDeleted: boolean,
    page: number,
    limit: number,
    hideUnread: boolean,
    sort: { [key: string]: number },
    customData: object
  ) => Promise<Pagination<Notification>>;

  getAllNotifications: (
    globalProfileId: string,
    applicationKey: string,
    page: number,
    limit: number,
    startDateFrom?: Date,
    startDateTo?: Date,
    customData?: object
  ) => Promise<Pagination<Notification>>;

  getNotificationStats: (
    globalProfileId?: string,
    applicationKey?: string
  ) => Promise<NotificationStats>;

  getNotification: (notificationId: string) => Promise<Notification>;

  createNotification: (data: NotificationRequest) => Promise<Notification>;

  updateNotification: (notificationId, data) => Promise<Notification>;

  deleteNotification: (notificationId: string) => Promise<Notification>;

  markNotificationAsRead: (
    globalProfileId: string,
    notificationId: string
  ) => Promise<Notification>;

  markNotificationAsUnread: (
    globalProfileId: string,
    notificationId: string
  ) => Promise<Notification>;

  markNotificationAsDeleted: (
    globalProfileId: string,
    notificationId: string
  ) => Promise<Notification>;

  sendNotification: (notificationId: string) => Promise<Notification>;

  archiveNotifications: (
    applicationKey: string,
    expireDate: number
  ) => Promise<any>;

  getArchivedNotifications: (
    applicationKey: string,
    page: number,
    limit: number
  ) => Promise<Pagination<Notification>>;

  getArchivedNotification: (notificationId: string) => Promise<Notification>;
}
