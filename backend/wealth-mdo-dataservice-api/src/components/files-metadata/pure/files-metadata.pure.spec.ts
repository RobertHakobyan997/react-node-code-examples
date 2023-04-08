import { head } from 'lodash';
import { DateTime, Settings } from 'luxon';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';
import { ActiveSchedule } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';

import {
  australianSchedule,
  dailySchedule,
  scheduleOfNextPeriodInCurrentMonth,
  scheduleOfNextPeriodInCurrentWeek,
  scheduleWithEndOfOnTimeFromNextMonth
} from '../../../../test/data/files-metadata/schedule-day.const';
import { businessScheduleDisplay } from '../../../../test/data/files-metadata/test-display-schedule';
import {
  monthlySchedule,
  receivedAustralianMonthly,
  testFileMetadata,
  testSydneyNonBusinessSchedule,
  testSydneyBusinessSchedule
} from '../../../../test/data/files-metadata/test-files-metadata.const';
import { testHolidayCalendar, testHolidayCalendarsDate } from '../../../../test/holiday-calendars/holiday-calendars.const';
import * as Luxon from '../../../core/utils/luxon';
import { isNowInPeriod } from '../../../core/utils/luxon';
import { ScheduleDaysOfTheWeek } from '../enums/schedule-day-of-the-week.enum';

import * as FilesMetadataPure from './files-metadata.pure';
import {
  convertScheduleDayToDateTime,
  getScheduleDates,
  getScheduleTableFields,
  getUtcCalendarDate,
  isReceived
} from './files-metadata.pure';

describe('FilesMetadataPure', () => {
  describe('isNowInPeriod', () => {
    const getDate = (date: string) => Luxon.fromFormat(date, Luxon.dateFormat, 'UTC').setLocale('en-US');
    const startTime = getDate('2021-08-01');
    const endTime = getDate('2021-08-03');
    const getTime = (startTime, endTime) => ({ startTime, endTime });

    Settings.now = () => new Date('2021-08-02').valueOf();
    const now = Luxon.now();

    it('should return true', () => {
      expect(isNowInPeriod(getTime(startTime, endTime))).toBe(true);
      expect(isNowInPeriod(getTime(now, endTime))).toBe(true);
      expect(isNowInPeriod(getTime(undefined, endTime))).toBe(true);
      expect(isNowInPeriod(getTime(startTime, undefined))).toBe(true);
      expect(isNowInPeriod(getTime(undefined, undefined))).toBe(true);
    });

    it('should return false', () => {
      expect(isNowInPeriod(getTime(now.plus({ seconds: 1 }), endTime))).toBe(false);
      expect(isNowInPeriod(getTime(startTime, now.minus({ seconds: 1 })))).toBe(false);
    });
  });

  describe('getScheduleDates', () => {
    it('should return previous day after converting to UTC', () => {
      Settings.now = () => new Date('2021-08-02T08:00').valueOf();
      const scheduleDates = getScheduleDates(australianSchedule, testHolidayCalendarsDate, Frequency.Monthly, 'Pacific/Auckland');
      expect(scheduleDates.endOfOnScheduleDate.toISO()).toBe('2021-08-01T20:00:00.000Z');
      expect(scheduleDates.endOfOnTimeDate.toISO()).toBe('2021-08-01T21:00:00.000Z');
      expect(scheduleDates.endOfLateDate.toISO()).toBe('2021-08-02T06:00:00.000Z');
    });

    it('should return dates from previous month if new period has not started this month', () => {
      Settings.now = () => new Date('2021-08-02T08:00').valueOf();
      const scheduleDates = getScheduleDates(scheduleOfNextPeriodInCurrentMonth, testHolidayCalendarsDate, Frequency.Monthly, 'UTC');
      expect(scheduleDates.endOfOnScheduleDate.month).toBe(7);
      expect(scheduleDates.endOfOnTimeDate.month).toBe(7);
      expect(scheduleDates.endOfLateDate.month).toBe(7);
    });

    it('should return dates from previous week if new period has not started this week', () => {
      Settings.now = () => new Date('2021-08-02T08:00').valueOf();
      const scheduleDates = getScheduleDates(scheduleOfNextPeriodInCurrentWeek, testHolidayCalendarsDate, Frequency.Weekly, 'UTC');
      expect(scheduleDates.endOfOnScheduleDate.weekday).toBe(3);
      expect(scheduleDates.endOfOnTimeDate.month).toBe(7);
      expect(scheduleDates.endOfLateDate.day).toBe(28);
    });

    it('should return endOfOnTimeDate and  from next month if endOfOnTime or endOfLate day lower then startDay', () => {
      Settings.now = () => new Date('2021-08-04T08:00').valueOf();
      const scheduleDates = getScheduleDates(scheduleWithEndOfOnTimeFromNextMonth, testHolidayCalendarsDate, Frequency.Monthly, 'UTC');
      expect(scheduleDates.endOfOnScheduleDate.month).toBe(8);
      expect(scheduleDates.endOfOnTimeDate.month).toBe(9);
      expect(scheduleDates.endOfLateDate.month).toBe(9);
    });

    it('should return next work day if it is weekend', () => {
      Settings.now = () => new Date('2021-08-01T08:00').valueOf();
      const scheduleDates = getScheduleDates(dailySchedule, testHolidayCalendarsDate, Frequency.Daily, 'UTC');
      expect(scheduleDates.endOfOnScheduleDate.toISODate()).toBe('2021-08-02');
    });
  });

  describe('getUtcCalendarDate', () => {
    // Daily
    it('should return utc DateTime for Pacific/Midway timezone (-11) daily', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 2, ScheduleDaysOfTheWeek.AllWorkDays, [], '23:00', 'Pacific/Midway', currentTime);
      expect(result.toISO()).toEqual('2021-08-03T10:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) daily', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 2, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-01T20:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Midway timezone (-11) daily edge', () => {
      Settings.now = () => new Date('2021-08-31').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 31, ScheduleDaysOfTheWeek.AllWorkDays, [], '23:00', 'Pacific/Midway', currentTime);
      expect(result.toISO()).toEqual('2021-09-01T10:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) daily edge', () => {
      Settings.now = () => new Date('2021-08-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 1, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-01T20:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) daily edge september', () => {
      Settings.now = () => new Date('2021-09-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 1, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-31T20:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) daily edge september 2', () => {
      Settings.now = () => new Date('2021-08-31T23:00:00.000Z').valueOf();
      const dateTimeInTimeZone = Luxon.shiftedNow('Pacific/Kiritimati');
      const result = getUtcCalendarDate(false, 1, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', dateTimeInTimeZone);
      expect(result.toISO()).toEqual('2021-08-31T20:00:00.000Z');
    });
    // Monthly
    it('should return utc DateTime for Pacific/Midway timezone (-11) monthly', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 2, ScheduleDaysOfTheWeek.AllWorkDays, [], '23:00', 'Pacific/Midway', currentTime);
      expect(result.toISO()).toEqual('2021-08-04T10:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) monthly', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 2, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-02T20:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Midway timezone (-11) monthly edge', () => {
      Settings.now = () => new Date('2021-08-31').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 22, ScheduleDaysOfTheWeek.AllWorkDays, [], '23:00', 'Pacific/Midway', currentTime);
      expect(result.toISO()).toEqual('2021-09-01T10:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) monthly edge', () => {
      Settings.now = () => new Date('2021-08-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 1, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-01T20:00:00.000Z');
    });

    it('should return utc DateTime for Pacific/Kiritimati timezone (+14) monthly edge september', () => {
      Settings.now = () => new Date('2021-09-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 1, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-08-31T20:00:00.000Z');
    });

    it('should return last business day of the month if day value more then last business day (+14)', () => {
      Settings.now = () => new Date('2021-09-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 777, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'Pacific/Kiritimati', currentTime);
      expect(result.toISO()).toEqual('2021-09-29T20:00:00.000Z');
    });

    it('should return last business day of the month if day value more then last business day UTC', () => {
      Settings.now = () => new Date('2021-09-01').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(true, 777, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'UTC', currentTime);
      expect(result.toISO()).toEqual('2021-09-30T10:00:00.000Z');
    });

    it('should return last months day if day is greater than last day of month', () => {
      Settings.now = () => new Date('2022-02-08').valueOf();
      const currentTime = Luxon.now();
      const result = getUtcCalendarDate(false, 29, ScheduleDaysOfTheWeek.AllWorkDays, [], '10:00', 'UTC', currentTime);
      expect(result.toISO()).toEqual('2022-02-28T10:00:00.000Z');
    });
  });

  describe('convertScheduleDayToDateTime', () => {
    // TODO create a template for those tests
    it('should return utc DateTime for the case when current DateTime less than startDateTime and startDay equal endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 2,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-09-02T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime more than startDateTime and startDay equal endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02T23:00:00.000Z').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 2,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-10-04T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime more than startDateTime and startDay more than endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02T23:00:00.000Z').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 1,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-10-01T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime more than startDateTime and startDay less than endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02T23:00:00.000Z').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 3,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-09-03T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime less than startDateTime and startDay less than endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 3,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-08-04T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime less than startDateTime and startDay equal endOfTimeDay', () => {
      Settings.now = () => new Date('2021-09-02').valueOf();
      const endOfOnTime = {
        time: '12:00',
        day : 2,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnTime });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay, schedule.frequency, schedule.timeZone, expectedDay.endOfOnTime, [], DateTime.fromISO('2021-09-02T00:05:00.000Z'));
      expect(result.toISO()).toEqual('2021-09-02T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime less than startDateTime and startDay equal endOfSchedule', () => {
      Settings.now = () => new Date('2021-09-02').valueOf();
      const endOfOnSchedule = {
        time: '12:00',
        day : 2,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnSchedule });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay,
        schedule.frequency,
        schedule.timeZone,
        expectedDay.endOfOnSchedule,
        [],
        DateTime.fromISO('2021-09-02T00:05:00.000Z'),
        true,
      );
      expect(result.toISO()).toEqual('2021-08-03T12:00:00.000Z');
    });

    it('should return utc DateTime for the case when current DateTime more than startDateTime and startDay less than endOfSchedule', () => {
      Settings.now = () => new Date('2021-09-02T23:00:00.000Z').valueOf();
      const endOfOnSchedule = {
        time: '12:00',
        day : 3,
      };
      const schedule = monthlySchedule(Frequency.ContinuousMonthly, { endOfOnSchedule });
      const expectedDay = schedule.expectedDays[0];
      const result = convertScheduleDayToDateTime(
        expectedDay,
        schedule.frequency,
        schedule.timeZone,
        expectedDay.endOfOnSchedule,
        [],
        DateTime.fromISO('2021-09-02T00:05:00.000Z'),
        true,
      );
      expect(result.toISO()).toEqual('2021-09-03T12:00:00.000Z');
    });
  });

  describe('getScheduleTableFields', () => {
    it('should return an expected date IN UTC for calendar day of monthly metadata if a file was received', () => {
      Settings.now = () => new Date('2021-09-20').valueOf();
      const result = head(getScheduleTableFields([ receivedAustralianMonthly ], [ testHolidayCalendar ])) as any;
      expect(result.scheduleDisplay.nextFileExpectedOn.toISODate()).toEqual('2021-10-03');
    });
  });

  describe('isReceived', () => {
    it('should return false if there is no lastFileUploadedTime', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      expect(isReceived(testFileMetadata.state.lastFileUploadedTime, businessScheduleDisplay, [])).toEqual(false);
    });

    it('should return false if there are some problems with ActiveSchedule object', () => {
      Settings.now = () => new Date('2021-08-02').valueOf();
      expect(isReceived(testFileMetadata.state.lastFileUploadedTime, {} as ActiveSchedule, [])).toEqual(false);
    });

    it('should return true for daily metadata if file has been received today', () => {
      Settings.now = () => new Date('2021-09-20').valueOf();
      const activeSchedule = {
        ...businessScheduleDisplay,
        frequency: Frequency.Daily,
      };
      expect(isReceived(new Date('2021-09-20T12:00:00.000Z'), activeSchedule, [])).toEqual(true);
    });

    it('should return false for daily metadata if file has not been received today', () => {
      Settings.now = () => new Date('2021-09-20').valueOf();
      const activeSchedule = {
        ...businessScheduleDisplay,
        frequency: Frequency.Daily,
      };
      expect(isReceived(new Date('2021-09-19T12:00:00.000Z'), activeSchedule, [])).toEqual(false);
    });

    // mockReturnValueOnce is used because spying getUtcCalendarDate with mockReturnValue affects
    // below tests for getNextFileExpectedDate
    it('should return true for monthly metadata if file has been received in the current period', () => {
      Settings.now = () => new Date('2021-09-20').valueOf();
      jest.spyOn(FilesMetadataPure, 'getUtcCalendarDate').mockReturnValueOnce(DateTime.fromISO('2021-09-19'));
      expect(isReceived(new Date('2021-09-19T12:00:00.000Z'), businessScheduleDisplay, [])).toEqual(true);
    });

    it('should return false for monthly metadata if file has not been received in the current period', () => {
      Settings.now = () => new Date('2021-09-20').valueOf();
      jest.spyOn(FilesMetadataPure, 'getUtcCalendarDate').mockReturnValueOnce(DateTime.fromISO('2021-09-19'));
      expect(isReceived(new Date('2021-09-18T12:00:00.000Z'), businessScheduleDisplay, [])).toEqual(false);
    });

    it('should return true for monthly metadata if file received in the current period that started in the last month', () => {
      Settings.now = () => new Date('2021-09-18').valueOf();
      jest.spyOn(FilesMetadataPure, 'getUtcCalendarDate').mockReturnValueOnce(DateTime.fromISO('2021-09-19'));
      const test = isReceived(new Date('2021-09-16T12:00:00.000Z'), businessScheduleDisplay, []);
      expect(test).toEqual(true);
    });

    it('should return false for monthly metadata if file has received in the current period that started in the last month', () => {
      Settings.now = () => new Date('2021-09-18').valueOf();
      jest.spyOn(FilesMetadataPure, 'getUtcCalendarDate').mockReturnValueOnce(DateTime.fromISO('2021-09-19'));
      const test = isReceived(new Date('2021-07-18T12:00:00.000Z'), businessScheduleDisplay, []);
      expect(test).toEqual(false);
    });
  });

  describe('getNextFileExpectedDate', () => {
    it('should return date from last day of current month after converting to UTC if file was received', () => {
      Settings.now = () => new Date('2022-02-08').valueOf();
      const expectedOn = FilesMetadataPure.getNextFileExpectedDate(
        true,
        Frequency.ContinuousMonthly,
        'Australia/Sydney',
        testSydneyNonBusinessSchedule,
        testHolidayCalendarsDate,
        [] as ScheduleDay[]
      );
      expect(expectedOn.toUTC().toISODate()).toBe('2022-02-28');
    });
    it('should return date from last day of past month after converting to UTC if file was not received', () => {
      Settings.now = () => new Date('2022-02-08').valueOf();
      const expectedOn = FilesMetadataPure.getNextFileExpectedDate(
        false,
        Frequency.ContinuousMonthly,
        'Australia/Sydney',
        testSydneyNonBusinessSchedule,
        testHolidayCalendarsDate,
        [] as ScheduleDay[]
      );
      expect(expectedOn.toUTC().toISODate()).toBe('2022-01-31');
    });
    it('should return date from last day of past month after converting to UTC if file was not received (business day)', () => {
      Settings.now = () => new Date('2022-02-08').valueOf();
      const expectedOn = FilesMetadataPure.getNextFileExpectedDate(
        false,
        Frequency.ContinuousMonthly,
        'Australia/Sydney',
        testSydneyBusinessSchedule,
        testHolidayCalendarsDate,
        [] as ScheduleDay[]
      );
      expect(expectedOn.toUTC().toISODate()).toBe('2022-01-31');
    });
  });
});
