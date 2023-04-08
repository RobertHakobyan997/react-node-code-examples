import { Injectable } from '@nestjs/common';

import { MosCommunicationAdapter } from '../../types/mos-communication-adapter.types';
import { NotificationsApi } from '../../types/notifications-api.types';
import { MessagesApi } from '../../types/messages-api.types';

@Injectable()
export class CommunicationAdapterService {
  private readonly api: MosCommunicationAdapter;
  constructor() {
    this.api = require('ngpd-merceros-communication-adapter/dist').API;
    this.api.init({
      apiKey: process.env.COMMUNICATION_API_KEY ?? '',
      apiUrl: process.env.COMMUNICATION_API_URL ?? '',
      applicationKey: process.env.COMMUNICATION_API_APP_KEY ?? '',
      applicationName: process.env.COMMUNICATION_API_APP_NAME ?? '',
    });
  }

  getNotificationsAdapter(): NotificationsApi {
    return this.api.getNotificationsApi();
  }

  getMessagesAdapter(): MessagesApi {
    return this.api.getMessagesApi();
  }
}
