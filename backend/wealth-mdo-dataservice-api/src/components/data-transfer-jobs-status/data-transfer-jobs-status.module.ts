import { Module } from '@nestjs/common';
import DataTransferJobsStatusModel, { DataTransferJobsStatusModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-status';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { DataTransferJobsStatusController } from './data-transfer-jobs-status.controller';
import { DataTransferJobsStatusService } from './data-transfer-jobs-status.service';
import { DataTransferJobsStatusDal } from './data-transfer-jobs-status.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ DataTransferJobsStatusController ],
  providers  : [
    { provide: DataTransferJobsStatusModelToken, useFactory: () => DataTransferJobsStatusModel },
    DataTransferJobsStatusService,
    DataTransferJobsStatusDal
  ],
  exports: [ DataTransferJobsStatusService ],
})
export class DataTransferJobsStatusModule {
}
