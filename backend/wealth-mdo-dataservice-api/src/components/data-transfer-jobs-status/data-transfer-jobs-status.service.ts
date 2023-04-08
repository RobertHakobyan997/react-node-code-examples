import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';
import { defaultDate } from '../../core/utils/luxon';

import { DataTransferJobsStatusDal } from './data-transfer-jobs-status.dal';

@Injectable()
export class DataTransferJobsStatusService {
  constructor(private readonly dal: DataTransferJobsStatusDal) {
  }

  findAll(filter: FilterQuery<Document<DataTransferJobsStatus>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  findById(id: string) {
    return this.dal.findById(id);
  }

  getJobMetadataStatuses(jobMetaDataId: string) {
    return jobMetaDataId && ObjectId.isValid(jobMetaDataId)
      ? this.dal.findOne({ jobMetaDataId: ObjectId.createFromHexString(jobMetaDataId) }, {}, { lean: true })
      : undefined;
  }

  async update(id: string, status: Partial<DataTransferJobsStatus>) {
    const dataTransferJobsStatus = await this.findById(id);
    if (!dataTransferJobsStatus) throw new BadRequestException();

    return this.updateExistingStatus(status, dataTransferJobsStatus);
  }

  // TODO: refactor this - jpb metadata id mutates if not set in status before
  async updateJobMetadataStatuses(id: string, status: Partial<DataTransferJobsStatus>) {
    const statusWithId = {
      jobMetaDataId: id,
      state        : {
        processingStatus         : status.state.processingStatus ?? '',
        errorMessage             : status.state.errorMessage ?? '',
        lastSuccessfulProcessTime: status.state.lastSuccessfulProcessTime ?? defaultDate(),
        lastRunTime              : status.state.lastRunTime ?? defaultDate(),
        totalSuccessCount        : status.state.totalSuccessCount ?? 0,
      },
    } as unknown as DataTransferJobsStatus;
    const dataTransferJobsStatus = await this.getJobMetadataStatuses(id);
    if (!dataTransferJobsStatus) {
      return this.create([ statusWithId ]);
    }

    return this.updateExistingStatus(statusWithId, dataTransferJobsStatus);
  }

  async updateExistingStatus(target: Partial<DataTransferJobsStatus>, source: DataTransferJobsStatus) {
    const updatedStatus = mergeMemo(JSON.parse(JSON.stringify(source)), JSON.parse(JSON.stringify(target)));
    await this.dal.update(updatedStatus, { _id: source._id });
    return updatedStatus;
  }

  create(body: DataTransferJobsStatus[]) {
    return this.dal.insert(body);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }
}
