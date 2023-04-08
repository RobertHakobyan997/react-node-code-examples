import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

import { TimeZonesService } from './time-zones.service';

@ApiTags('Time Zones')
@Controller('time-zones')
export class TimeZonesController {
  constructor(private readonly service: TimeZonesService) {
  }

  @ApiOperation({
    description: 'Get all time zones',
  })
  @ApiOkResponse({
    description: 'Returns all possible time zones',
    type       : [ TimeZones ],
  })
  @Get()
  @Log('Get supported time zones')
  findAll() {
    return this.service.findAll();
  }
}
