import { Injectable } from '@nestjs/common';
import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { FilterQuery } from 'mongoose';

import { ScheduleStatusesService } from '../schedule/schedule-statuses.service';
import { TimeZonesService } from '../time-zones/time-zones.service';

import { EventsDal } from './events.dal';
import { PartialEvents, PartialScheduleHistoryRequest } from './events.controller';
import { createScheduleHistoryFilter, mapScheduleHistory } from './pure/events.pure';
import { ScheduleHistoryRequest } from './types/get-schedule-history-request';
import { ScheduleHistoryDoc, ScheduleHistoryResponse } from './types/get-schedule-history-response';

@Injectable()
export class EventsService {
  constructor(
    private readonly dal: EventsDal,
    private readonly scheduleStatusesService: ScheduleStatusesService,
    private readonly timeZonesService: TimeZonesService) {
  }

  findAll(filter, sort) {
    return this.dal.findAll(filter, sort);
  }

  findById(id: string) {
    return this.dal.findById(id);
  }

  findMostRecent(filter) {
    return this.dal.findOne(filter, { createdAt: -1 });
  }

  async update(id: string, event: PartialEvents) {
    return this.dal.updateOne(id, event);
  }

  create(body: Events[]) {
    return this.dal.insert(body);
  }

  paginate(filter: FilterQuery<Document<Events>> = {}, options: any = {}) {
    return this.dal.paginate(filter, options);
  }

  // TODO think of handling timeZone in one place (reduce number of places where it is handled)
  async getScheduleHistory(
    { fileMetadataId, field, sortOrder, limit = 50, offset = 0, statuses, timeZone, fromDate = '', toDate = '' }: ScheduleHistoryRequest
  ): Promise<ScheduleHistoryResponse> {
    const filter = createScheduleHistoryFilter(fileMetadataId, fromDate, toDate, timeZone);

    const order = sortOrder === 'asc' ? 1 : -1;
    const [ paginatedEvents ] = await this.dal.aggregatePaginate(filter, offset, limit, field, order, statuses, timeZone);
    const scheduleStatuses = await this.scheduleStatusesService.findAll({}, {}, { lean: true });
    const fullTimeZone = await this.timeZonesService.findOne({ key: timeZone });

    return {
      totalDocs: paginatedEvents.totalDocs ?? 0,
      docs     : paginatedEvents.docs.map(doc => mapScheduleHistory(doc, scheduleStatuses, timeZone, fullTimeZone?.display))
    };
  }

  // TODO think of handling timeZone in one place (reduce number of places where it is handled)
  async getScheduleHistoryForExport(
    { fileMetadataId, field, sortOrder, statuses, timeZone, fromDate='', toDate='' }: PartialScheduleHistoryRequest
  ): Promise<ScheduleHistoryDoc[]> {
    const filter = createScheduleHistoryFilter(fileMetadataId, fromDate, toDate, timeZone);

    const order = sortOrder === 'asc' ? 1 : -1;
    const paginatedEvents = await this.dal.aggregateScheduleEventsForExport(filter, field, order, statuses, timeZone);
    const scheduleStatuses = await this.scheduleStatusesService.findAll({}, {}, { lean: true });
    const fullTimeZone = await this.timeZonesService.findOne({ key: timeZone });

    return  paginatedEvents.map(doc => mapScheduleHistory(doc, scheduleStatuses, timeZone, fullTimeZone?.display));
  }
}
