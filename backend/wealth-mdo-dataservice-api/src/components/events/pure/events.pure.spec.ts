import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { scheduleStatus, scheduleStatuses, testEvent } from '../../../../test/data/events/schedule-history-const';

import { createDateFilter, mapScheduleHistory } from './events.pure';

describe('EventsPure', () => {
  describe('mapScheduleHistory', () => {

    it('should return Yes and replace status', () =>{
      const res = mapScheduleHistory(testEvent, scheduleStatuses, '');
      expect(res.fileReceived).toBe('Yes');
      expect(res.fileStatus).toBe(scheduleStatus.display);
    });

    it('should return Yes and dont replace status', () => {
      const res = mapScheduleHistory({ ...testEvent, topic: ScheduleStatus.alert }, scheduleStatuses, '');
      expect(res.fileReceived).toBe('No');
      expect(res.fileStatus).toBe(ScheduleStatus.alert);
    });

    it('should return Yes if there is fileReceived field in data and it is true', () =>{
      const res = mapScheduleHistory(
        { ...testEvent, topic: ScheduleStatus.alert, data: { fileReceived: true } },
        scheduleStatuses,
        ''
      );
      expect(res.fileReceived).toBe('Yes');
    });

    it('should return formatted dates in specified Timezone', () => {
      const createdDate = new Date(Date.UTC(2022, 0, 21, 18));
      const expectedDate = new Date(Date.UTC(2022, 0, 21, 16)).toISOString();
      const timeZoneName = 'timeZoneName';

      expect(
        mapScheduleHistory(
          { ...testEvent, createdAt: createdDate, data: { expectedDate } },
          scheduleStatuses,
          'Australia/Sydney',
          timeZoneName
        )
      ).toEqual({
        date        : `2022-01-22 (${timeZoneName})`,
        time        : `05:00:00 (${timeZoneName})`,
        fileReceived: expect.anything(),
        fileStatus  : expect.anything(),
        expectedDate: `2022-01-22 03:00:00 (${timeZoneName})`,
      });
    });

    it('should return formatted dates with default time zone name', () => {
      const createdDate = new Date(Date.UTC(2022, 0, 21, 18));
      const expectedDate = new Date(Date.UTC(2022, 0, 21, 16)).toISOString();
      const defaultTimeZoneName = '(Unknown time zone)';
      expect(
        mapScheduleHistory(
          { ...testEvent, createdAt: createdDate, data: { expectedDate } },
          scheduleStatuses,
          'UTC'
        )
      ).toEqual({
        date        : `2022-01-21 ${defaultTimeZoneName}`,
        time        : `18:00:00 ${defaultTimeZoneName}`,
        fileReceived: expect.anything(),
        fileStatus  : expect.anything(),
        expectedDate: `2022-01-21 16:00:00 ${defaultTimeZoneName}`,
      });
    });

    it('should return empty string as expectedDate', () => {
      const res = mapScheduleHistory({ ...testEvent }, scheduleStatuses, 'Australia/Sydney');
      expect(res.expectedDate).toBe('');
    });
  });

  describe('createDateFilter', () => {
    it('should return empty filter if fromDate and toDate are empty', () =>
      expect(createDateFilter('', '')).toEqual({}));

    it('should return fromDate filter if toDate is empty', () => {
      const filter = createDateFilter('2022-02-01', '');
      expect(filter).toEqual({ createdAt: { $gte: expect.anything() } });
      expect(filter.createdAt.$gte).toBeInstanceOf(Date);
    });

    it('should return fromDate and toDate filter according to the time zone', () => {
      let filter = createDateFilter('2022-01-01', '2022-03-01', 'Australia/Sydney');
      let fromDate = new Date(Date.UTC(2021, 11, 31, 13));
      let toDate = new Date(Date.UTC(2022, 2, 1, 12, 59, 59, 999));
      expect(filter).toEqual({ createdAt: {  $gte: fromDate, $lte: toDate } });

      filter = createDateFilter('2022-01-01', '2022-03-01', 'America/New_York');
      fromDate = new Date(Date.UTC(2022, 0, 1, 5));
      toDate = new Date(Date.UTC(2022, 2, 2, 4, 59, 59, 999,));
      expect(filter).toEqual({ createdAt: {  $gte: fromDate, $lte: toDate } });
    });
  });
});
