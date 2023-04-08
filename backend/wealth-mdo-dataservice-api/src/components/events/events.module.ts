import { Module } from '@nestjs/common';
import EventsModel, { EventsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';

import { DatabaseModule } from '../../core/database/mongodb/database.module';
import { ScheduleStatusesModule } from '../schedule/schedule-statuses.module';
import { TimeZonesModule } from '../time-zones/time-zones.module';

import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsDal } from './events.dal';

@Module({
  imports  : [ DatabaseModule, ScheduleStatusesModule, TimeZonesModule ],
  providers: [
    { provide: EventsModelToken, useFactory: () => EventsModel },
    EventsService,
    EventsDal,
    ScheduleStatusesModule
  ],
  controllers: [ EventsController ],
  exports    : [ EventsService ],
})
export class EventsModule {
}
