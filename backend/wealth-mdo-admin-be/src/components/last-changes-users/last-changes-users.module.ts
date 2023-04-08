import { Module } from '@nestjs/common';

import { AuthorizationModule } from '../authorization/authorization.module';
import { EventsModule } from '../events/events.module';

import { LastChangesUsersController } from './last-changes-users.controller';
import { LastChangesUsersService } from './last-changes-users.service';

@Module({
  imports: [ AuthorizationModule, EventsModule ],
  controllers: [ LastChangesUsersController ],
  providers: [ LastChangesUsersService ]
})
export class LastChangesUsersModule {}
