import { DateTime } from 'luxon';
import { head, find, get, isEmpty, last, map, uniqBy, union } from 'lodash';
import { ActiveSchedule } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import HolidayCalendarDate from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-date';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';
import HolidayCalendarYear from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-year';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import HolidayCalendarScheduleMaintenance from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-schedule-maintenance';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import {
  allWorkDays,
  dateFormat,
  fromFormat,
  getAllDays,
  getNextPeriod,
  getPreviousPeriod,
  now,
  scheduleTimeFormat,
  toIsoFormat,
  utcZone,
  getExactInterval
} from '../../../core/utils/luxon';
import { ScheduleDaysOfTheWeek } from '../../files-metadata/enums/schedule-day-of-the-week.enum';
import { getUtcCalendarDate } from '../../files-metadata/pure/files-metadata.pure';

export const getHolidays = (holidays: HolidayCalendarDate[]) => holidays.map(({ holidayName, holidayDate }) => ({
  holidayName,
  holidayDate: toIsoFormat(holidayDate)
}));

export const getIsoHolidayDates = (holidays: HolidayCalendarDate[]) => map(holidays, ({ holidayDate }) => toIsoFormat(holidayDate));

export const getHolidaysWithWeekends = (backlash: boolean, holidays: HolidayCalendarDate[], startDate: DateTime, period = 'year') => {
  const weekends = getAllDays(backlash, startDate, period)
    .filter(({ weekday }) => weekday > 5)
    .map(day => ({
      holidayName: day.weekdayLong,
      holidayDate: day.toISODate(),
    }));
  const isoHolidays = getHolidays(holidays);
  return uniqBy([ ...isoHolidays, ...weekends ], 'holidayDate');
};

export const getAllWorkDays = (backlash: boolean, date: DateTime, holidays: HolidayCalendarDate[], period = 'year') => {
  const isoHolidays = getIsoHolidayDates(holidays);
  return getAllDays(backlash, date, period)
    .filter(({ weekday }) => weekday <= 5)
    .map(day => ({
      holidayName: day.weekdayLong,
      holidayDate: day.toISODate(),
    }))
    .filter(({ holidayDate }) => !isoHolidays.includes(holidayDate));
};

export const getAllDaysOfWeek = (backlash: boolean, date: DateTime, holidays: HolidayCalendarDate[], period = 'month') => {
  const isoHolidays = getIsoHolidayDates(holidays);
  return getAllDays(backlash, date, period)
    .map(day => ({
      holidayName: day.weekdayLong,
      holidayDate: day.toISODate(),
    }))
    .filter(({ holidayDate }) => !isoHolidays.includes(holidayDate));
};

export const getLatestWorkDays = (days: DateTime[], today: DateTime) => days.filter(day => day.startOf('day') >= today.startOf('day'));

export function formatDaysToDateTime(days: { holidayName: string; holidayDate: string }[]) {
  return days.map(({ holidayDate }) => fromFormat(holidayDate, dateFormat));
}

export const getExpectedDays = (dayOfTheWeek: string, calendar: HolidayCalendarDate[], startDate: DateTime) => {
  if (dayOfTheWeek === ScheduleDaysOfTheWeek.AllWorkDays) {
    const workDays = getAllWorkDays(false, startDate, calendar, 'month');
    return formatDaysToDateTime(workDays);
  }
  return getAllDays(false, startDate, 'month');
};

export const getWorkDays = (holidays: HolidayCalendarDate[], expectedDays: ScheduleDay[], startDate: DateTime) => {
  const { dayOfTheWeek } = head(expectedDays);
  if (dayOfTheWeek !== ScheduleDaysOfTheWeek.AllWorkDays && dayOfTheWeek !== ScheduleDaysOfTheWeek.AllDaysOfWeek) {
    const weekDays = expectedDays.map(({ dayOfTheWeek }) => dayOfTheWeek);
    const workdays = getAllWorkDays(true, startDate, holidays, 'month').filter(({ holidayName }) => weekDays.includes(holidayName));
    return formatDaysToDateTime(workdays);
  }
  return getExpectedDays(dayOfTheWeek, holidays, startDate);
};

export const getTimeZoneArrivalPeriod = (
  schedule: ScheduleDay | ActiveSchedule,
  timeZone: string,
  holidays: HolidayCalendarDate[],
  startDate: DateTime,
  currentDate: DateTime = now()
) => {
  const { isBusinessDay, startDay, startTime, dayOfTheWeek } = schedule;
  const previousPeriod = getPreviousPeriod(startDate);
  const nextPeriod = getNextPeriod(startDate);

  const previousPeriodStartDate = getUtcCalendarDate(isBusinessDay, startDay, dayOfTheWeek, holidays, startTime, timeZone,
    previousPeriod);
  const nextPeriodStartDate = getUtcCalendarDate(isBusinessDay, startDay, dayOfTheWeek, holidays, startTime, timeZone,
    nextPeriod);
  const start = currentDate < startDate ? previousPeriodStartDate : startDate;
  const end = currentDate < startDate ? startDate : nextPeriodStartDate;
  return {
    start: start.setZone(timeZone),
    end  : end.setZone(timeZone)
  };
};

export function getDaysByDayOfTheWeek(date: DateTime, holidays: HolidayCalendarDate[], dayOfTheWeek: string) {
  return dayOfTheWeek === allWorkDays
    ? getAllWorkDays(false, date, holidays, 'month')
    : getAllDaysOfWeek(false, date, holidays);
}

export const getNextExpectedDate = (holidays: HolidayCalendarDate[], calendarDay: number, dayOfTheWeek: string,
  arrivalDate: DateTime, timeZone: string) => {
  const workDays = getDaysByDayOfTheWeek(arrivalDate, holidays, dayOfTheWeek)
    .map(({ holidayDate }) => DateTime.fromISO(holidayDate, { zone: timeZone }));
  const latestWorkDays = getLatestWorkDays(workDays, arrivalDate);

  return workDays.some(({ day }) => day === calendarDay) ? arrivalDate : head(latestWorkDays);
};

export const getCalendarDay = (
  holidays: HolidayCalendarDate[],
  day: number,
  dayOfTheWeek: string,
  arrivalPeriod: { start: DateTime; end: DateTime },
  timeZone = utcZone,
  received?
) => {
  const { start, end } = arrivalPeriod;

  if (received) {
    return getNextExpectedDate(holidays, day, dayOfTheWeek, end, timeZone);
  }
  return getNextExpectedDate(holidays, day, dayOfTheWeek, start, timeZone);
};

const getBusinessDayForReceived = (end: DateTime, holidays: HolidayCalendarDate[], timeZone: string, businessDay: number) => {
  const businessDays = getAllWorkDays(false, end, holidays, 'month')
    .map(({ holidayDate }) => fromFormat(holidayDate, dateFormat, timeZone));
  const dayIndex = (businessDays.length < businessDay ? businessDays.length : businessDay) - 1;
  return businessDays[dayIndex];
};

export const getBusinessDay = (
  holidays: HolidayCalendarDate[],
  businessDay: number,
  arrivalPeriod: { start: DateTime; end: DateTime },
  timeZone = utcZone,
  received?
) => {
  const { start, end } = arrivalPeriod;

  if (received) {
    return getBusinessDayForReceived(end, holidays, timeZone, businessDay);
  }
  const businessDays = getAllWorkDays(false, start, holidays, 'month')
    .map(({ holidayDate }) => fromFormat(holidayDate, dateFormat, timeZone));
  const dayIndex = (businessDays.length < businessDay ? businessDays.length : businessDay) - 1;
  return businessDays[dayIndex];
};

export const getWorkDay = (holidays: HolidayCalendarDate[], expectedDays: ScheduleDay[]) => {
  const workDays = getWorkDays(holidays, expectedDays, now());
  const nextPeriodDate = getNextPeriod(now());
  const latestWorkDays = getLatestWorkDays(workDays, now());

  if (isEmpty(latestWorkDays)) {
    return head(getWorkDays(holidays, expectedDays, nextPeriodDate));
  }
  return head(latestWorkDays);
};

export const getBusinessDate = (holidays: HolidayCalendarDate[], day: number, time: string, timeZone: string, periodDate: DateTime) => {
  const allWorkDays = getAllWorkDays(false, periodDate, holidays, 'month');
  const { holidayDate } = allWorkDays.length >= day
    ? allWorkDays[day - 1]
    : last(allWorkDays);
  const date = `${holidayDate} ${time}`;
  return fromFormat(date, `${dateFormat} ${scheduleTimeFormat}`, timeZone);
};

export const getConvertedStartDate = (
  listOfIsoDays: string[],
  startDay: number,
  startTime = '',
  timeZone: string,
  periodDate: DateTime,
  isEndOfSchedule = false,
  frequency?: Frequency
) => {
  const allDays = getAllDays(false, periodDate).map(day => day.toISODate());
  const startCalendarDay = allDays[startDay - 1] || last(allDays); // take last if day is greater than last day in month
  const date = startCalendarDay < head(listOfIsoDays)
    ? head(listOfIsoDays)
    : listOfIsoDays.find(day => day >= startCalendarDay);
  const time = (
    isEndOfSchedule
    && frequency === Frequency.ContinuousMonthly
    && date !== startCalendarDay
  ) ? '00:00' : startTime;
  const dateToFormat = date ? `${date} ${time}` : '';
  return fromFormat(dateToFormat, `${dateFormat} ${scheduleTimeFormat}`, timeZone);
};

export const getHolidayDates = (holidays: HolidayCalendarDate[]) => holidays.map(({ holidayDate }) => holidayDate);

export const getWorkCalendarDate = (
  holidays: HolidayCalendarDate[],
  startDay: number,
  startTime: string,
  timeZone: string,
  periodDate: DateTime,
  isEndOfSchedule = false,
  frequency?: Frequency
) => {
  const workDays = union(
    getAllWorkDays(false, periodDate, holidays, 'month'),
    getAllWorkDays(false, periodDate.plus({ month: 1 }), holidays, 'month')
  ).map(({ holidayDate }) => holidayDate);
  return getConvertedStartDate(workDays, startDay, startTime, timeZone, periodDate, isEndOfSchedule, frequency);
};

export const getWeekCalendarDate = (
  holidays: HolidayCalendarDate[],
  startDay: number,
  startTime: string,
  timeZone: string,
  periodDate: DateTime
) => {
  const allDays = getAllDays(false, periodDate).map(day => day.toISODate());
  const listOfHolidays = getIsoHolidayDates(holidays);
  const allWeekDays = allDays.filter(day => !listOfHolidays.includes(day));
  return getConvertedStartDate(allWeekDays, startDay, startTime, timeZone, periodDate);
};

export const getWeeklyCalendarDate = (
  dayOfTheWeek: string,
  startTime: string,
  timeZone: string,
  periodDate: DateTime
) => {
  const weekDates = getAllDays(false, periodDate, 'week');
  const date = weekDates.find(({ weekdayLong }) => weekdayLong === dayOfTheWeek);
  const dateToFormat = `${date?.toISODate()} ${startTime}`;
  return fromFormat(dateToFormat, `${dateFormat} ${scheduleTimeFormat}`, timeZone);
};

export const getYearHolidays = (listOfHolidays: HolidayCalendarYear[], yearToFind = now().year) => {
  const currentHolidays = listOfHolidays.find(({ year }) => year === yearToFind);
  return currentHolidays ? currentHolidays.days : [];
};

export const getAllYearsHolidays = (listOfHolidays: HolidayCalendarYear[]) => listOfHolidays.flatMap(year => year.days) ?? [];

export function mapDisplayKeys(array: any, key: string) {
  return get(find(array, [ 'key', key ]), 'display', key);
}

export function replaceKeys(
  doc: HolidayCalendars,
  [ regions, countries ]: Enum[][],
) {
  doc.region = mapDisplayKeys(regions, doc.region);
  doc.country = mapDisplayKeys(countries, doc.country);
  return doc;
}

export const calendarsMapper = (calendars: HolidayCalendars[], staticData: Enum[][]) =>
  calendars.map(doc => replaceKeys(doc, staticData));

export const getLastWeekday = (weekday: number, year: number, month = 12): DateTime => {
  const weekDays = getExactInterval(DateTime.utc(year, month), 'month')
    .splitBy({ days: 1 })
    .map(({ start }) => start)
    .filter(day => day.weekday === weekday);

  return last(weekDays);
};

export const isExpiring = (schedule: HolidayCalendarScheduleMaintenance): boolean => {
  const { endDay: endDateStr, dayOfTheWeek, month } = schedule;

  const [ endMonth, endDay ] = endDateStr.split('-').map(numString => +numString);
  const currentDateTime = DateTime.utc();
  const startDateTime = getLastWeekday(dayOfTheWeek, currentDateTime.year, month);
  const endDateTime = DateTime.utc(currentDateTime.year, endMonth, endDay);

  return currentDateTime.weekday === dayOfTheWeek
    && currentDateTime >= startDateTime
    && currentDateTime <= endDateTime;
};
