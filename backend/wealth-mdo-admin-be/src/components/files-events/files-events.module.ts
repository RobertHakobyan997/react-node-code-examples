import { HttpModule, Module } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';
import { AuthorizationModule } from '../authorization/authorization.module';

import { FilesEventsService } from './files-events.service';
import { FilesEventsController } from './files-events.controller';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule
  ],
  providers: [ FilesEventsService, RequestService ],
  controllers: [ FilesEventsController ]
})
export class FilesEventsModule {}
