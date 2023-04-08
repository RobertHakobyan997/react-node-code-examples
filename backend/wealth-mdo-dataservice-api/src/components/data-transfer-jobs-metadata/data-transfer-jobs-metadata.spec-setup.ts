import { Test, TestingModule } from '@nestjs/testing';
import { DataTransferJobsMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-metadata';
import { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';
import { DataTransferJobsStatusModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-status';
import { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { HolidayCalendarsDal } from '../holiday-calendars/holiday-calendars.dal';
import { DataTransferJobsStatusService } from '../data-transfer-jobs-status/data-transfer-jobs-status.service';
import { DataTransferJobsStatusDal } from '../data-transfer-jobs-status/data-transfer-jobs-status.dal';
import { RegionsService } from '../regions/regions.service';
import { RegionsDal } from '../regions/regions.dal';
import { CountriesService } from '../countries/countries.service';
import { CountriesDal } from '../countries/countries.dal';

import { DataTransferJobsMetadataService } from './data-transfer-jobs-metadata.service';
import { DataTransferJobsMetadataDal } from './data-transfer-jobs-metadata.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DataTransferJobsMetadataService,
      DataTransferJobsMetadataDal,
      DataTransferJobsStatusService,
      DataTransferJobsStatusDal,
      HolidayCalendarsService,
      HolidayCalendarsDal,
      RegionsService,
      RegionsDal,
      CountriesService,
      CountriesDal,
      { provide: HolidayCalendarsModelToken, useValue: mockMongooseModel },
      { provide: RegionsModelToken, useValue: mockMongooseModel },
      { provide: CountriesModelToken, useValue: mockMongooseModel },
      { provide: DataTransferJobsMetadataModelToken, useValue: mockMongooseModel },
      { provide: DataTransferJobsStatusModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<DataTransferJobsMetadataService>(DataTransferJobsMetadataService);
};
