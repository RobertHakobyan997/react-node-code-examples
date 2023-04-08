import { Module } from '@nestjs/common';
import HolidayCalendarsModel, { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';

import { DatabaseModule } from '../../core/database/mongodb/database.module';
import { RegionsModule } from '../regions/regions.module';
import { CountriesModule } from '../countries/countries.module';

import { HolidayCalendarsController } from './holiday-calendars.controller';
import { HolidayCalendarsService } from './holiday-calendars.service';
import { HolidayCalendarsDal } from './holiday-calendars.dal';

@Module({
  imports: [
    DatabaseModule,
    RegionsModule,
    CountriesModule
  ],
  controllers: [ HolidayCalendarsController ],
  providers  : [
    { provide: HolidayCalendarsModelToken, useFactory: () => HolidayCalendarsModel },
    HolidayCalendarsService,
    HolidayCalendarsDal
  ],
  exports: [ HolidayCalendarsService ],
})
export class HolidayCalendarsModule {
}
