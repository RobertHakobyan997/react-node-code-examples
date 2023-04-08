import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Directions } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

import { StaticDataDto, StaticDataInterface } from '../../types/static-data.types';

import { StaticDataService } from './static-data.service';

@ApiTags('Static Data')
@Controller('static-data')
export class StaticDataController {
  constructor(private readonly staticDataService: StaticDataService) {
  }

  @ApiOperation({
    description: 'Get list of possible schedule statuses',
  })
  @ApiOkResponse({
    description: 'Return schedule statuses',
    type: [ StaticDataDto ]
  })
  @Get('schedule-statuses')
  getFiles(): Observable<StaticDataInterface[]> {
    return this.staticDataService.getScheduleStatuses();
  }

  @ApiOperation({
    description: 'Get list of possible file statuses',
  })
  @ApiOkResponse({
    description: 'Return processing statuses',
    type: [ Enum ]
  })
  @Get('processing-statuses')
  getFileStatuses(): Observable<Enum[]> {
    return this.staticDataService.getProcessingStatuses();
  }

  @ApiOperation({
    description: 'Get list of possible file types',
  })
  @ApiOkResponse({
    description: 'Return file types',
    type: [ Enum ]
  })
  @Get('file-types')
  getFileTypes(): Observable<Enum[]> {
    return this.staticDataService.getFileTypes();
  }

  @ApiOperation({
    description: 'Get list of locations',
  })
  @ApiOkResponse({
    description: 'Return locations',
    type: [ Enum ]
  })
  @Get('locations')
  getFileLocations(): Observable<Enum[]> {
    return this.staticDataService.getLocations();
  }

  @ApiOperation({
    description: 'Get list of directions',
  })
  @ApiOkResponse({
    description: 'Return directions',
    type: [ String ]
  })
  @Get('file-directions')
  getFileDirections(): Observable<Directions[]> {
    return this.staticDataService.getDirections();
  }

  @ApiOperation({
    description: 'Get list of suppliers',
  })
  @ApiOkResponse({
    description: 'Return suppliers',
    type: [ Suppliers ]
  })
  @Get('suppliers')
  getSuppliers(): Observable<Suppliers[]> {
    return this.staticDataService.getSuppliers();
  }

  @ApiOperation({
    description: 'Get list of regions',
  })
  @ApiOkResponse({
    description: 'Return regions',
    type: [ Enum ]
  })
  @Get('regions')
  getRegions(): Observable<Enum[]> {
    return this.staticDataService.getRegions();
  }

  @ApiOperation({
    description: 'Get list of countries',
  })
  @ApiOkResponse({
    description: 'Return countries',
    type: [ Countries ]
  })
  @Get('countries')
  getCountries(): Observable<Countries[]> {
    return this.staticDataService.getCountries();
  }

  @ApiOperation({
    description: 'Get list of entity types',
  })
  @ApiOkResponse({
    description: 'Return all possible entity types',
    type: [ Enum ]
  })
  @Get('entity-types')
  getEntityTypes(): Observable<Enum[]> {
    return this.staticDataService.getEntityTypes();
  }

  @ApiOperation({
    description: 'Get list of time zones',
  })
  @ApiOkResponse({
    description: 'Return all possible time zones',
    type: [ TimeZones ]
  })
  @Get('time-zones')
  getTimeZones(): Observable<TimeZones[]> {
    return this.staticDataService.getTimeZones();
  }
}
