import { Test, TestingModule } from '@nestjs/testing';
import { EventsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import { ScheduleStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/schedule-statuses';
import { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { ScheduleStatusesDal } from '../schedule/schedule-statuses.dal';
import { TimeZonesDal } from '../time-zones/time-zones.dal';
import { TimeZonesService } from '../time-zones/time-zones.service';

import { EventsService } from './events.service';
import { EventsDal } from './events.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventsService,
      EventsDal,
      ScheduleStatusesService,
      ScheduleStatusesDal,
      TimeZonesService,
      TimeZonesDal,
      { provide: EventsModelToken, useValue: mockMongooseModel },
      { provide: ScheduleStatusesModelToken, useValue: mockMongooseModel },
      { provide: TimeZonesToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<EventsService>(EventsService);
};
