import { Module } from '@nestjs/common';
import MessageTemplatesModel, { MessageTemplatesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/message-templates';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { MessageTemplatesController } from './message-templates.controller';
import { MessageTemplatesService } from './message-templates.service';
import { MessageTemplatesDal } from './message-templates.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ MessageTemplatesController ],
  providers  : [
    { provide: MessageTemplatesModelToken, useFactory: () => MessageTemplatesModel },
    MessageTemplatesService,
    MessageTemplatesDal
  ],
  exports: [ MessageTemplatesService ],
})
export class MessageTemplatesModule {
}
