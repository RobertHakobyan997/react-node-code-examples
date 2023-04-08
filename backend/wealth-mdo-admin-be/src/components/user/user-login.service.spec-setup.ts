import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RequestService } from '../../core/request/request.service';
import { User } from '../../core/schemas/user.schema';
import { AuthorizationService } from '../authorization/authorization.service';
import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { AuthorizationClientService } from '../authorization/authorization-client.service';
import { provideMockAuthClientApiService } from '../../../test/mocks/mock-auth-client-api-service';
import { provideMockEventsService } from '../../../test/mocks/mock-events-service';
import { provideMockUserSettingsService } from '../../../test/mocks/mock-user-settings-service';
import { provideMockService } from '../../../test/mocks/mock-service';
import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { ManageRolesPermissionsService } from '../manage-roles-permissions/manage-roles-permissions.service';

import { UserLoginService } from './user-login.service';
import { UserService } from './user.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      EventEmitter2,
      AuthorizationService,
      AuthorizationClientService,
      RequestService,
      provideMockAuthClientApiService(),
      provideMockHttpService(),
      provideMockEventsService(),
      provideMockUserSettingsService(),
      provideMockService(UserService),
      provideMockService(ManageRolesPermissionsService),
      UserLoginService,
      { provide: getModelToken(User.name), useValue: mockMongooseModel }
    ],
  }).compile();

  return {
    UserLoginService: module.get<UserLoginService>(UserLoginService),
    AuthorizationService: module.get<AuthorizationService>(AuthorizationService) } ;
};
