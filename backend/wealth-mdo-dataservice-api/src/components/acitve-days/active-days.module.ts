import { Module } from '@nestjs/common';
import ActiveDaysModel, { ActiveDaysToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/active-days';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { ActiveDaysService } from './active-days.service';
import { ActiveDaysDal } from './active-days.dal';
import { ActiveDaysController } from './active-days.controller';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ ActiveDaysController ],
  providers  : [
    { provide: ActiveDaysToken, useFactory: () => ActiveDaysModel },
    ActiveDaysService,
    ActiveDaysDal
  ],
  exports: [ ActiveDaysService ],
})
export class ActiveDaysModule {
}
