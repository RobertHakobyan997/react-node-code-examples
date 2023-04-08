import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorizationModule } from '../authorization/authorization.module';
import { UserEvents, UserEventsSchema } from '../../core/schemas/user-events.schema';

import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports    : [
    MongooseModule.forFeature([ { name: UserEvents.name, schema: UserEventsSchema } ]),
    AuthorizationModule,
  ],
  providers  : [ EventsService ],
  controllers: [ EventsController ],
  exports    : [ EventsService ],
})
export class EventsModule {
}
