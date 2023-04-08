import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiProduces, ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';

import appConfig from '../../config/app.config';
import devConfig from '../../config/dev.config';
import loggerConfig from '../../config/logger.config';
import { DevGuard } from '../../core/guards/dev.guard';
import { MIME_TYPES } from '../../constants';

@Controller('dev')
@ApiTags('dev')
@UseGuards(DevGuard)
export class DevController {
  constructor(@InjectConnection() private readonly connection: Connection) {
  }

  @Get('config')
  @ApiProduces(MIME_TYPES.TEXT_PLAIN)
  getConfig() {
    return {
      app   : appConfig,
      dev   : devConfig,
      logger: loggerConfig,
    };
  }

  @Get('env')
  @ApiProduces(MIME_TYPES.TEXT_PLAIN)
  getEnv() {
    return {
      env: process.env,
    };
  }

  @Get('health-check')
  @ApiProduces(MIME_TYPES.TEXT_PLAIN)
  healthCheck() {
    const readyState = [
      'disconnected',
      'connected',
      'connecting',
      'disconnecting',
    ];
    return {
      db: readyState[this.connection.readyState],
    };
  }
}
