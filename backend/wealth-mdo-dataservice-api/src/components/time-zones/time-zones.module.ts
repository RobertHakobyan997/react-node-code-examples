import { Module } from '@nestjs/common';
import TimeZonesModel, { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { TimeZonesService } from './time-zones.service';
import { TimeZonesDal } from './time-zones.dal';
import { TimeZonesController } from './time-zones.controller';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ TimeZonesController ],
  providers  : [
    { provide: TimeZonesToken, useFactory: () => TimeZonesModel },
    TimeZonesService,
    TimeZonesDal
  ],
  exports: [ TimeZonesService ],
})
export class TimeZonesModule {
}
