import { Test } from '@nestjs/testing';
import { FilesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files';
import { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';
import { FileTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';
import { FileDirectionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';
import { EntityTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';
import { ProcessingStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/processing-statuses';
import { ScheduleStatusesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/schedule-statuses';
import { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';
import { EventsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { FileTypesService } from '../file-types/file-types.service';
import { FileDirectionsService } from '../file-directions/file-directions.service';
import { EntityTypesService } from '../entity-types/entity-types.service';
import { RegionsService } from '../regions/regions.service';
import { ProcessingStatusesService } from '../processing-statuses/processing-statuses.service';
import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { HolidayCalendarsDal } from '../holiday-calendars/holiday-calendars.dal';
import { SuppliersDal } from '../suppliers/suppliers.dal';
import { FileTypesDal } from '../file-types/file-types.dal';
import { FileDirectionsDal } from '../file-directions/file-directions.dal';
import { EntityTypesDal } from '../entity-types/entity-types.dal';
import { RegionsDal } from '../regions/regions.dal';
import { CountriesService } from '../countries/countries.service';
import { CountriesDal } from '../countries/countries.dal';
import { ProcessingStatusesDal } from '../processing-statuses/processing-statuses.dal';
import { ScheduleStatusesDal } from '../schedule/schedule-statuses.dal';
import { EventsService } from '../events/events.service';
import { EventsDal } from '../events/events.dal';
import { TimeZonesDal } from '../time-zones/time-zones.dal';
import { TimeZonesService } from '../time-zones/time-zones.service';

import { FilesDal } from './files.dal';
import { FilesService } from './files.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    // ToDo: improve injections
    providers: [
      FilesService,
      FilesDal,
      HolidayCalendarsService,
      HolidayCalendarsDal,
      SuppliersService,
      SuppliersDal,
      FileTypesService,
      FileTypesDal,
      FileDirectionsService,
      FileDirectionsDal,
      EntityTypesService,
      EntityTypesDal,
      RegionsService,
      RegionsDal,
      ProcessingStatusesService,
      ProcessingStatusesDal,
      ScheduleStatusesService,
      TimeZonesService,
      TimeZonesDal,
      ScheduleStatusesDal,
      CountriesService,
      CountriesDal,
      EventsService,
      EventsDal,
      { provide: FilesModelToken, useValue: mockMongooseModel },
      { provide: SuppliersModelToken, useValue: mockMongooseModel },
      { provide: FileTypesModelToken, useValue: mockMongooseModel },
      { provide: FileDirectionsModelToken, useValue: mockMongooseModel },
      { provide: EntityTypesModelToken, useValue: mockMongooseModel },
      { provide: RegionsModelToken, useValue: mockMongooseModel },
      { provide: CountriesModelToken, useValue: mockMongooseModel },
      { provide: ProcessingStatusesModelToken, useValue: mockMongooseModel },
      { provide: ScheduleStatusesModelToken, useValue: mockMongooseModel },
      { provide: HolidayCalendarsModelToken, useValue: mockMongooseModel },
      { provide: TimeZonesToken, useValue: mockMongooseModel },
      { provide: EventsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<FilesService>(FilesService);
};
