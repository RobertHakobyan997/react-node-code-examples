import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/schedule-statuses';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { ScheduleStatusesService } from './schedule-statuses.service';
import { ScheduleStatusesDal } from './schedule-statuses.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScheduleStatusesService,
      ScheduleStatusesDal,
      { provide: ScheduleStatusesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<ScheduleStatusesService>(ScheduleStatusesService);
};
