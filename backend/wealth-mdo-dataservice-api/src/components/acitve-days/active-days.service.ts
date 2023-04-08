import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { ActiveDaysDal } from './active-days.dal';

@Injectable()
export class ActiveDaysService {
  constructor(private readonly dal: ActiveDaysDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
