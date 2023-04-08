import { DateTime, Settings } from 'luxon';

import { testHolidayCalendarsDate, scheduleMaintenance } from '../../../../test/holiday-calendars/holiday-calendars.const';
import { allDaysOfWeek, allWorkDays, dateFormat, fromFormat, utcZone } from '../../../core/utils/luxon';
import { weeklySchedule } from '../../../../test/data/files-metadata/test-files-metadata.const';

import * as pure from './holiday-calendars.pure';

describe('holidayCalendarsPure', () => {
  // Set current timestamp to not depend on actual current time
  Settings.now = () => new Date('2021-08-03').valueOf();
  const arrivalPeriod = {
    start: DateTime.fromISO('2021-08-01', { zone: utcZone }),
    end  : DateTime.fromISO('2021-09-01', { zone: utcZone })
  };
  const day = 5;

  describe('getBusinessDay()', () => {
    it('should return an expected date for business day of monthly metadata if a file was not received', async () => {
      jest.spyOn(pure, 'getBusinessDay');

      const res = pure.getBusinessDay(testHolidayCalendarsDate, day, arrivalPeriod);
      expect(res).toEqual(fromFormat('2021-08-09', dateFormat));
    });
    it('should return an expected date for business day of monthly metadata if a file was received', async () => {
      jest.spyOn(pure, 'getBusinessDay');

      const res = pure.getBusinessDay(testHolidayCalendarsDate.slice(0, -1), day, arrivalPeriod, utcZone, true);
      expect(res).toEqual(fromFormat('2021-09-07', dateFormat));
    });
  });

  describe('getWorkDay()', () => {
    it('should return an expected date for calendar day of weekly metadata if a file was not received', async () => {
      const { expectedDays } = weeklySchedule();
      jest.spyOn(pure, 'getWorkDay');

      const res = pure.getWorkDay(testHolidayCalendarsDate, [ { ...expectedDays[0], dayOfTheWeek: 'Wednesday' } ] ).toISODate();
      expect(res).toEqual('2021-08-04');
    });
    it('should return an expected date for calendar day of weekly metadata if today is a holiday and file was not received', async () => {
      // Easter Monday holiday date
      Settings.now = () => new Date('2021-04-05').valueOf();
      const { expectedDays } = weeklySchedule();
      jest.spyOn(pure, 'getWorkDay');

      const res = pure.getWorkDay(testHolidayCalendarsDate, [ { ...expectedDays[0], dayOfTheWeek: 'AllWorkDays' } ]).toISODate();
      expect(res).toEqual('2021-04-06');
    });
  });

  describe('getCalendarDay()', () => {
    it('should return an expected date for calendar day of monthly metadata if a file was not received', async () => {
      jest.spyOn(pure, 'getCalendarDay');
      Settings.now = () => new Date('2021-08-01').valueOf();
      // To check if we get the correct data for startPeriod
      const arrivalPeriod = {
        start: DateTime.fromISO('2021-07-02', { zone: utcZone }),
        end  : DateTime.fromISO('2021-08-02', { zone: utcZone })
      };

      const res = pure.getCalendarDay(testHolidayCalendarsDate, day, allWorkDays, arrivalPeriod).toISODate();
      expect(res).toEqual('2021-07-02');
    });
    it('should return next working day if next expected date is a holiday and file was not received', async () => {
      jest.spyOn(pure, 'getCalendarDay');
      // To check logic when next expected date is a holiday
      const calendar = [ ...testHolidayCalendarsDate, { holidayName: 'test', holidayDate: new Date('2021-07-05') } ];
      Settings.now = () => new Date('2021-08-01').valueOf();
      const arrivalPeriod = {
        start: DateTime.fromISO('2021-07-02', { zone: utcZone }),
        end  : DateTime.fromISO('2021-08-02', { zone: utcZone })
      };

      const res = pure.getCalendarDay(calendar, day, allWorkDays, arrivalPeriod).toISODate();
      expect(res).toEqual('2021-07-02');
    });
    it('should return an expected date for calendar day of monthly metadata if a file was received', async () => {
      jest.spyOn(pure, 'getCalendarDay');
      Settings.now = () => new Date('2021-08-05').valueOf();
      const arrivalPeriod = {
        start: DateTime.fromISO('2021-08-02', { zone: utcZone }),
        end  : DateTime.fromISO('2021-09-02', { zone: utcZone })
      };

      const res = pure.getCalendarDay(testHolidayCalendarsDate, day, allWorkDays, arrivalPeriod, utcZone, true).toISODate();
      expect(res).toEqual('2021-09-02');
    });
    it('should return next working day if next expected date is a holiday and file was received', async () => {
      jest.spyOn(pure, 'getCalendarDay');
      // To check logic when next expected date is a holiday
      const calendar = [ ...testHolidayCalendarsDate.slice(0, -1), { holidayName: 'test', holidayDate: new Date('2021-09-06') } ];

      const res = pure.getCalendarDay(calendar, day, allWorkDays, arrivalPeriod, utcZone, true).toISODate();
      expect(res).toEqual('2021-09-01');
    });
    it('should return an expected date for calendar day of monthly metadata if a file was not received', async () => {
      jest.spyOn(pure, 'getCalendarDay');
      Settings.now = () => new Date('2021-08-01').valueOf();
      const arrivalPeriod = {
        start: DateTime.fromISO('2021-07-01', { zone: utcZone }),
        end  : DateTime.fromISO('2021-08-01', { zone: utcZone })
      };
      // To check logic when next expected date is a holiday
      const calendar = [ ...testHolidayCalendarsDate, { holidayName: 'test', holidayDate: new Date('2021-07-05') } ];

      const res = pure.getCalendarDay(calendar, day, allDaysOfWeek, arrivalPeriod).toISODate();
      expect(res).toEqual('2021-07-01');
    });
  });

  describe('getIsoHolidayDates()', () => {
    it('should return holiday dates in iso format', async () => {
      jest.spyOn(pure, 'getIsoHolidayDates');

      const res = pure.getIsoHolidayDates(testHolidayCalendarsDate);
      expect(res).toEqual([ '2021-01-01', '2021-04-02', '2021-04-05', '2021-08-06' ]);
    });
  });

  describe('getLastWeekday()', () => {
    it('should return last weekday of year (and month)', async () => {
      const res = pure.getLastWeekday(4, 2022, 11);
      expect(res.toISODate()).toBe('2022-11-24');
    });
  });

  describe('isExpiring()', () => {
    it('should return true if holiday calendar expires', async () => {
      Settings.now = () => new Date('2022-11-24').valueOf();
      const res = pure.isExpiring(scheduleMaintenance);
      expect(res).toEqual(true);
    });
    it('should return false if holiday calendar is not expiring yet', async () => {
      Settings.now = () => new Date('2022-11-23').valueOf();
      const res = pure.isExpiring(scheduleMaintenance);
      expect(res).toEqual(false);
    });
  });
});
