import { EventsService } from '../../src/components/events/events.service';

export class MockEventsService {
  find = () => null;
  create = () => null;
  update = () => null;
  getBaseUsersEvents = () => null;
}

export function provideMockEventsService() {
  return {
    provide: EventsService,
    useClass: MockEventsService,
  };
}
