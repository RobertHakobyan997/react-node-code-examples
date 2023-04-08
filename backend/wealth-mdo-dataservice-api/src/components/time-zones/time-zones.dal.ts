import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';
import TimeZonesModel, { TimeZonesToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/time-zones';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

@Injectable()
export class TimeZonesDal {

  constructor(@Inject(TimeZonesToken) private readonly model: Model<Document<TimeZones>>) {
  }

  findAll(filter: FilterQuery<Document<TimeZones>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<TimeZones>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(TimeZonesModel, docs));
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<TimeZones>) {
    return this.model.findByIdAndUpdate(id, plainToClass(TimeZonesModel, docs));
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
