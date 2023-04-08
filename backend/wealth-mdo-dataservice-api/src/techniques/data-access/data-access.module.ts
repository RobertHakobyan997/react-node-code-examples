import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { connection } from 'mongoose';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { DataAccessController } from './data-access.controller';
import { DataAccessService } from './data-access.service';
import { DbQueryTransformInterceptor } from './db-query-transform.interceptor';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ DataAccessController ],
  providers  : [
    DataAccessService,
    {
      provide   : 'DbConnectionToken',
      useFactory: () => connection,
    },
    {
      provide : APP_INTERCEPTOR,
      scope   : Scope.TRANSIENT,
      useClass: DbQueryTransformInterceptor,
    },
  ]
})
export class DataAccessModule {
}
