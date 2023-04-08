import { Module } from '@nestjs/common';
import RegionsModel, { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { RegionsDal } from './regions.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ RegionsController ],
  providers  : [
    { provide: RegionsModelToken, useFactory: () => RegionsModel },
    RegionsService,
    RegionsDal
  ],
  exports: [ RegionsService ],
})
export class RegionsModule {
}
