import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import DataTransferJobsStatusModel, { DataTransferJobsStatusModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-status';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import DataTransferJobsStatusState from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status-state';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { ObjectId } from 'mongodb';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class DataTransferJobsStatusDal {
  private readonly logger = new Logger(DataTransferJobsStatusDal.name);

  constructor(@Inject(DataTransferJobsStatusModelToken) private readonly model: Model<Document<DataTransferJobsStatus>>) {
  }

  findAll(filter: FilterQuery<Document<DataTransferJobsStatus>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<DataTransferJobsStatus>> = {}, projection: any = {}, options: any = {}) {
    return this.model.findOne(filter, projection, options).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(DataTransferJobsStatusModel, docs));
  }

  async updateByJobMetaDataId(id: any, docs: UpdateQuery<DataTransferJobsStatus>, options: any = {}) {
    const prev = await this.findOne({ jobMetaDataId: new ObjectId(id) });
    const updated = mergeMemo(prev, docs);
    await this.model.findByIdAndUpdate(id, plainToClass(DataTransferJobsStatusModel, updated), options);
    return updated;
  }

  async updateOne(_id: any, docs: UpdateQuery<DataTransferJobsStatus>, options: any = {}) {
    return this.model.updateOne({ _id }, docs, options);
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<DataTransferJobsStatus>, options: any = {}) {
    return this.model.findByIdAndUpdate(id, plainToClass(DataTransferJobsStatusModel, docs), options);
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }

  update(status: UpdateQuery<DataTransferJobsStatusState>, filter: FilterQuery<Document<DataTransferJobsStatus>> = {}) {
    return this.model.updateOne(filter, plainToClass(DataTransferJobsStatusModel, status));
  }
}
