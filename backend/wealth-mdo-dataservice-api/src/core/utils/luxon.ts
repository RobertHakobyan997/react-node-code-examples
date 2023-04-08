import { DateTime, IANAZone, Info, Interval } from 'luxon';
import { map, uniq, indexOf } from 'lodash';
import { DateTimeUnit } from 'luxon/src/datetime';

export const allDaysOfWeek = 'AllDaysOfWeek';
export const allWorkDays = 'AllWorkDays';
export const scheduleTimeFormat = 'HH:mm';
export const dateFormat = 'yyyy-MM-dd';
export const utcZone = 'UTC';

export const now = () => DateTime.utc().setLocale('en-US');
export const shiftedNow = (timeZone: string) => now().setZone(timeZone);
export const getNextPeriod = (date: DateTime, unit = 'month') => date.plus({ [unit]: 1 });
export const getPreviousPeriod = (date: DateTime, unit = 'month') => date.minus({ [unit]: 1 });
export const getShiftedPeriod = (date: DateTime, unit = 'month', amount = 1) => date.plus({ [unit]: amount });

export const defaultDate = () => DateTime.fromISO('2021-02-01T00:01:00.001').toJSDate();

export const toIsoFormat = (date: any) =>
  (typeof (date) === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date)).toISODate();

export const isoFormatted = (dates: Date[]) => uniq(map(dates, toIsoFormat));

export const getInterval = (date: DateTime, period = 'year') => Interval.fromDateTimes(
  date.minus({ month: 1 }).startOf(period as DateTimeUnit),
  date.plus({ month: 1 }).endOf(period as DateTimeUnit),
);

export const getExactInterval = (date: DateTime, period = 'year') => Interval.fromDateTimes(
  date.startOf(period as DateTimeUnit),
  date.endOf(period as DateTimeUnit),
);

export const getAllDays = (backlash: boolean, startDate = now(), period = 'month') =>
  (backlash ? getInterval(startDate, period) : getExactInterval(startDate, period))
    .splitBy({ days: 1 })
    .map(({ start }) => start);

export const isWorkDay = (day: number) => day > 0 && day < 6;

export const getWeekdayNumber = (weekDay: string) => indexOf(Info.weekdays(), weekDay);

export function isTodayWorkday(timeZone = utcZone) {
  const day = shiftedNow(timeZone).weekday;
  return isWorkDay(day);
}

export function getPossibleWeekdays(timeZone = utcZone) {
  const possibleWeekdays = [ allDaysOfWeek ];
  const currentDay = shiftedNow(timeZone);
  possibleWeekdays.push(currentDay.weekdayLong);
  if (isWorkDay(currentDay.weekday)) {
    possibleWeekdays.push(allWorkDays);
  }
  return possibleWeekdays;
}

export function toUtcTime(startTime: string, format: string, timeZone = utcZone) {
  if (!startTime) return startTime;
  const time = DateTime.fromFormat(startTime, format, { zone: new IANAZone(timeZone) });
  return time.setZone(utcZone).toFormat(format);
}

export function fromFormat(startTime: string, format: string, timeZone = utcZone) {
  if (!startTime) return undefined;
  return DateTime
    .fromFormat(startTime, format, { zone: new IANAZone(timeZone) })
    .setZone(utcZone);
}

export const isNowInPeriod = ({ startTime, endTime }) => !endTime || !startTime || (startTime <= now() && endTime > now());

export const getDateFromIso = (date, format) => date ? DateTime.fromFormat(date, format) : now();

export const todayIsNotHoliday = (holidays: Date[], timeZone = utcZone) => {
  const nowDate = shiftedNow(timeZone).toISODate();
  return !isoFormatted(holidays).some(i => i === nowDate);
};

export const periodRemainingDays = (date: DateTime) =>
  Interval.fromDateTimes(
    date.plus({ days: 1 }).startOf('day'),
    date.plus({ months: 1 }).endOf('month'),
  )
    .splitBy({ days: 1 })
    .map(({ start }) => start)
    .map(day => day.toISODate());

export const periodPreviousDays = (date: DateTime) =>
  Interval.fromDateTimes(
    date.minus({ months: 1 }).startOf('month'),
    date.startOf('day'),
  )
    .splitBy({ days: 1 })
    .map(({ start }) => start)
    .map(day => day.toISODate());
