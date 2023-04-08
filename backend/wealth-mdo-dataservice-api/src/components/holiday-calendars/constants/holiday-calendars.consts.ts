import HolidayCalendarMaintenance from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-maintenance';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export const defaultHolidayCalendarMaintenance: HolidayCalendarMaintenance = {
  contacts: [],
  schedule: {
    month       : 11,
    endDay      : '12-31',
    dayOfTheWeek: 4,
    frequency   : Frequency.Weekly
  }
};
