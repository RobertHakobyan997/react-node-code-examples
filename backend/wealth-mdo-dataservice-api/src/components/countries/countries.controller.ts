import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';

import { CountriesService } from './countries.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly service: CountriesService) {
  }

  @ApiOperation({
    description: 'Get all countries',
  })
  @ApiOkResponse({
    description: 'Returns all countries',
    type       : [ Countries ],
  })
  @Get()
  @Log('Get supported countries')
  findAll() {
    return this.service.findAll();
  }
}
