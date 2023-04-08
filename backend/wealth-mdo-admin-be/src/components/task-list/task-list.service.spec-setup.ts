import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { TaskListService } from './task-list.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      TaskListService,
      RequestService,
      provideMockHttpService()
    ],
  }).compile();

  return module.get<TaskListService>(TaskListService);
};
