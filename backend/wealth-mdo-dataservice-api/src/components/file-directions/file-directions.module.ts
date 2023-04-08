import { Module } from '@nestjs/common';
import FileDirectionsModel, { FileDirectionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { FileDirectionsController } from './file-directions.controller';
import { FileDirectionsService } from './file-directions.service';
import { FileDirectionsDal } from './file-directions.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ FileDirectionsController ],
  providers  : [
    { provide: FileDirectionsModelToken, useFactory: () => FileDirectionsModel },
    FileDirectionsService,
    FileDirectionsDal
  ],
  exports: [ FileDirectionsService ],
})
export class FileDirectionsModule {
}
