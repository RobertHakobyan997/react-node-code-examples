import { Module } from '@nestjs/common';
import DataTransferJobsMetadataModel, { DataTransferJobsMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-metadata';

import { HolidayCalendarsModule } from '../holiday-calendars/holiday-calendars.module';
import { DataTransferJobsStatusModule } from '../data-transfer-jobs-status/data-transfer-jobs-status.module';
import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { DataTransferJobsMetadataController } from './data-transfer-jobs-metadata.controller';
import { DataTransferJobsMetadataService } from './data-transfer-jobs-metadata.service';
import { DataTransferJobsMetadataDal } from './data-transfer-jobs-metadata.dal';

@Module({
  imports: [
    DatabaseModule,
    HolidayCalendarsModule,
    DataTransferJobsStatusModule
  ],
  controllers: [ DataTransferJobsMetadataController ],
  providers  : [
    { provide: DataTransferJobsMetadataModelToken, useFactory: () => DataTransferJobsMetadataModel },
    DataTransferJobsMetadataService,
    DataTransferJobsMetadataDal
  ],
  exports: [ DataTransferJobsMetadataService ],
})
export class DataTransferJobsMetadataModule {
}
