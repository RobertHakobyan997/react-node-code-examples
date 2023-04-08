import { Test } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { provideMockAuthClientApiService } from '../../../test/mocks/mock-auth-client-api-service';
import { provideMockJwtService } from '../../../test/mocks/mock-jwt-service';
import { RequestService } from '../../core/request/request.service';
import { provideMockEventsService } from '../../../test/mocks/mock-events-service';
import { provideMockUserSettingsService } from '../../../test/mocks/mock-user-settings-service';
import{ provideMockService } from '../../../test/mocks/mock-service';
import { UserService } from '../user/user.service';
import { ManageRolesPermissionsService } from '../manage-roles-permissions/manage-roles-permissions.service';

import { AuthorizationService } from './authorization.service';
import { AuthorizationClientService } from './authorization-client.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      AuthorizationService,
      EventEmitter2,
      AuthorizationClientService,
      RequestService,
      provideMockJwtService(),
      provideMockAuthClientApiService(),
      provideMockHttpService(),
      provideMockEventsService(),
      provideMockUserSettingsService(),
      provideMockService(UserService),
      provideMockService(ManageRolesPermissionsService)
    ],
  }).compile();

  return module.get<AuthorizationService>(AuthorizationService);
};
