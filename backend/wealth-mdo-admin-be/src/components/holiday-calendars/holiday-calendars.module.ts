import { HttpModule, Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { RequestService } from '../../core/request/request.service';

import { HolidayCalendarsController } from './holiday-calendars.controller';
import { HolidayCalendarsService } from './holiday-calendars.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule
  ],
  controllers: [ HolidayCalendarsController ],
  providers: [ RequestService, HolidayCalendarsService ],
  exports: [ HolidayCalendarsService ],
})
export class HolidayCalendarsModule {
}
