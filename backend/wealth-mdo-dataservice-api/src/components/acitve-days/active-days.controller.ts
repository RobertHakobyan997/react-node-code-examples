import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { ActiveDaysService } from './active-days.service';

@ApiTags('Active Days')
@Controller('active-days')
export class ActiveDaysController {
  constructor(private readonly service: ActiveDaysService) {
  }

  @ApiOperation({
    description: 'Get all active days',
  })
  @ApiOkResponse({
    description: 'Returns all possible active days',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported active days')
  findAll() {
    return this.service.findAll();
  }
}
