import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { HolidayCalendarsService } from './holiday-calendars.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      HolidayCalendarsService,
      RequestService,
      provideMockHttpService(),
    ],
  }).compile();

  return module.get<HolidayCalendarsService>(HolidayCalendarsService);
};
