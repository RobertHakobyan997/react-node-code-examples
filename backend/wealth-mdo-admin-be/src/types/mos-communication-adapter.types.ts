import { NotificationsApi } from './notifications-api.types';
import { MessagesApi } from './messages-api.types';

export interface MosCommunicationAdapter {
  init: (config: MosCommunicationAdapterConfig) => void;
  getNotificationsApi: () => NotificationsApi;
  getMessagesApi: () => MessagesApi;
}

interface MosCommunicationAdapterConfig {
  apiUrl: string;
  apiKey: string;
  applicationName: string;
  applicationKey: string;
}
