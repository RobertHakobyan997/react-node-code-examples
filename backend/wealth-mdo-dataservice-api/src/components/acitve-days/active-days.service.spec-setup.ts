import { Test, TestingModule } from '@nestjs/testing';
import { ActiveDaysToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/active-days';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { ActiveDaysService } from './active-days.service';
import { ActiveDaysDal } from './active-days.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ActiveDaysService,
      ActiveDaysDal,
      { provide: ActiveDaysToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<ActiveDaysService>(ActiveDaysService);
};
