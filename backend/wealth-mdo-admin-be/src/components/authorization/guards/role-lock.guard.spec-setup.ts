import { Test } from '@nestjs/testing';

import { provideMockAuthorizationService } from '../../../../test/mocks/mock-authorization-service';

import { RoleLockGuard } from './role-lock.guard';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      RoleLockGuard,
      provideMockAuthorizationService(),
    ],
  }).compile();

  return module.get<RoleLockGuard>(RoleLockGuard);
};
