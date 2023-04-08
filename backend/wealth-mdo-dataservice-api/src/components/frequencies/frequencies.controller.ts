import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Frequencies from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/frequencies';

import { FrequenciesService } from './frequencies.service';

@ApiTags('Frequencies')
@Controller('frequencies')
export class FrequenciesController {
  constructor(private readonly service: FrequenciesService) {
  }

  @ApiOperation({
    description: 'Get all frequencies',
  })
  @ApiOkResponse({
    description: 'Returns all possible frequencies',
    type       : [ Frequencies ],
  })
  @Get()
  @Log('Get supported frequencies')
  findAll() {
    return this.service.findAll();
  }
}
