import { ObjectId } from 'mongodb';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';

function getTestHolidayCalendar(id) {
  return {
    _id: id,
    isEnabled: true,
    isDefault: false,
    calendarName: 'calendarName',
    calendarSource: 'calendarSource',
    country: 'country',
    region: 'region',
    listOfHolidays: [
      {
        year: 2021,
        days: [
          {
            holidayName: 'New Years Day',
            holidayDate: new Date('2021-01-01'),
          },
        ],
      },
    ],
    maintenance: {
      contacts: [ 'test@test.com' ],
      schedule: {
        month: 11,
        endDay: '31-12',
        dayOfTheWeek: 11,
        frequency: Frequency.Weekly,
      },
    },
  };
}

export const testHolidayCalendar: HolidayCalendars = getTestHolidayCalendar(new ObjectId('6150d3232d6e37b573c44824'));

export const testHolidayCalendars: HolidayCalendars[] = new Array(10).fill(testHolidayCalendar);

export const testHolidayCalendarResponse = getTestHolidayCalendar('6150d3232d6e37b573c44824');

export const testHolidayCalendarsResponse = new Array(10).fill(testHolidayCalendarResponse);

export const testSortedHolidayCalendarsQuery = {
  field: 'region',
  sortOrder: 'asc',
  limit: 50,
  offset: 0,
};
