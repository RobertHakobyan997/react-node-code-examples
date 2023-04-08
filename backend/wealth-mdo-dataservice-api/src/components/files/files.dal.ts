import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FilterQuery, PaginateModel, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import FilesModel, { FilesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class FilesDal {
  private readonly logger = new Logger(FilesDal.name);

  constructor(@Inject(FilesModelToken) private readonly model: PaginateModel<Document<Files>>) {
  }

  findAll(filter: FilterQuery<Document<Files>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Files>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .findOne(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any | any[]) {
    return this.model.insertMany(plainToClass(FilesModel, docs));
  }

  insertOne(docs: Files) {
    // TODO HOTFIX, make it better
    const file = plainToClass(FilesModel, docs) as Document<Files>;
    return this.model.create(file);
  }

  async updateOneOrFail(id: any, docs: UpdateQuery<Files>) {
    const prev = await this.findById(id, { _id: 0 }, { lean: true });
    if (!prev) throw new BadRequestException();

    const updated = mergeMemo(prev, docs);
    await this.updateOne(id, updated);
    return updated;
  }

  updateOne(_id: any, docs: UpdateQuery<Files>) {
    return this.model.updateOne({ _id }, docs);
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }

  paginate(filter: FilterQuery<Document<Files>> = {}, options: any = {}) {
    return this.model.paginate(filter, options);
  }
}
