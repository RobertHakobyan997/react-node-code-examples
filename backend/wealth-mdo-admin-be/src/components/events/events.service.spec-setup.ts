import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { UserEvents } from '../../core/schemas/user-events.schema';

import { EventsService } from './events.service';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventsService,
      { provide: getModelToken(UserEvents.name), useValue: mockMongooseModel }
    ],
  }).compile();

  return module.get<EventsService>(EventsService);
};
