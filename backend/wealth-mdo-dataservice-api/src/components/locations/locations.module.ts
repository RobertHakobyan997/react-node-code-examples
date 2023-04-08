import { Module } from '@nestjs/common';
import LocationsModel, { LocationsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/locations';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationsDal } from './locations.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ LocationsController ],
  providers  : [
    { provide: LocationsModelToken, useFactory: () => LocationsModel },
    LocationsService,
    LocationsDal
  ],
  exports: [ LocationsService ],
})
export class LocationsModule {
}
