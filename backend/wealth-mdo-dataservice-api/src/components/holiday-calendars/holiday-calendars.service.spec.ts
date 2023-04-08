import { cloneDeep } from 'lodash';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { BadRequestException } from '@nestjs/common';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';

import {
  testCalendarId,
  testHolidayCalendar,
  testHolidayCalendars,
  testSortedHolidayCalendars,
  testSortedHolidayCalendarsQuery,
} from '../../../test/holiday-calendars/holiday-calendars.const';
import { regions } from '../../../test/data/regions/regions.const';
import { countries } from '../../../test/data/countries/countries.const';

import { HolidayCalendarsService } from './holiday-calendars.service';
import { assert } from './holiday-calendars.spec-setup';

describe('HolidayCalendarsService', () => {
  let service: HolidayCalendarsService;
  let testCalendar;

  beforeEach(async () => {
    service = await assert();
    testCalendar = cloneDeep(testHolidayCalendars[0]);
  });

  describe('getAll()', () => {
    it('should return all holiday calendars', async () => {
      jest
        .spyOn(service['dal'], 'findAll')
        .mockResolvedValue(
          testHolidayCalendars as Document<HolidayCalendars>[]
        );
      const res = await service.findAll();
      expect(res).toEqual(testHolidayCalendars);
    });
  });

  describe('getExpiringHolidayCalendars()', () => {
    it('should return expiring holiday calendars', async () => {
      jest
        .spyOn(service['dal'], 'findAll')
        .mockResolvedValue(testHolidayCalendars as Document<HolidayCalendars>[]);
      const res = await service.findAll();
      expect(res).toEqual(testHolidayCalendars);
    });
  });

  describe('getHolidayCalendar()', () => {
    it('should return holiday calendar by id', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testCalendar);
      const res = await service.getHolidayCalendar(testCalendarId);
      expect(res).toEqual(testCalendar);
      expect(service['dal'].findById).toHaveBeenCalledWith(
        testCalendarId,
        { _id: 0 },
        {}
      );
    });
  });

  describe('create()', () => {
    it('should create and return holiday calendars', async () => {
      jest
        .spyOn(service['dal'], 'insert')
        .mockImplementation((data: any) => data);
      const res = await service.create(testHolidayCalendars);
      expect(res).toEqual(testHolidayCalendars);
      expect(service['dal'].insert).toHaveBeenCalledWith(testHolidayCalendars);
    });
  });

  describe('findOne', () => {
    it('should delete holiday calendars', async () => {
      jest.spyOn(service['dal'], 'findOne').mockResolvedValue({} as Document<HolidayCalendars>);
      await service.findOne({});
      expect(service['dal'].findOne).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete holiday calendars', async () => {
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockClear();
      await service.delete(testHolidayCalendar._id.toString());
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('getWeekends()', () => {
    it('should get weekends for a year', async () => {
      jest
        .spyOn(service['dal'], 'findAll')
        .mockResolvedValue(
          testHolidayCalendars as Document<HolidayCalendars>[]
        );
      const res = await service.getHolidaysWithWeekends();
      expect(res.length).toBeGreaterThan(10);
    });
  });

  describe('getSortedHolidayCalendars()', () => {
    it('should return sorted holiday calendars', async () => {
      jest.spyOn(service['dal'], 'paginate').mockResolvedValue(testSortedHolidayCalendars as any);
      jest.spyOn(service, 'getStaticData').mockResolvedValue(cloneDeep([
        regions,
        countries
      ]) as any);

      const res = await service.getSortedHolidayCalendars(
        testSortedHolidayCalendarsQuery
      );

      expect(service['dal'].paginate).toHaveBeenCalledWith(
        {
          isDefault: { $in: [ null, false ] }
        },
        {
          limit : 50,
          offset: 0,
          sort  : {
            [testSortedHolidayCalendarsQuery.field]: testSortedHolidayCalendarsQuery.sortOrder,
          }
        },
      );
      expect(res).toEqual({
        ...testSortedHolidayCalendars,
        docs: testSortedHolidayCalendars.docs.map(d => ({ ...d, country: 'UK', region: 'International' }))
      });
    });
  });

  describe('updateContacts', () => {
    beforeEach(async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testHolidayCalendar as Document<HolidayCalendars>);
      jest.spyOn(service['dal'], 'patchOne');
    });
    it('should throw error',  () => {
      expect(service.updateContacts(testCalendarId, []))
        .rejects.toThrow(BadRequestException);
    });

    it('should update emails', async () => {
      await service.updateContacts(testCalendarId, []);
      expect(service['dal'].patchOne).toHaveBeenCalled();
    });
  });
});
