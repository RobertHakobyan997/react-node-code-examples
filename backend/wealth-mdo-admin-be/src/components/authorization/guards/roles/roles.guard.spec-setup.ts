import { Test } from '@nestjs/testing';

import { provideMockJwtService } from '../../../../../test/mocks/mock-jwt-service';
import { provideMockReflector } from '../../../../../test/mocks/mock-reflector';
import { provideMockAuthorizationService } from '../../../../../test/mocks/mock-authorization-service';

import { RolesGuard } from './roles.guard';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      RolesGuard,
      provideMockReflector(),
      provideMockJwtService(),
      provideMockAuthorizationService(),
    ],
  }).compile();

  return module.get<RolesGuard>(RolesGuard);
};
