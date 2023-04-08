import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DataAccessAuthGuard } from '../../core/guards/data-access.guard';
import { ReadOnlyGuard } from '../../core/guards/read-only.guard';

import { CronJobsService } from './cron-jobs.service';

@Controller('cron-jobs')
@ApiTags('Cron Jobs')
@UseGuards(DataAccessAuthGuard)
export class CronJobsController {
  constructor(
    private readonly cronJobService: CronJobsService
  ){}

  @Post('check-outdated-calendar')
  @UseGuards(ReadOnlyGuard)
  checkOutdatedCalendar() {
    this.cronJobService.checkOutdatedCalendar();
  }
}
