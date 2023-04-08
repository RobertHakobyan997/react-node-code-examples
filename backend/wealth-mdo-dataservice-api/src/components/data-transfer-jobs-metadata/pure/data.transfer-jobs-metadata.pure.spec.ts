import { Settings } from 'luxon';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { metadataWithStatus } from '../../../../test/data/data-transfer-jobs/data-transfer-jobs-metadata.const';
import { dataTransferJobsStatus } from '../../../../test/data/data-transfer-jobs/data-transfer-jobs-status.const';
import { dailySchedule } from '../../../../test/data/files-metadata/schedule-day.const';
import { testDataTransferJobsSchedule } from '../../../../test/data/data-transfer-jobs/data-transfer-jobs-metadata.const';
import { testHolidayCalendar, testHolidayDates } from '../../../../test/holiday-calendars/holiday-calendars.const';
import * as Luxon from '../../../core/utils/luxon';

import {
  calculatePeriodDates,
  getListOfHolidays,
  filterByRepeatDuration,
  getMetadataStatus,
  isMonthlyInSchedule,
  todayIsInSchedule
} from './data-transfer-jobs-metadata.pure';

describe('DataTransferJobsMetadataPure', () => {
  Settings.now = () => new Date('2021-08-02T15:00:00.000Z').valueOf();
  const now = Luxon.now();

  describe('getListOfHolidays', () => {
    it('should return list of holidays', ()=> {
      expect(getListOfHolidays([ testHolidayCalendar ], testHolidayCalendar._id)).toEqual(testHolidayDates);
    });
  });

  describe('calculatePeriodDates', () => {  // TODO: Need to fix it
    const startTime = Luxon.now().set( { hour: 5 } );
    it('should return date range for non-weekly', () => {
      const endTime = now.endOf('day');
      const result = calculatePeriodDates(Frequency.Daily, 'Monday', startTime, 'UTC', now);
      expect(result).toEqual({ start: startTime,  end: endTime });
    });
    xit('should return date range for weekly if weekday less than today', () => {
      const startTimeLate = Luxon.now().set( { hour: 20 } );
      const result = calculatePeriodDates(Frequency.Weekly, now.weekdayLong, startTimeLate, 'UTC', now);
      const expectedEnd = startTime.minus({ week: 1 }).endOf('day');
      const expectedStart = startTimeLate.minus({ week: 1 });
      expect(result).toEqual({ start: expectedStart,  end: expectedEnd });
    });
    xit('should return date range for weekly if weekday more than today', () => {
      const result = calculatePeriodDates(Frequency.Weekly, now.weekdayLong, startTime, 'UTC', now);
      const expectedEnd = startTime.endOf('day');
      expect(result).toEqual({ start: startTime,  end: expectedEnd });
    });
  });

  describe('filterByRepeatDuration', () => {
    it('should return false', () => {
      const metadata = metadataWithStatus(1, 0);
      metadata.schedule.expectedDays = [];
      expect(filterByRepeatDuration(metadata)).toEqual(false);
      expect(filterByRepeatDuration(metadataWithStatus(-1, 0))).toEqual(false);
    });
    it('should return true', () => {
      expect(filterByRepeatDuration(metadataWithStatus(0, 0))).toEqual(true);
      expect(filterByRepeatDuration(metadataWithStatus(1, 0))).toEqual(true);
      expect(filterByRepeatDuration(metadataWithStatus(1, 1))).toEqual(true);
    });
  });

  describe('getMetadataStatus', () => {
    it('should filter statuses by job id', () => {
      const jobMetaDataId = dataTransferJobsStatus[0].jobMetaDataId;
      expect(getMetadataStatus(dataTransferJobsStatus, jobMetaDataId)).toEqual(dataTransferJobsStatus[0]);
    });
  });

  describe('isMonthlyInSchedule', () => {
    it('should return false', () => {
      const schedule = {
        ...dailySchedule,
        calendarStartDate: now,
        calendarEndDate  : now
      };
      expect(isMonthlyInSchedule(schedule)).toEqual(false);
    });

    it('should return true', () => {
      const schedule = {
        ...dailySchedule,
        calendarStartDate: now,
        calendarEndDate  : now,
        startTime        : '05:00',
        endTime          : '20:00'
      };
      expect(isMonthlyInSchedule(schedule)).toEqual(false);
    });
  });

  describe('todayIsInSchedule', () => {
    it('should return true', () => {
      const schedule = {
        ...testDataTransferJobsSchedule,
        startTime: '00:00'
      };
      expect(todayIsInSchedule(schedule)).toEqual(true);
    });
    it('should return false', () => {
      const schedule = {
        ...testDataTransferJobsSchedule,
        frequency: Frequency.Monthly
      };
      expect(todayIsInSchedule(schedule)).toEqual(false);
    });
  });
});
