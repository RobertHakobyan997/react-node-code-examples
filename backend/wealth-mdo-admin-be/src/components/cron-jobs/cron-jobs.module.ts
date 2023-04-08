import { Module } from '@nestjs/common';

import { CommunicationModule } from '../communication/communication.module';
import { HolidayCalendarsModule } from '../holiday-calendars/holiday-calendars.module';
import { MessageTemplatesModule } from '../message-templates/message-templates.module';
import { FilesMetadataModule } from '../files-metadata/files-metadata.module';

import { CronJobsService } from './cron-jobs.service';
import { CronJobsController } from './cron-jobs.controller';

@Module({
  providers: [
    CronJobsService
  ],
  imports: [
    HolidayCalendarsModule,
    CommunicationModule,
    MessageTemplatesModule,
    FilesMetadataModule
  ],
  controllers: [ CronJobsController ]
})
export class CronJobsModule {}
