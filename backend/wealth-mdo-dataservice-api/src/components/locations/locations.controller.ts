import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { LocationsService } from './locations.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {
  }

  @ApiOperation({
    description: 'Get all locations',
  })
  @ApiOkResponse({
    description: 'Returns all locations',
    type       : [ Enum ],
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
