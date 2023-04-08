import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import DataTransferJobsMetadataModel, { DataTransferJobsMetadataModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-metadata';
import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

import { PartialDataTransferJobsMetadata } from './data-transfer-jobs-metadata.controller';

@Injectable()
export class DataTransferJobsMetadataDal {
  private readonly logger = new Logger(DataTransferJobsMetadataDal.name);

  constructor(@Inject(DataTransferJobsMetadataModelToken) private readonly model: Model<Document<DataTransferJobsMetadata>>) {
  }

  findAll(filter: FilterQuery<Document<DataTransferJobsMetadata>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<DataTransferJobsMetadata>> = {}, projection: any = {}, options: any = {}) {
    return this.model.findOne(filter, projection, options).exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(DataTransferJobsMetadataModel, docs));
  }

  async updateOne(_id: any, docs: UpdateQuery<PartialDataTransferJobsMetadata>) {
    const prev = await this.findById(_id, { _id: 0 }, { lean: true });
    const updated = mergeMemo(prev, docs);
    await this.model.updateOne({ _id: ObjectId.createFromHexString(_id) }, updated);
    return updated;
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
