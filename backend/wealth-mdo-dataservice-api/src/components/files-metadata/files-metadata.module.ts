import { Module } from '@nestjs/common';
import FilesMetadataModel, { FilesMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files-metadata';

import { HolidayCalendarsModule } from '../holiday-calendars/holiday-calendars.module';
import { EventsModule } from '../events/events.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { FileTypesModule } from '../file-types/file-types.module';
import { EntityTypesModule } from '../entity-types/entity-types.module';
import { RegionsModule } from '../regions/regions.module';
import { ProcessingStatusesModule } from '../processing-statuses/processing-statuses.module';
import { ScheduleStatusesModule } from '../schedule/schedule-statuses.module';
import { FilesModule } from '../files/files.module';
import { CountriesModule } from '../countries/countries.module';
import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { FilesMetadataService } from './files-metadata.service';
import { FilesMetadataController } from './files-metadata.controller';
import { FilesMetadataDal } from './files-metadata.dal';

@Module({
  imports: [
    DatabaseModule,
    HolidayCalendarsModule,
    EventsModule,
    SuppliersModule,
    FileTypesModule,
    EntityTypesModule,
    RegionsModule,
    ProcessingStatusesModule,
    ScheduleStatusesModule,
    FilesModule,
    CountriesModule
  ],
  controllers: [ FilesMetadataController ],
  providers  : [
    { provide: FilesMetadataModelToken, useFactory: () => FilesMetadataModel },
    FilesMetadataService,
    FilesMetadataDal
  ],
  exports: [ FilesMetadataService ]
})
export class FilesMetadataModule {
}
