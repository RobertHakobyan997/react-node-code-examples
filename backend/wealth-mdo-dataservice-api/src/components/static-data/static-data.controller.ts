import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { missingFileNotificationResponseExample } from './examples/missing-file-notification-response-example';
import { validationNotificationResponseExample } from './examples/validation-notification-response-example';
import { StaticDataService } from './static-data.service';

@ApiTags('Static data')
@Controller('static-data')
export class StaticDataController {
  constructor(private readonly service: StaticDataService) {}

  @ApiOperation({
    description: 'Get static data for validation notification',
    operationId: 'GetStaticDataForValidationNotification'
  })
  @ApiOkResponse({
    description: 'Static data for validation notification',
    schema     : {
      example: validationNotificationResponseExample
    }
  })
  @Get('/validation-notification')
  @Log('Get static data for validation notification')
  findStaticDataForValidation() {
    return this.service.findStaticDataForValidation();
  }

  @ApiOperation({
    description: 'Get static data for missing file notification',
    operationId: 'GetStaticDataForMissingFileNotification'
  })
  @ApiOkResponse({
    description: 'Static data for missing file notification',
    schema     : {
      example: missingFileNotificationResponseExample
    }
  })
  @Get('/missing-file-notification')
  @Log('Get static data for missing file notification')
  findStaticDataForMissingFile() {
    return this.service.findStaticDataForMissingFile();
  }
}
