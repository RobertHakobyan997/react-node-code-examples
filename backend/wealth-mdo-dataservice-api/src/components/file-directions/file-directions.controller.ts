import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { FileDirectionsService } from './file-directions.service';

@Controller('file-directions')
export class FileDirectionsController {
  constructor(private readonly service: FileDirectionsService) {
  }

  @ApiOkResponse({
    description: 'Returns all file directions',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported files directions')
  findAll() {
    return this.service.findAll();
  }
}
