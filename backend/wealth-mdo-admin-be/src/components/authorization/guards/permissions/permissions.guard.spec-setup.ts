import { Test } from '@nestjs/testing';

import { provideMockReflector } from '../../../../../test/mocks/mock-reflector';
import { provideMockAuthorizationService } from '../../../../../test/mocks/mock-authorization-service';

import { PermissionsGuard } from './permissions.guard';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      provideMockReflector(),
      provideMockAuthorizationService(),
      PermissionsGuard,
    ],
  }).compile();

  return module.get<PermissionsGuard>(PermissionsGuard);
};
