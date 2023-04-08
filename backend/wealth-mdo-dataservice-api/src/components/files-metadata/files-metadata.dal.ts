import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import FilesMetadataModel, { FilesMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/files-metadata';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class FilesMetadataDal {
  private readonly logger = new Logger(FilesMetadataDal.name);

  constructor(@Inject(FilesMetadataModelToken) private readonly model: Model<Document<FilesMetadata>>) {
  }

  findAll(
    filter: FilterQuery<Document<FilesMetadata>> = {},
    sort: string | any = {},
    options: any = {},
    projection: any = {}) {
    return this.model
      .find(filter, projection, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<FilesMetadata>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(FilesMetadataModel, docs));
  }

  updateMany(filter: FilterQuery<Document<FilesMetadata>> = {}, doc: UpdateQuery<FilesMetadata>) {
    return this.model.updateMany(filter, doc);
  }

  async updateOne(_id: any, docs: UpdateQuery<FilesMetadata>) {
    let prev = await this.findById(_id, { _id: 0 }, { lean: true });
    prev = JSON.parse(JSON.stringify(prev)); // hack, wrong flow at all

    if (!prev) throw new BadRequestException(`File Metadata with id ${_id} does not exist in the database`);

    const updated = mergeMemo(prev, docs);
    await this.model.updateOne({ _id }, updated);
    return updated;
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<FilesMetadata>) {
    return this.model.findByIdAndUpdate(id, docs).exec();
  }

  async patchOne(id: string, filter: FilterQuery<Document<FilesMetadata>> = {}, doc: UpdateQuery<FilesMetadata>) {
    await this.model.updateOne(filter, doc);
    return this.model.findById(id);
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }

  dropCollection() {
    return this.model.collection.drop()
      .catch(_ => this.logger.log(`${this.model.collection.name} doesn't exist`));
  }
}
