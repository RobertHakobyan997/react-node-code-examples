import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { ScheduleStatusesDal } from './schedule-statuses.dal';

@Injectable()
export class ScheduleStatusesService {
  constructor(private readonly dal: ScheduleStatusesDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
