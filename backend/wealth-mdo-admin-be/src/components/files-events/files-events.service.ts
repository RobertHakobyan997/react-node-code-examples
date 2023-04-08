import { Injectable } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';
import { ScheduleHistory } from '../../types/files-events.types';

@Injectable()
export class FilesEventsService {
  constructor(
    private readonly request: RequestService
  ) {}

  getScheduleHistory(body: ScheduleHistory) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/events/schedule-history`;
    return this.request.post(url, body);
  }

  getScheduleHistoryForExport(body: Partial<ScheduleHistory>) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/events/schedule-history/export`;
    return this.request.post(url, body);
  }
}
