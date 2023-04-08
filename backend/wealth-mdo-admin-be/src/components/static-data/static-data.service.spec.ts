import { of } from 'rxjs';

import { testScheduleStatuses } from '../../../test/data/static-data/test-schedule-statuses.const';
import { testFileTypes } from '../../../test/data/static-data/test-file-types.const';
import { testLocations } from '../../../test/data/static-data/test-locations.const';
import { testDirections } from '../../../test/data/static-data/test-directions.const';
import { testSuppliers } from '../../../test/data/static-data/test-suppliers.const';
import { testRegions } from '../../../test/data/static-data/test-regions.const';
import { testCountries } from '../../../test/data/static-data/test-countries.const';
import { testEntityTypes } from '../../../test/data/static-data/test-entity-types.const';
import { testTimeZones } from '../../../test/data/static-data/test-time-zones.const';

import { assert } from './static-data.service.spec-setup';
import { StaticDataService } from './static-data.service';

describe('Static Data service: ', () => {
  let filesService: StaticDataService;

  beforeAll(async () => {
    filesService = await assert();
  });

  describe('getScheduleStatuses', () => {
    it('should return all possible schedule statuses from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testScheduleStatuses ]) as any
      );

      const files = filesService.getScheduleStatuses();
      files.subscribe(res => expect(res).toEqual([ testScheduleStatuses ]));
    });
  });

  describe('getProcessingStatuses', () => {
    it('should return all possible processing statuses from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testScheduleStatuses ]) as any
      );

      const files = filesService.getProcessingStatuses();
      files.subscribe(res => expect(res).toEqual([ testScheduleStatuses ]));
    });
  });

  describe('getFileTypes', () => {
    it('should return all possible file types from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testFileTypes ]) as any
      );

      const files = filesService.getFileTypes();
      files.subscribe(res => expect(res).toEqual([ testFileTypes ]));
    });
  });

  describe('getLocations', () => {
    it('should return all possible locations from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testLocations ]) as any
      );

      const files = filesService.getLocations();
      files.subscribe(res => expect(res).toEqual([ testLocations ]));
    });
  });

  describe('getDirections', () => {
    it('should return all possible directions from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testDirections ]) as any
      );

      const files = filesService.getDirections();
      files.subscribe(res => expect(res).toEqual([ testDirections ]));
    });
  });

  describe('getSuppliers', () => {
    it('should return all possible suppliers from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testSuppliers ]) as any
      );

      const files = filesService.getSuppliers();
      files.subscribe(res => expect(res).toEqual([ testSuppliers ]));
    });
  });

  describe('getRegions', () => {
    it('should return all possible regions from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testRegions ]) as any
      );

      const files = filesService.getRegions();
      files.subscribe(res => expect(res).toEqual([ testRegions ]));
    });
  });

  describe('getCountries', () => {
    it('should return all possible countries from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testCountries ]) as any
      );

      const files = filesService.getCountries();
      files.subscribe(res => expect(res).toEqual([ testCountries ]));
    });
  });

  describe('getEntityTypes', () => {
    it('should return all possible entity types from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testEntityTypes ]) as any
      );

      const files = filesService.getEntityTypes();
      files.subscribe(res => expect(res).toEqual([ testEntityTypes ]));
    });
  });

  describe('getTimeZones', () => {
    it('should return all possible time zones from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testTimeZones ]) as any
      );

      const files = filesService.getTimeZones();
      files.subscribe(res => expect(res).toEqual([ testTimeZones ]));
    });
  });
});
