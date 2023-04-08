import { Test } from '@nestjs/testing';

import { provideMockAuthorizationService } from '../../../test/mocks/mock-authorization-service';
import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';

import { RegisteredUsersService } from './registered-users.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      RegisteredUsersService,
      provideMockHttpService(),
      provideMockAuthorizationService(),
    ],
  }).compile();

  return module.get<RegisteredUsersService>(RegisteredUsersService);
};
