import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { FileDirectionsDal } from './file-directions.dal';

@Injectable()
export class FileDirectionsService {
  constructor(private readonly dal: FileDirectionsDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
