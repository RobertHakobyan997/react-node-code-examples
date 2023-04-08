import { HttpModule, Module } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';

import { MessageTemplatesService } from './message-templates.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
  ],
  providers: [ MessageTemplatesService, RequestService ],
  exports: [ MessageTemplatesService ]
})
export class MessageTemplatesModule {}
