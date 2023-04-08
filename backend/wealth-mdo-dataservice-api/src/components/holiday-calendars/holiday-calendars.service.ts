import { BadRequestException, Injectable } from '@nestjs/common';
import { flatMap } from 'lodash';
import { Timing } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/timing.decorator';
import { FilterQuery } from 'mongoose';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { ObjectId } from 'mongodb';

import { RegionsService } from '../regions/regions.service';
import { CountriesService } from '../countries/countries.service';
import { paginate } from '../../core/utils/paginate';
import { now } from '../../core/utils/luxon';

import { getYearHolidays, getHolidaysWithWeekends, calendarsMapper, isExpiring } from './pure/holiday-calendars.pure';
import { HolidayCalendarsDal } from './holiday-calendars.dal';
import { PartialHolidayCalendars } from './holiday-calendars.controller';
import { HolidayCalendarsFilter } from './types/holiday-calendars-filter.interface';
import { defaultHolidayCalendarMaintenance } from './constants/holiday-calendars.consts';

@Injectable()
export class HolidayCalendarsService {
  constructor(
    private readonly dal: HolidayCalendarsDal,
    private readonly regionsService: RegionsService,
    private readonly countriesService: CountriesService) {
  }

  @Timing
  findAll(filter: FilterQuery<Document<HolidayCalendars>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  async getAll() {
    const calendars = await this.dal.findAll({ isEnabled: true });

    const staticData = await this.getStaticData();
    return calendarsMapper(calendars, staticData);
  }

  async getExpiringHolidayCalendars() {
    const holidayCalendars = await this.dal.findAll({
      isEnabled     : true,
      maintenance   : { $exists: true },
      listOfHolidays: {
        $not: {
          $elemMatch: {
            $and: [
              { year: new Date().getFullYear() + 1 },
              { days: { $not: { $size: 0 } } }
            ]
          }
        }
      }
    });

    return holidayCalendars.filter((holidayCalendar: HolidayCalendars) => isExpiring(holidayCalendar.maintenance.schedule));
  }

  findOne(filter: FilterQuery<Document<HolidayCalendars>> = {}) {
    return this.dal.findOne(filter);
  }

  getHolidayCalendar(id: string, options: any = {}) {
    return this.dal.findById(id, { _id: 0 }, options);
  }

  getHolidayCalendars(ids: any[]) {
    return this.dal.findAll({ _id: { $in: ids } }, {}, { lean: true });
  }

  create(calendars: HolidayCalendars[]) {
    return this.dal.insert(
      calendars.map((calendar: HolidayCalendars) => ({
        ...calendar,
        maintenance: defaultHolidayCalendarMaintenance
      }) as HolidayCalendars)
    );
  }

  update(id: string, calendar: PartialHolidayCalendars) {
    return this.dal.updateOne(id, calendar);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }

  async getHolidaysWithWeekends() {
    const holidayCalendars = await this.dal.findAll({});
    return getHolidaysWithWeekends(true, flatMap(holidayCalendars,
      holidayCalendar => getYearHolidays(holidayCalendar.listOfHolidays, now().year))
      .map(holiday => ({
        holidayName: holiday.holidayName,
        holidayDate: holiday.holidayDate,
      })), now());
  }

  async getSortedHolidayCalendars({
    field,
    sortOrder,
    limit = 50,
    offset = 0,
  }: HolidayCalendarsFilter) {
    const calendars = await this.dal.paginate(
      {
        isDefault: { $in: [ null, false ] }
      },
      {
        sort: { [field]: sortOrder },
        limit,
        offset
      }
    );
    const staticData = await this.getStaticData();
    const mappedData = calendarsMapper(calendars.docs, staticData);

    return paginate(mappedData, { limit, offset: 0 });
  }

  getStaticData() {
    return Promise.all<Enum[]>([
      this.regionsService.findAll({}, {}, { lean: true }),
      this.countriesService.findAll({}, {}, { lean: true }),
    ]);
  }

  async updateContacts(id: string, emails: string[]) {
    const prev = await this.dal.findById(id);
    if (!prev) {
      throw new BadRequestException(`Holiday Calendar with id ${id} does not exist in the database`);
    }
    return this.dal.patchOne(id,
      { _id: new ObjectId(id) },
      { $set: { 'maintenance.contacts': emails } }
    );
  }
}
