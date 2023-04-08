import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Frequencies from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/frequencies';

import { FrequenciesDal } from './frequencies.dal';

@Injectable()
export class FrequenciesService {
  constructor(private readonly dal: FrequenciesDal) {
  }

  findAll(filter: FilterQuery<Document<Frequencies>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
