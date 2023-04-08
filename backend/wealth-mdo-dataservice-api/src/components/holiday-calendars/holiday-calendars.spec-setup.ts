import { Test } from '@nestjs/testing';
import { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { RegionsService } from '../regions/regions.service';
import { RegionsDal } from '../regions/regions.dal';
import { CountriesService } from '../countries/countries.service';
import { CountriesDal } from '../countries/countries.dal';

import { HolidayCalendarsService } from './holiday-calendars.service';
import { HolidayCalendarsDal } from './holiday-calendars.dal';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      HolidayCalendarsService,
      HolidayCalendarsDal,
      RegionsService,
      RegionsDal,
      CountriesService,
      CountriesDal,
      { provide: HolidayCalendarsModelToken, useValue: mockMongooseModel },
      { provide: RegionsModelToken, useValue: mockMongooseModel },
      { provide: CountriesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<HolidayCalendarsService>(HolidayCalendarsService);
};
