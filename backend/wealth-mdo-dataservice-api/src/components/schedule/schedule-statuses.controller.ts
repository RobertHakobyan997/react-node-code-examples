import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { ScheduleStatusesService } from './schedule-statuses.service';

@ApiTags('Schedule statuses')
@Controller('schedule-statuses')
export class ScheduleStatusesController {
  constructor(private readonly service: ScheduleStatusesService) {
  }

  @ApiOperation({
    description: 'Get all schedule statuses',
  })
  @ApiOkResponse({
    description: 'Get all schedule statuses',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported timing statuses')
  findAll() {
    return this.service.findAll();
  }
}
