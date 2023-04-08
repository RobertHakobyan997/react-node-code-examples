import { Test, TestingModule } from '@nestjs/testing';
import { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { TimeZonesService } from './time-zones.service';
import { TimeZonesDal } from './time-zones.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TimeZonesService,
      TimeZonesDal,
      { provide: TimeZonesToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<TimeZonesService>(TimeZonesService);
};
