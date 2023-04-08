import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import appConfig from './config/app.config';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Returns app name and version',
  })
  getInfo(): string {
    return `${appConfig().name}: ${appConfig().version}`;
  }
}
