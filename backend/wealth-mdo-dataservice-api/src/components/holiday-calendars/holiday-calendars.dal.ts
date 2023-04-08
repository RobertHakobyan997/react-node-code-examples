import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, PaginateModel, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import HolidayCalendarsModel, { HolidayCalendarsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/holiday-calendars';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class HolidayCalendarsDal {
  private readonly logger = new Logger(HolidayCalendarsDal.name);

  constructor(@Inject(HolidayCalendarsModelToken) private readonly model: PaginateModel<Document<HolidayCalendars>>) {
  }

  findAll(filter: FilterQuery<Document<HolidayCalendars>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<HolidayCalendars>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(HolidayCalendarsModel, docs));
  }

  async updateOne(_id: any, docs: UpdateQuery<HolidayCalendars>) {
    const prev = await this.findById(_id, {}, { lean: true });
    const updated = mergeMemo(prev, docs);
    await this.model.updateOne({ _id }, plainToClass(HolidayCalendarsModel, updated));
    return updated;
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }

  paginate(filter: FilterQuery<Document<HolidayCalendars>> = {}, options: any = {}) {
    return this.model.paginate(filter, options);
  }

  async patchOne(id: string, filter: FilterQuery<Document<HolidayCalendars>> = {}, doc: UpdateQuery<HolidayCalendars>) {
    await this.model.updateOne(filter, doc);
    return this.model.findById(id);
  }
}
