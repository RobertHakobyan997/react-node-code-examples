import { HttpModule, Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';

import { SecurityKeyGuard } from './guards/security-key.guard';
import { RegisteredUsersController } from './registered-users.controller';
import { RegisteredUsersService } from './registered-users.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
    AuthorizationModule
  ],
  controllers: [ RegisteredUsersController ],
  providers: [
    RegisteredUsersService,
    SecurityKeyGuard
  ],
  exports: [ RegisteredUsersService ],
})
export class RegisteredUsersModule {}
