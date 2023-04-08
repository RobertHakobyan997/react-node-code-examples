import {
  requestData as rD,
  notificationStatResponse,
  paginatedNotifications,
  notification
} from '../../../test/data/communication/notifications/const';

import { CommunicationNotificationsService } from './communication-notifications.service';
import { assert } from './communication-nptification.service.spec-setup';

describe('CommunicationNotificationsService: ', () => {
  let notificationService: CommunicationNotificationsService;
  const NOTIFICATIONS_ADAPTER = 'notificationsAdapter';

  beforeAll(async () => {
    notificationService = await assert();
  });

  describe('getUserNotifications', () => {
    it('should return paginated user notification list', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getUserNotifications').mockResolvedValue(paginatedNotifications as any);

      expect(await notificationService
        .getUserNotifications(
          rD)).toEqual(paginatedNotifications);
    });
  });

  describe('getAllNotifications', () => {
    it('should return all notifications', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getAllNotifications').mockResolvedValue(paginatedNotifications as any);

      expect(await notificationService
        .getAllNotifications(
          rD.globalProfileId,
          rD.applicationKey,
          rD.page,
          rD.limit,
          rD.startDateFrom,
          rD.startDateTo)).toEqual(paginatedNotifications);
    });
  });

  describe('getNotificationStats', () => {
    it('should return statistic data of notifications', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getNotificationStats').mockResolvedValue(notificationStatResponse);

      expect(await notificationService
        .getNotificationStats(rD.globalProfileId, rD.applicationKey))
        .toEqual(notificationStatResponse);
    });
  });

  describe('getNotification', () => {
    it('should return notification by id', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .getNotification(rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('createNotification', () => {
    it('should create notification', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'createNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .createNotification(rD.notificationRequest))
        .toEqual(notification);
    });
  });

  describe('updateNotification', () => {
    it('should update notification by id', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'updateNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .updateNotification(rD.notificationId, rD.notificationRequest))
        .toEqual(notification);
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification by id', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'deleteNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .deleteNotification(rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark notification as read', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'markNotificationAsRead').mockResolvedValue(notification as any);

      expect(await notificationService
        .markNotificationAsRead(rD.globalProfileId, rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('markNotificationAsUnread', () => {
    it('should mark notification as unread', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'markNotificationAsUnread').mockResolvedValue(notification as any);

      expect(await notificationService
        .markNotificationAsUnread(rD.globalProfileId, rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('markNotificationAsDeleted', () => {
    it('should mark notification as deleted', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'markNotificationAsDeleted').mockResolvedValue(notification as any);

      expect(await notificationService
        .markNotificationAsDeleted(rD.globalProfileId, rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('sendNotification', () => {
    it('should send a notification', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'sendNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .sendNotification(rD.notificationId))
        .toEqual(notification);
    });
  });

  describe('archiveNotifications', () => {
    it('should archive notifications', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'archiveNotifications').mockResolvedValue({});

      expect(await notificationService
        .archiveNotifications(rD.applicationKey, rD.expireDate))
        .toEqual({});
    });
  });

  describe('getArchivedNotifications', () => {
    it('should return list of archived notification for the application', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getArchivedNotifications').mockResolvedValue(paginatedNotifications as any);

      expect(await notificationService
        .getArchivedNotifications(rD.applicationKey, rD.page, rD.limit))
        .toEqual(paginatedNotifications);
    });
  });

  describe('getArchivedNotification', () => {
    it('should return archived notification by notification id', async () => {
      jest.spyOn(notificationService[NOTIFICATIONS_ADAPTER], 'getArchivedNotification').mockResolvedValue(notification as any);

      expect(await notificationService
        .getArchivedNotification(rD.notificationId))
        .toEqual(notification);
    });
  });
});
