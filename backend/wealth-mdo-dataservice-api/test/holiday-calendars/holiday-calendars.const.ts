import { ObjectId } from 'mongodb';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import HolidayCalendarDate from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-date';
import HolidayCalendarYear from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-year';
import HolidayCalendarScheduleMaintenance from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-schedule-maintenance';
import HolidayCalendarMaintenance from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-maintenance';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export const testHolidayCalendarsDate: HolidayCalendarDate[] = [
  {
    holidayName: 'New Years Day',
    holidayDate: new Date('2021-01-01')
  },
  {
    holidayName: 'Good Friday',
    holidayDate: new Date('2021-04-02')
  },
  {
    holidayName: 'Easter Monday',
    holidayDate: new Date('2021-04-05')
  },
  {
    holidayName: 'Test Holiday',
    holidayDate: new Date('2021-08-06')
  }
];

export const testHolidayDates = testHolidayCalendarsDate.map(date => date.holidayDate);

export const holidaysCalendarYear: HolidayCalendarYear[] = [
  {
    year: 2021,
    days: testHolidayCalendarsDate
  }
];

export const scheduleMaintenance: HolidayCalendarScheduleMaintenance = {
  month       : 11,
  endDay      : '12-31',
  dayOfTheWeek: 4,
  frequency   : Frequency.Weekly
};

export const maintenance: HolidayCalendarMaintenance = {
  contacts: [],
  schedule: scheduleMaintenance
};

export const testHolidayCalendar: HolidayCalendars =
  {
    _id           : new ObjectId('609d488d3413c47110d7f91f'),
    calendarName  : 'UK International',
    region        : 'international',
    country       : 'uk',
    calendarSource: 'Jest',
    isEnabled     : true,
    isDefault     : false,
    listOfHolidays: holidaysCalendarYear,
    maintenance
  };

export const testHolidayCalendars: HolidayCalendars[] = new Array(10).fill(testHolidayCalendar);

export const testCalendarId = testHolidayCalendars[0]._id.toString();

export const testHolidayDays = new Array(10).fill(testHolidayCalendarsDate);

export const testSortedHolidayCalendars = {
  page         : 1,
  totalDocs    : 10,
  docs         : testHolidayCalendars,
  hasNextPage  : false,
  hasPrevPage  : false,
  limit        : 50,
  nextPage     : null,
  offset       : 0,
  pagingCounter: 1,
  prevPage     : null,
  totalPages   : 1
};

export const testSortedHolidayCalendarsQuery = {
  field    : 'region',
  sortOrder: 'asc',
  limit    : 50,
  offset   : 0
};
