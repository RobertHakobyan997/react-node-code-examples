import { HttpModule, Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RequestService } from '../../core/request/request.service';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports    : [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule,
  ],
  controllers: [ FilesController ],
  providers  : [ RequestService, FilesService ],
  exports    : [ FilesService ],
})
export class FilesModule {
}
