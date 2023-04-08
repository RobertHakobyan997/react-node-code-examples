import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, PaginateModel, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import EventsModel, { EventsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

import { scheduleHistoryAggregationSteps, scheduleHistoryLimitAggregationSteps } from './aggregations/schedule-history';

@Injectable()
export class EventsDal {
  private readonly logger = new Logger(EventsDal.name);

  constructor(@Inject(EventsModelToken) private readonly model: PaginateModel<Document<Events>>) {
  }

  findAll(filter: FilterQuery<Document<Events>> = {}, sort: string | any = {}) {
    return this.model
      .find(filter)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Events>> = {}, sort: string | any = {}) {
    return this.model
      .findOne(filter)
      .sort(sort)
      .exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(EventsModel, docs));
  }

  async updateOne(id: any, docs: UpdateQuery<Document<Events>>) {
    const prev = this.findById(id, { _id: 0 }, { lean: true });
    const updated = mergeMemo(prev, docs);
    await this.model.updateOne(id, plainToClass(EventsModel, docs));
    return updated;
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }

  paginate(filter: FilterQuery<Document<Events>> = {}, options: any = {}) {
    return this.model.paginate(filter, options);
  }

  async aggregatePaginate(
    filter: any,
    skip: number,
    limit: number,
    field: string,
    sortOrder: number,
    statuses: string[],
    timeZone: string
  ): Promise<Array<{ totalDocs: number; docs: Array<Document<Events>> }>> {
    return this.model.aggregate([
      ...scheduleHistoryAggregationSteps(filter, field, sortOrder, statuses, timeZone),
      ...scheduleHistoryLimitAggregationSteps(skip, limit)
    ]).allowDiskUse(true).exec();
  }

  async aggregateScheduleEventsForExport(
    filter: any,
    field: string,
    sortOrder: number,
    statuses: string[],
    timeZone: string
  ): Promise<Array<Document<Events>>> {
    return this.model.aggregate(scheduleHistoryAggregationSteps(filter, field, sortOrder, statuses, timeZone))
      .allowDiskUse(true).exec();
  }
}
