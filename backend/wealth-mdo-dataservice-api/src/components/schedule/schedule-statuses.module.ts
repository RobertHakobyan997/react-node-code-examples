import { Module } from '@nestjs/common';
import ScheduleStatusesModel, { ScheduleStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/schedule-statuses';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { ScheduleStatusesService } from './schedule-statuses.service';
import { ScheduleStatusesController } from './schedule-statuses.controller';
import { ScheduleStatusesDal } from './schedule-statuses.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ ScheduleStatusesController ],
  providers  : [
    { provide: ScheduleStatusesModelToken, useFactory: () => ScheduleStatusesModel },
    ScheduleStatusesService,
    ScheduleStatusesDal
  ],
  exports: [ ScheduleStatusesService ],
})
export class ScheduleStatusesModule {
}
