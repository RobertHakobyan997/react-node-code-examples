import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { FileTypesService } from './file-types.service';

@ApiTags('File Types')
@Controller('file-types')
export class FileTypesController {
  constructor(private readonly service: FileTypesService) {
  }

  @ApiOperation({
    description: 'Get all file types',
  })
  @ApiOkResponse({
    description: 'Returns all file types',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported files types')
  findAll() {
    return this.service.findAll();
  }
}
