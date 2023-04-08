import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { EntityTypesDal } from './entity-types.dal';

@Injectable()
export class EntityTypesService {
  constructor(private readonly dal: EntityTypesDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
