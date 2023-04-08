import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

import { testHolidayCalendars, testSortedHolidayCalendarsQuery } from '../../../test/data/holiday-calendars/holiday-calendars.consts';

import { assert } from './holiday-calendars.service.spec-setup';
import { HolidayCalendarsService } from './holiday-calendars.service';

describe('Holiday calendars service: ', () => {
  let holidayCalendarsService: HolidayCalendarsService;

  beforeAll(async () => {
    holidayCalendarsService = await assert();
  });

  describe('createHolidayCalendars', () => {
    it('should create and return created holiday calendars', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'post').mockReturnValue(of(testHolidayCalendars));
      const holidayCalendars = holidayCalendarsService.createHolidayCalendars(testHolidayCalendars);
      holidayCalendars.subscribe(res => expect(res).toEqual(testHolidayCalendars));
    });
  });

  describe('getHolidayCalendars', () => {
    it('should return holiday calendars', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'get').mockReturnValue(
        of(testHolidayCalendars) as any
      );
      const holidayCalendars = holidayCalendarsService.getHolidayCalendars();
      holidayCalendars.subscribe(res => expect(res).toEqual(testHolidayCalendars));
    });
  });

  describe('getSortedHolidayCalendars', () => {
    it('should return sorted holiday calendars', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'post').mockReturnValue(
        of(testHolidayCalendars) as any
      );
      const holidayCalendars = holidayCalendarsService.getSortedHolidayCalendars(testSortedHolidayCalendarsQuery);
      holidayCalendars.subscribe(res => expect(res).toEqual(testHolidayCalendars));
    });
  });

  describe('updateHolidayCalendar', () => {
    it('should call RequestService put method', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'put').mockReturnValue(of({}));
      holidayCalendarsService.updateHolidayCalendar('', testHolidayCalendars[0]);
      expect(holidayCalendarsService['request'].put).toHaveBeenCalled();
    });
  });

  describe('deleteHolidayCalendar', () => {
    it('should call RequestService put and delete method', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'put').mockReturnValue(of({}));
      jest.spyOn(holidayCalendarsService['request'], 'delete').mockReturnValue(of({} as AxiosResponse));

      holidayCalendarsService.deleteHolidayCalendar('').subscribe(() => {
        expect(holidayCalendarsService['request'].delete).toHaveBeenCalled();
        expect(holidayCalendarsService['request'].put).toHaveBeenCalled();
      });
    });
  });

  describe('toggleHolidayCalendarDisable', () => {
    it('should call put', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'put');

      const testCalendar = testHolidayCalendars[0];

      await holidayCalendarsService.toggleHolidayCalendarDisable(testCalendar._id.toString(), testCalendar);
      expect(holidayCalendarsService['request'].put)
        .toHaveBeenCalled();
    });
  });

  describe('updateContacts', () => {
    it('should call patch', async () => {
      jest.spyOn(holidayCalendarsService['request'], 'patch').mockReturnValue(
        of(holidayCalendarsService) as any
      );

      const testCalendar = testHolidayCalendars[0];

      await holidayCalendarsService.updateContacts(testCalendar._id.toString(), testCalendar.maintenance.contacts);
      expect(holidayCalendarsService['request'].patch)
        .toHaveBeenCalled();
    });
  });
});
