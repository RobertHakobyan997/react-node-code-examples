import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

import { TimeZonesDal } from './time-zones.dal';

@Injectable()
export class TimeZonesService {
  constructor(private readonly dal: TimeZonesDal) {
  }

  findAll(filter: FilterQuery<Document<TimeZones>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  findOne(filter: FilterQuery<Document<TimeZones>> = {}) {
    return this.dal.findOne(filter);
  }
}
