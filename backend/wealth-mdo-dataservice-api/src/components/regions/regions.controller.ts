import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { RegionsService } from './regions.service';

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly service: RegionsService) {
  }

  @ApiOperation({
    description: 'Get all regions',
  })
  @ApiOkResponse({
    description: 'Returns all regions',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported regions')
  findAll() {
    return this.service.findAll();
  }
}
