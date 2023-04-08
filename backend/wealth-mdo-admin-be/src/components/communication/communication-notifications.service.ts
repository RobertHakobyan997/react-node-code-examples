import { Injectable } from '@nestjs/common';

import { NotificationsApi } from '../../types/notifications-api.types';
import { UserNotificationsPayload } from '../../types/user-notifications-payload.types';
import { Pagination } from '../../types/pagination.types';
import { NotificationStats } from '../../types/notification-stats.types';
import { NotificationRequest } from '../../types/notification-request.types';

import { CommunicationAdapterService } from './communication-adapter.service';

@Injectable()
export class CommunicationNotificationsService {
  private readonly notificationsAdapter: NotificationsApi;

  constructor(
    private readonly communicationAdapterService: CommunicationAdapterService
  ) {
    this.notificationsAdapter = this.communicationAdapterService.getNotificationsAdapter();
  }

  getUserNotifications(
    userNotificationsPayload: UserNotificationsPayload
  ): Promise<Pagination<Notification>> {
    const {
      globalProfileId,
      applicationKey,
      hideRead,
      hideDeleted,
      page,
      limit,
      hideUnread,
      sort,
      customData,
    } = userNotificationsPayload;
    return this.notificationsAdapter.getUserNotifications(
      globalProfileId,
      applicationKey,
      hideRead,
      hideDeleted,
      page,
      limit,
      hideUnread,
      sort,
      customData
    );
  }

  getAllNotifications(
    globalProfileId: string,
    applicationKey: string,
    page: number,
    limit: number,
    startDateFrom?: Date,
    startDateTo?: Date,
    customData?: object
  ): Promise<Pagination<Notification>> {
    return this.notificationsAdapter.getAllNotifications(
      globalProfileId,
      applicationKey,
      page,
      limit,
      startDateFrom,
      startDateTo,
      customData
    );
  }

  getNotificationStats(
    globalProfileId?: string,
    applicationKey?: string
  ): Promise<NotificationStats> {
    return this.notificationsAdapter.getNotificationStats(
      globalProfileId,
      applicationKey
    );
  }

  getNotification(notificationId: string): Promise<Notification> {
    return this.notificationsAdapter.getNotification(notificationId);
  }

  createNotification(data: NotificationRequest): Promise<Notification> {
    return this.notificationsAdapter.createNotification(data);
  }

  updateNotification(notificationId, data): Promise<Notification> {
    return this.notificationsAdapter.updateNotification(notificationId, data);
  }

  deleteNotification(notificationId: string): Promise<Notification> {
    return this.notificationsAdapter.deleteNotification(notificationId);
  }

  markNotificationAsRead(
    globalProfileId: string,
    notificationId: string
  ): Promise<Notification> {
    return this.notificationsAdapter.markNotificationAsRead(
      globalProfileId,
      notificationId
    );
  }

  markNotificationAsUnread(
    globalProfileId: string,
    notificationId: string
  ): Promise<Notification> {
    return this.notificationsAdapter.markNotificationAsUnread(
      globalProfileId,
      notificationId
    );
  }

  markNotificationAsDeleted(
    globalProfileId: string,
    notificationId: string
  ): Promise<Notification> {
    return this.notificationsAdapter.markNotificationAsDeleted(
      globalProfileId,
      notificationId
    );
  }

  sendNotification(notificationId: string): Promise<Notification> {
    return this.notificationsAdapter.sendNotification(notificationId);
  }

  archiveNotifications(
    applicationKey: string,
    expireDate: number
  ): Promise<any> {
    return this.notificationsAdapter.archiveNotifications(
      applicationKey,
      expireDate
    );
  }

  getArchivedNotifications(
    applicationKey: string,
    page: number,
    limit: number
  ): Promise<Pagination<Notification>> {
    return this.notificationsAdapter.getArchivedNotifications(
      applicationKey,
      page,
      limit
    );
  }

  getArchivedNotification(notificationId: string): Promise<Notification> {
    return this.notificationsAdapter.getArchivedNotification(notificationId);
  }
}
