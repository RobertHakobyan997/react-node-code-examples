import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { ScheduleHistory } from '../../types/files-events.types';
import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { FilesEventsService } from './files-events.service';

@ApiTags('files-events')
@Controller('files-events')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.viewScheduleHistory)
export class FilesEventsController {
  constructor(
    private readonly service: FilesEventsService
  ) {}

  @ApiOperation({
    description: 'Get schedule history'
  })
  @Post('schedule-history')
  getScheduleHistory(
    @Body() body: ScheduleHistory
  ) {
    return this.service.getScheduleHistory(body);
  }

  @ApiOperation({
    description: 'Get schedule history for export to csv'
  })
  @Post('schedule-history/export')
  getScheduleHistoryForExport(
    @Body() body: Omit<ScheduleHistory, 'offset' | 'limit'>
  ) {
    return this.service.getScheduleHistoryForExport(body);
  }
}
