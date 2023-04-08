import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { UserSettings } from '../../types/user-settings.class';

import { UserSettingsService } from './user-settings.service';

@ApiTags('User Settings')
@Controller('user-settings')
@UseGuards(AuthGuard())
export class UserSettingsController {
  constructor(private readonly service: UserSettingsService) { }

  @ApiOperation({ description: 'Get user settings' })
  @ApiOkResponse({
    description: 'Returns quick filters for current user',
    type: UserSettings
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @Log('Get user settings')
  getUserSettings() {
    return this.service.getUserSettings();
  }
}
