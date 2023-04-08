import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';

import { SuppliersService } from './suppliers.service';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly service: SuppliersService) {
  }

  @ApiOkResponse({
    description: 'Returns all suppliers',
    type       : [ Suppliers ],
  })
  @Get()
  @Log('Get supported suppliers')
  findAll() {
    return this.service.findAll();
  }
}
