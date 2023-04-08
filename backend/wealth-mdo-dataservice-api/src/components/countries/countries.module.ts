import { Module } from '@nestjs/common';
import CountriesModel, { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesDal } from './countries.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ CountriesController ],
  providers  : [
    { provide: CountriesModelToken, useFactory: () => CountriesModel },
    CountriesService,
    CountriesDal
  ],
  exports: [ CountriesService ],
})
export class CountriesModule {
}
