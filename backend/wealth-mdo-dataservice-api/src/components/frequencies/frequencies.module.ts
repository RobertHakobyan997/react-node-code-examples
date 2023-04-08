import { Module } from '@nestjs/common';
import FrequenciesModel, { FrequenciesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/frequencies';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { FrequenciesService } from './frequencies.service';
import { FrequenciesDal } from './frequencies.dal';
import { FrequenciesController } from './frequencies.controller';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ FrequenciesController ],
  providers  : [
    { provide: FrequenciesModelToken, useFactory: () => FrequenciesModel },
    FrequenciesService,
    FrequenciesDal
  ],
  exports: [ FrequenciesService ],
})
export class FrequenciesModule {
}
