import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { StaticDataService } from './static-data.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      StaticDataService,
      RequestService,
      provideMockHttpService(),
    ],
  }).compile();

  return module.get<StaticDataService>(StaticDataService);
};
