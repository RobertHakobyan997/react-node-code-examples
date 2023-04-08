import { HttpModule, Module } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';
import { AuthorizationModule } from '../authorization/authorization.module';

import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule,
  ],
  controllers: [ ContactsController ],
  providers: [ RequestService, ContactsService ],
  exports: [ ContactsService ]
})
export class ContactsModule {}
