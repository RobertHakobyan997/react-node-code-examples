import { DateTime, DateTimeUnit, Interval } from 'luxon';

import { getExactInterval, now as utcNow, utcZone } from './luxon';

export const now = (timeZone: string) => utcNow().setZone(timeZone);

export const getFutureTimeInterval = (date: DateTime, period = 'month') => Interval.fromDateTimes(
  date.plus({ days: 1 }).startOf('day'),
  date.plus({ [period]: 1 }).endOf(period as DateTimeUnit),
);

export const getPastTimeInterval = (date: DateTime, period = 'month') => Interval.fromDateTimes(
  date.minus({ [period]: 1 }).startOf(period as DateTimeUnit),
  date.endOf('day'),
);

export const periodRemainingDays = (date: DateTime, period = 'month') =>
  getFutureTimeInterval(date, period)
    .splitBy({ days: 1 })
    .map(({ start }) => start)
    .map(day => day.toISODate());

export const periodPreviousDays = (date: DateTime, period = 'month') =>
  getPastTimeInterval(date, period)
    .splitBy({ days: 1 })
    .map(({ start }) => start)
    .map(day => day.toISODate());

export const getUtcDateByDayInMonth = (day: number, isBusinessDay: boolean, timeZone: string) => {
  let date: DateTime;
  const days = getExactInterval(now(timeZone), 'month').splitBy({ days: 1 }).map(({ start }) => start);
  if (isBusinessDay) {
    const workDays = days.filter(d => d.weekday <= 5);
    date = workDays.length >= day ? workDays[--workDays.length] : workDays[day];
  }
  date = days.length >= day ? days[--days.length] : days[day];
  return date.setZone(utcZone);
};
