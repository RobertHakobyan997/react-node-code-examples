import { Module } from '@nestjs/common';
import ProcessingStatusesModel, { ProcessingStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/processing-statuses';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { ProcessingStatusesController } from './processing-statuses.controller';
import { ProcessingStatusesService } from './processing-statuses.service';
import { ProcessingStatusesDal } from './processing-statuses.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ ProcessingStatusesController ],
  providers  : [
    { provide: ProcessingStatusesModelToken, useFactory: () => ProcessingStatusesModel },
    ProcessingStatusesService,
    ProcessingStatusesDal
  ],
  exports: [ ProcessingStatusesService ],
})
export class ProcessingStatusesModule {
}
