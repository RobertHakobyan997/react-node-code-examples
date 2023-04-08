import { Module } from '@nestjs/common';
import FilesModel, { FilesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files';

import { HolidayCalendarsModule } from '../holiday-calendars/holiday-calendars.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { FileTypesModule } from '../file-types/file-types.module';
import { FileDirectionsModule } from '../file-directions/file-directions.module';
import { EntityTypesModule } from '../entity-types/entity-types.module';
import { RegionsModule } from '../regions/regions.module';
import { ProcessingStatusesModule } from '../processing-statuses/processing-statuses.module';
import { ScheduleStatusesModule } from '../schedule/schedule-statuses.module';
import { DatabaseModule } from '../../core/database/mongodb/database.module';
import { EventsModule } from '../events/events.module';

import { FilesDal } from './files.dal';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    DatabaseModule,
    HolidayCalendarsModule,
    SuppliersModule,
    FileTypesModule,
    FileDirectionsModule,
    EntityTypesModule,
    RegionsModule,
    ProcessingStatusesModule,
    ScheduleStatusesModule,
    EventsModule
  ],
  controllers: [ FilesController ],
  providers  : [
    { provide: FilesModelToken, useFactory: () => FilesModel },
    FilesService,
    FilesDal
  ],
  exports: [ FilesService ],
})
export class FilesModule {
}
