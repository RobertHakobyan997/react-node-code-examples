import { DateTime, IANAZone } from 'luxon';
import { flatMap, head, isEqual, isNil, uniqBy } from 'lodash';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ActiveScheduleTime } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import { from, MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map, switchMap, toArray } from 'rxjs/operators';
import ScheduleTime from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-time';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';
import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import DataTransferJobsStatusState from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status-state';
import { ObjectId } from 'mongodb';
import DataTransferJobsSchedule from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-schedule';

import {
  fromFormat,
  getExactInterval,
  getPossibleWeekdays,
  getWeekdayNumber,
  isNowInPeriod,
  now,
  scheduleTimeFormat,
  todayIsNotHoliday,
  toUtcTime,
  utcZone,
} from '../../../core/utils/luxon';
import { getYearHolidays } from '../../holiday-calendars/pure/holiday-calendars.pure';
import { DataTransferJobsMetadataAndState, ScheduleDayWithPeriodDates } from '../data-transfer-jobs-metadata.service';

export const scheduleTimeAsUtc = (scheduleTime: ScheduleTime | ActiveScheduleTime, timeZone: string) => ({
  ...scheduleTime,
  time: toUtcTime(scheduleTime.time, scheduleTimeFormat, timeZone),
});

export const getListOfHolidays = (calendars: HolidayCalendars[], id: ObjectId) => flatMap(
  calendars.filter(({ _id }) => isEqual(id, _id)),
  ({ listOfHolidays }) => getYearHolidays(listOfHolidays)
).map(holiday => holiday.holidayDate);

export const getMetadataStatus = (statuses: DataTransferJobsStatus[], metadataId: ObjectId) =>
  statuses.find(({ jobMetaDataId }) => isEqual(jobMetaDataId, metadataId));

export const isMonthlyInSchedule = (scheduleDay: {calendarStartDate: DateTime; calendarEndDate: DateTime} & ScheduleDay) =>
  now() >= scheduleDay.calendarStartDate && isNowInPeriod(scheduleDay);

export function injectRelatedData(): MonoTypeOperatorFunction<any> {
  return pipe(
    map(([ metadata, calendars, statuses ]) => {
      const data = metadata.map(doc => ({
        ...doc,
        holidayDates: getListOfHolidays(calendars, doc.schedule.holidayCalendarId),
        timeZone    : doc.schedule?.timeZone ?? utcZone,
        state       : getMetadataStatus(statuses, doc._id)?.state,
      }));
      return uniqBy(data, ({ _id }) => _id.toString());
    }),
    switchMap(data => from(data)),
  );
}

export const todayIsInSchedule = (schedule: DataTransferJobsSchedule) => {
  const supportedSchedules = [ Frequency.Daily, Frequency.Weekly, Frequency.ContinuousMonthly ];

  return supportedSchedules.includes(schedule.frequency) && schedule.expectedDays
    .map(({ dayOfTheWeek }) => ({ day: dayOfTheWeek, zone: schedule.timeZone }))
    .some(({ day, zone }) => getPossibleWeekdays(zone).includes(day));
};

export const calculatePeriodDates = (
  frequency: Frequency,
  dayOfTheWeek: string,
  startTime: DateTime,
  timeZone: string,
  currentTime: DateTime
) => {
  const shiftedTime = currentTime.setZone(timeZone);
  if (frequency === Frequency.Weekly) {
    // getWeekdayNumber return 0-6, .set weekday expected 1-7
    const exactDay = shiftedTime
      .set({ weekday: getWeekdayNumber(dayOfTheWeek) + 1, hour: startTime.hour, minute: startTime.minute, second: 0 });
    if (exactDay <= shiftedTime) {
      return { start: exactDay, end: exactDay.endOf('day') };
    } else {
      return { start: exactDay.minus({ week: 1 }), end: exactDay.minus({ week: 1 }).endOf('day') };
    }
  }
  const dayRange = getExactInterval(shiftedTime, 'day');
  return { start: dayRange.start.set({ hour: startTime.hour, minute: startTime.minute, second: 0 }), end: dayRange.end };
};

export const convertExpectedDays = (
  { schedule, ...metadata }: {holidayDates: Date[] } & DataTransferJobsMetadata,
  currentTime
): DataTransferJobsMetadata => ({
  ...metadata,
  schedule: {
    ...schedule,
    expectedDays: schedule.expectedDays
      .map(({ endOfLate, endOfOnSchedule, endOfOnTime, dayOfTheWeek, ...expectedDays }) => {
        const startTime = DateTime.fromFormat(schedule.startTime, scheduleTimeFormat, { zone: new IANAZone(schedule.timeZone) });
        const periodDates = calculatePeriodDates(schedule.frequency, dayOfTheWeek, startTime, schedule.timeZone, currentTime);
        return {
          ...expectedDays,
          calendarStartDate: fromFormat(
            `${schedule.startDate} ${schedule.startTime}`,
            `yyyy-MM-dd HH:mm`,
            schedule.timeZone),
          calendarEndDate: fromFormat(
            `${schedule.endDate} 24:00`,
            `yyyy-MM-dd HH:mm`,
            schedule.timeZone),
          startTime      : startTime.toString(),
          endOfLate      : scheduleTimeAsUtc(endOfLate, schedule.timeZone),
          endOfOnSchedule: scheduleTimeAsUtc(endOfOnSchedule, schedule.timeZone),
          endOfOnTime    : scheduleTimeAsUtc(endOfOnTime, schedule.timeZone),
          periodStartDate: periodDates.start.setZone(utcZone),
          periodEndDate  : periodDates.end.setZone(utcZone),
        } as any;
      }),
  },
});

export const filterSchedule = ({ schedule }: DataTransferJobsMetadata): boolean => schedule.expectedDays.some(isMonthlyInSchedule);

export const getCurrentDayBasedOnPeriodDates = (expectedDays: ScheduleDayWithPeriodDates[]): ScheduleDayWithPeriodDates =>
  head(expectedDays.filter((day: ScheduleDayWithPeriodDates) => day.periodStartDate <= now() && now() <= day.periodEndDate));

export const shouldResetStateRepeatCount = (state: DataTransferJobsStatusState, currentDay: ScheduleDayWithPeriodDates): boolean => {
  const lastProcessedTime = state ? DateTime.fromJSDate(state.lastSuccessfulProcessTime) : null;
  const alreadyProcessedToday = currentDay.periodStartDate <= lastProcessedTime && lastProcessedTime <= currentDay.periodEndDate;
  return !alreadyProcessedToday && state.totalSuccessCount !== 0;
};

export const filterByRepeatDuration = ({ schedule, state }: DataTransferJobsMetadataAndState): boolean => {
  const repeatDuration = Number(schedule.repeatDuration);
  if (repeatDuration < 0) {
    return false;
  }
  const currentDay = getCurrentDayBasedOnPeriodDates(schedule.expectedDays as ScheduleDayWithPeriodDates[]);
  if (!currentDay) {
    return false;
  }

  if (isNil(state) || repeatDuration === 0) {
    return true;
  }
  if (shouldResetStateRepeatCount(state, currentDay)) {
    return true;
  }
  return state.totalSuccessCount < repeatDuration;
};

export function getRecordWithSuppliers(): MonoTypeOperatorFunction<any> {
  return pipe(
    injectRelatedData(),
    filter(({ schedule, holidayDates, timeZone }) => todayIsInSchedule(schedule) && todayIsNotHoliday(holidayDates, timeZone)),
    map((payload: { holidayDates: Date[] } & DataTransferJobsMetadata) => convertExpectedDays(payload, now())),
    filter(filterSchedule),
    filter(filterByRepeatDuration),
    filter(({ schedule }) => !!schedule.expectedDays.length),
    toArray(),
  );
}
