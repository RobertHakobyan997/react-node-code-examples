import { Module } from '@nestjs/common';

import { CommunicationAdapterService } from './communication-adapter.service';
import { CommunicationMessagesService } from './communication-messages.service';
import { CommunicationNotificationsService } from './communication-notifications.service';
import { CommunicationEmailService } from './communication-email.service';

@Module({
  imports: [],
  providers: [
    CommunicationAdapterService,
    CommunicationMessagesService,
    CommunicationNotificationsService,
    CommunicationEmailService,
  ],
  exports: [ CommunicationEmailService ]
})
export class CommunicationModule {}
