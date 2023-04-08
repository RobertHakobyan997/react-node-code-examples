import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { CountriesDal } from './countries.dal';

@Injectable()
export class CountriesService {
  constructor(private readonly dal: CountriesDal) {
  }

  findAll(filter: FilterQuery<Document<Countries>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
