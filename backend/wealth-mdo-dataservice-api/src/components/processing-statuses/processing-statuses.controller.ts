import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { ProcessingStatusesService } from './processing-statuses.service';

@ApiTags('Processing Statuses')
@Controller('processing-statuses')
export class ProcessingStatusesController {
  constructor(private readonly service: ProcessingStatusesService) {
  }

  @ApiOperation({
    description: 'Get all processing statuses',
  })
  @ApiOkResponse({
    description: 'Returns all processing statuses',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported processing statuses')
  findAll() {
    return this.service.findAll();
  }
}
