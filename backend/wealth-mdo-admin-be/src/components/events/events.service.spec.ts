import {
  mappedEvents,
  oldTestUser,
  paginatedUserEvents,
  testEventId,
  testEvents,
} from '../../../test/data/events/events.const';

import { EventsService } from './events.service';
import { assert } from './events.service.spec-setup';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('find', () => {
    it('should return all events', async () => {
      jest.spyOn(service['model'], 'find').mockReturnValue({
        exec: () => Promise.resolve(testEvents)
      } as any);
      const res = await service.find();
      expect(res).toEqual(testEvents);
    });
  });

  describe('create', () => {
    it('should create and return events', async () => {
      jest.spyOn(service['model'], 'insertMany').mockImplementation((data: any) => data);
      const res = await service.create(testEvents);
      expect(res).toEqual(testEvents);
      expect(service['model'].insertMany).toHaveBeenCalledWith(testEvents);
    });
  });

  describe('update()', () => {
    it('should update and return event', async () => {
      jest.spyOn(service['model'], 'findById').mockReturnValue({
        exec: () => Promise.resolve(testEvents)
      } as any);
      jest.spyOn(service['model'], 'findByIdAndUpdate').mockReturnValue({
        exec: () => Promise.resolve()
      } as any);
      await service.update(testEventId, testEvents[0] as any);
      expect(service['model'].findByIdAndUpdate).toHaveBeenCalledWith(testEventId, testEvents );
    });
  });

  describe('getUserEvents', () => {
    it('should return all events performed on specific user', async () => {
      jest.spyOn(service['model'], 'paginate').mockResolvedValue(paginatedUserEvents as any);

      const res = await service.getUserEvents(
        oldTestUser.globalProfileId.toString(),
        'createdAt',
        'asc',
        0,
        50
      );
      expect(res.docs).toEqual(mappedEvents);
    });
  });

  describe('getBaseUsersEvents', () => {
    it('should call agregate', done => {
      jest.spyOn(service['model'], 'aggregate').mockResolvedValue([]);
      service.getBaseUsersEvents().subscribe(_ => {
        expect(service['model'].aggregate).toHaveBeenCalled();
        done();
      });
    });
  });
});
