import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { ProcessingStatusesDal } from './processing-statuses.dal';

@Injectable()
export class ProcessingStatusesService {
  constructor(private readonly dal: ProcessingStatusesDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
