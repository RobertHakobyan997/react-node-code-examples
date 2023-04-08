import { Test } from '@nestjs/testing';
import { FilesMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files-metadata';
import { FileDirectionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';
import { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';
import { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';
import { EventsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import { FileTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';
import { EntityTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import { ProcessingStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/processing-statuses';
import { ScheduleStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/schedule-statuses';
import { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';
import { FilesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import * as Luxon from '../../core/utils/luxon';
import { dateFormat, fromFormat } from '../../core/utils/luxon';
import { testHolidayCalendars } from '../../../test/holiday-calendars/holiday-calendars.const';
import { testFilesList } from '../../../test/data/documents/test-file.const';
import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { EventsService } from '../events/events.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { FileTypesService } from '../file-types/file-types.service';
import { EntityTypesService } from '../entity-types/entity-types.service';
import { RegionsService } from '../regions/regions.service';
import { ProcessingStatusesService } from '../processing-statuses/processing-statuses.service';
import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { FilesService } from '../files/files.service';
import { HolidayCalendarsDal } from '../holiday-calendars/holiday-calendars.dal';
import { EventsDal } from '../events/events.dal';
import { SuppliersDal } from '../suppliers/suppliers.dal';
import { FileTypesDal } from '../file-types/file-types.dal';
import { EntityTypesDal } from '../entity-types/entity-types.dal';
import { RegionsDal } from '../regions/regions.dal';
import { CountriesDal } from '../countries/countries.dal';
import { ProcessingStatusesDal } from '../processing-statuses/processing-statuses.dal';
import { ScheduleStatusesDal } from '../schedule/schedule-statuses.dal';
import { FilesDal } from '../files/files.dal';
import { FileDirectionsService } from '../file-directions/file-directions.service';
import { FileDirectionsDal } from '../file-directions/file-directions.dal';
import { CountriesService } from '../countries/countries.service';
import { TimeZonesDal } from '../time-zones/time-zones.dal';
import { TimeZonesService } from '../time-zones/time-zones.service';

import { FilesMetadataService } from './files-metadata.service';
import { FilesMetadataDal } from './files-metadata.dal';

export const assert = async () => {
  const module = await Test.createTestingModule({
    // ToDo: improve injections
    providers: [
      FilesMetadataService,
      FilesMetadataDal,
      FileDirectionsService,
      FileDirectionsDal,
      HolidayCalendarsService,
      HolidayCalendarsDal,
      EventsService,
      EventsDal,
      SuppliersService,
      SuppliersDal,
      FileTypesService,
      FileTypesDal,
      EntityTypesService,
      EntityTypesDal,
      RegionsService,
      RegionsDal,
      CountriesService,
      CountriesDal,
      ProcessingStatusesService,
      ProcessingStatusesDal,
      ScheduleStatusesService,
      ScheduleStatusesDal,
      TimeZonesService,
      TimeZonesDal,
      FilesService,
      FilesDal,
      { provide: FilesMetadataModelToken, useValue: mockMongooseModel },
      { provide: FileDirectionsModelToken, useValue: mockMongooseModel },
      { provide: SuppliersModelToken, useValue: mockMongooseModel },
      { provide: HolidayCalendarsModelToken, useValue: mockMongooseModel },
      { provide: HolidayCalendarsModelToken, useValue: mockMongooseModel },
      { provide: EventsModelToken, useValue: mockMongooseModel },
      { provide: FileTypesModelToken, useValue: mockMongooseModel },
      { provide: EntityTypesModelToken, useValue: mockMongooseModel },
      { provide: RegionsModelToken, useValue: mockMongooseModel },
      { provide: CountriesModelToken, useValue: mockMongooseModel },
      { provide: ProcessingStatusesModelToken, useValue: mockMongooseModel },
      { provide: ScheduleStatusesModelToken, useValue: mockMongooseModel },
      { provide: TimeZonesToken, useValue: mockMongooseModel },
      { provide: FilesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<FilesMetadataService>(FilesMetadataService);
};

export const getMonthlySchedule = (service: FilesMetadataService, date: string, metadata: FilesMetadata[]) => {
  jest.spyOn(service, 'getScheduleData').mockResolvedValue([
    metadata,
    testFilesList,
    testSuppliers,
    testHolidayCalendars
  ] as any);

  const beforeStartDay = fromFormat(date, dateFormat, 'UTC').setLocale('en-US');
  jest.spyOn(Luxon, 'now').mockReturnValue(beforeStartDay);
  jest.spyOn(Luxon, 'isNowInPeriod').mockReturnValue(true);
  return service.getSchedule();
};

