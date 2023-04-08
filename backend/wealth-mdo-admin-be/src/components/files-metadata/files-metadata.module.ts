import { HttpModule, Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RequestService } from '../../core/request/request.service';

import { FilesMetadataController } from './files-metadata.controller';
import { FilesMetadataService } from './files-metadata.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule,
  ],
  controllers: [ FilesMetadataController ],
  providers: [ RequestService, FilesMetadataService ],
  exports: [ FilesMetadataService ],
})
export class FilesMetadataModule {}
