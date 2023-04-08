import { Module } from '@nestjs/common';
import { IS_PROD } from 'ngpd-merceros-wealth-mdo-common-be/dist/utils/environments';

import { FilesMetadataModule } from './files-metadata/files-metadata.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { EventsModule } from './events/events.module';
import { ScheduleStatusesModule } from './schedule/schedule-statuses.module';
import { FileTypesModule } from './file-types/file-types.module';
import { LocationsModule } from './locations/locations.module';
import { FileDirectionsModule } from './file-directions/file-directions.module';
import { RegionsModule } from './regions/regions.module';
import { CountriesModule } from './countries/countries.module';
import { EntityTypesModule } from './entity-types/entity-types.module';
import { ProcessingStatusesModule } from './processing-statuses/processing-statuses.module';
import { HolidayCalendarsModule } from './holiday-calendars/holiday-calendars.module';
import { MessageTemplatesModule } from './message-templates/message-templates.module';
import { DataTransferJobsMetadataModule } from './data-transfer-jobs-metadata/data-transfer-jobs-metadata.module';
import { DataTransferJobsStatusModule } from './data-transfer-jobs-status/data-transfer-jobs-status.module';
import { DevModule } from './dev/dev.module';
import { FilesModule } from './files/files.module';
import { ContactsModule } from './contacts/contacts.module';
import { ActiveDaysModule } from './acitve-days/active-days.module';
import { FrequenciesModule } from './frequencies/frequencies.module';
import { TimeZonesModule } from './time-zones/time-zones.module';
import { StaticDataModule } from './static-data/static-data.module';

@Module({
  imports: [
    ...!IS_PROD() ? [ DevModule ] : [],
    FilesModule,
    FilesMetadataModule,
    SuppliersModule,
    EventsModule,
    ScheduleStatusesModule,
    FileTypesModule,
    LocationsModule,
    FileDirectionsModule,
    RegionsModule,
    CountriesModule,
    EntityTypesModule,
    ProcessingStatusesModule,
    HolidayCalendarsModule,
    MessageTemplatesModule,
    DataTransferJobsMetadataModule,
    DataTransferJobsStatusModule,
    ContactsModule,
    ActiveDaysModule,
    FrequenciesModule,
    TimeZonesModule,
    StaticDataModule
  ]
})
export class ComponentsModule {
}
