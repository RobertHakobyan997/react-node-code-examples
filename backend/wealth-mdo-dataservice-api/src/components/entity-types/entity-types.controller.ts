import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { EntityTypesService } from './entity-types.service';

@ApiTags('Entity Types')
@Controller('entity-types')
export class EntityTypesController {
  constructor(private readonly service: EntityTypesService) {
  }

  @ApiOperation({
    description: 'Get all entity types',
  })
  @ApiOkResponse({
    description: 'Returns all entity types',
    type       : [ Enum ],
  })
  @Get()
  @Log('Get supported entity types')
  findAll() {
    return this.service.findAll();
  }
}
