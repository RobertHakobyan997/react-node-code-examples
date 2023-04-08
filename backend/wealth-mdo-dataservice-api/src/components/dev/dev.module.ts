import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { DevController } from './dev.conroller';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ DevController ],
})

export class DevModule {
}
