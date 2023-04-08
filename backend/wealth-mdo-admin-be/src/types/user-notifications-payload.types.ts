export interface UserNotificationsPayload {
  globalProfileId: string;
  applicationKey: string;
  hideRead: boolean;
  hideDeleted: boolean;
  page: number;
  limit: number;
  hideUnread: boolean;
  sort: { [key: string]: number };
  customData: object;
}
