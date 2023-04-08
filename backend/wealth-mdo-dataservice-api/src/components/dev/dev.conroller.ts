import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { connection } from 'mongoose';
import loggerConfig from 'ngpd-merceros-wealth-mdo-common-be/dist/config/logger.config';

import devConfig from '../../config/dev.config';
import appConfig from '../../config/app.config';
import { DevGuard } from '../../core/guards/dev.guard';

@Controller('dev')
@ApiTags('dev')
@UseGuards(DevGuard)
export class DevController {
  @Get('config')
  @ApiOkResponse({
    description: 'Returns configs',
  })
  getConfig() {
    return {
      app   : appConfig(),
      dev   : devConfig(),
      logger: loggerConfig(),
    };
  }

  @Get('env')
  @ApiOkResponse({
    description: 'Returns env',
  })
  getEnv() {
    return { env: process.env };
  }

  @Get('health-check')
  @ApiOkResponse({
    description: 'Returns health check info',
  })
  healthCheck() {
    const readyState = [
      'disconnected',
      'connected',
      'connecting',
      'disconnecting',
    ];
    return {
      db: readyState[connection.readyState],
    };
  }
}
