import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { plainToClass } from 'class-transformer';
import EventsModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import { Types } from 'mongoose';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';
import { cloneDeep } from 'lodash';

import {
  testEvent,
  testEventRaw,
  testEvents,
  testSortedEvents
} from '../../../test/data/events/test-events.const';
import { testScheduleStatuses } from '../../../test/data/files-metadata/test-schedule-statuses.const';
import { testScheduleHistoryRequest } from '../../../test/data/events/schedule-history-const';
import { testFileId } from '../../../test/data/files-metadata/test-files-metadata.const';
import { testStatuses } from '../../../test/data/schedule-statuses/test-statuses.const';
import { timeZones } from '../../../test/data/time-zones/time-zones.const';

import { EventsService } from './events.service';
import { assert } from './events.service.spec-setup';
import { ScheduleHistoryRequest } from './types/get-schedule-history-request';

describe('EventsService', () => {
  const testEventId = testEvent._id.toString();
  let service: EventsService;

  beforeEach(async () => {
    service = await assert();
  });

  it('plainToClass', () => {
    const mapped = plainToClass(EventsModel, testEventRaw);
    expect(mapped._id).toBeInstanceOf(Types.ObjectId);
  });

  describe('findAll()', () => {
    it('should return all events', async () => {
      jest.spyOn(service['dal'], 'paginate').mockResolvedValue(testEvents as any);
      const res = await service.paginate({}, {});
      expect(res).toEqual(testEvents);
      expect(res.length).toBe(100);
    });
  });

  describe('findById()', () => {
    it('should return event', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(testEvent as Document<Events>);
      const res = await service.findById(testEventId);
      expect(res).toEqual(testEvent);
    });
  });

  describe('create()', () => {
    it('should create and return event', async () => {
      jest.spyOn(service['dal'], 'insert').mockImplementation((data: Events[]) => Promise.resolve(data as any));
      const res = await service.create(testEvents);
      expect(res).toEqual(testEvents);
      expect(service['dal'].insert).toHaveBeenCalledWith(testEvents);
    });
  });

  describe('getScheduleHistory', () => {
    it('should call aggregatePaginate', async () => {
      jest.spyOn(service['scheduleStatusesService'], 'findAll').mockResolvedValue(cloneDeep(testScheduleStatuses) as any);
      jest.spyOn(service['dal'], 'aggregatePaginate').mockResolvedValue([ testSortedEvents as any ]);
      jest.spyOn(service['timeZonesService'], 'findOne').mockResolvedValue(timeZones[0] as Document<TimeZones>);

      await service.getScheduleHistory(testScheduleHistoryRequest);
      expect(service['dal'].aggregatePaginate).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        testScheduleHistoryRequest.field,
        1,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe('getScheduleHistoryForExport', () => {
    it('should call eventsService.aggregateScheduleEventsForExport', async () => {
      const fileMetadataId = testFileId;
      jest.spyOn(service['scheduleStatusesService'], 'findAll').mockResolvedValue(cloneDeep(testStatuses) as any);
      jest.spyOn(service['dal'], 'aggregateScheduleEventsForExport').mockResolvedValue(testSortedEvents.docs as any);
      jest.spyOn(service['timeZonesService'], 'findOne').mockResolvedValue(timeZones[0] as Document<TimeZones>);
      await service.getScheduleHistoryForExport({
        fileMetadataId,
        field    : 'testField',
        sortOrder: 'asc',
        statuses : [ ScheduleStatus.late ]
      } as ScheduleHistoryRequest);
      expect(service['dal'].aggregateScheduleEventsForExport).toHaveBeenCalled();
    });
  });
});
