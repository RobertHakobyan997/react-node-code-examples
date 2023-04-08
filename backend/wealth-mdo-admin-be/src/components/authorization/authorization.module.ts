import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // NOSONAR

import { RequestService } from '../../core/request/request.service';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { UserModule } from '../user/user.module';
import { ManageRolesPermissionsModule } from '../manage-roles-permissions/manage-roles-permissions.module';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { RolesGuard } from './guards/roles/roles.guard';
import { AuthorizationClientService } from './authorization-client.service';
import { RoleLockGuard } from './guards/role-lock.guard';

@Module({
  imports    : [
    HttpModule,
    JwtModule.register({}),
    UserSettingsModule,
    UserModule,
    ManageRolesPermissionsModule
  ],
  controllers: [ AuthorizationController ],
  providers  : [
    RequestService,
    AuthorizationService,
    AuthorizationClientService,
    RolesGuard,
    RoleLockGuard
  ],
  exports    : [ AuthorizationService, AuthorizationClientService, JwtModule.register({}) ],
})
export class AuthorizationModule {
}
