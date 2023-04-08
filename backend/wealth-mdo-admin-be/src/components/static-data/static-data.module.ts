import { HttpModule, Module } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';

import { StaticDataController } from './static-data.controller';
import { StaticDataService } from './static-data.service';

@Module({
  imports    : [
    HttpModule.register({
      headers: { apikey: process.env.DATA_SERVICE_API_KEY },
    }),
  ],
  controllers: [ StaticDataController ],
  providers  : [ RequestService, StaticDataService ],
  exports    : [ StaticDataService ],
})
export class StaticDataModule {
}
