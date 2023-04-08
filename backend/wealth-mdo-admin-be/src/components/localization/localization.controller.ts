import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { LocalizationService } from './localization.service';

@ApiTags('Localization')
@Controller('localization')
export class LocalizationController {
  constructor(private readonly service: LocalizationService) {}

  @ApiOkResponse({
    description: 'Get localizations',
  })
  @Get()
  getLocalizations() {
    return this.service.getLocalizations();
  }
}
