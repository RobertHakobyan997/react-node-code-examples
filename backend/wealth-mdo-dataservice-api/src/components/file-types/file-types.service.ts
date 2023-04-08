import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { FileTypesDal } from './file-types.dal';

@Injectable()
export class FileTypesService {
  constructor(private readonly dal: FileTypesDal) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
