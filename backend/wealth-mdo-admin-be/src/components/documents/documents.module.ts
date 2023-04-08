import { HttpModule, Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { RequestService } from '../../core/request/request.service';
import { AuthorizationModule } from '../authorization/authorization.module';

import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports    : [
    HttpModule.register({
      headers: { apikey: process.env.MOS_DOCUMENT_API_KEY },
    }),
    FilesModule,
    AuthorizationModule,
  ],
  controllers: [ DocumentsController ],
  providers  : [ RequestService, DocumentsService ],
})
export class DocumentsModule {
}
