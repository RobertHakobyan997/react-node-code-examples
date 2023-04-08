import { from, of, pipe, zip } from 'rxjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';
import { DateTime } from 'luxon';
import { isNil } from 'lodash';
import DataTransferJobsStatusState from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status-state';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';

import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { DataTransferJobsStatusService } from '../data-transfer-jobs-status/data-transfer-jobs-status.service';

import { PartialDataTransferJobsMetadata } from './data-transfer-jobs-metadata.controller';
import { getCurrentDayBasedOnPeriodDates, getRecordWithSuppliers, shouldResetStateRepeatCount } from './pure/data-transfer-jobs-metadata.pure';
import { DataTransferJobsMetadataDal } from './data-transfer-jobs-metadata.dal';

export class DataTransferJobsMetadataAndState extends DataTransferJobsMetadata {
  state: DataTransferJobsStatusState;
}

export class ScheduleDayWithPeriodDates extends ScheduleDay {
  state: DataTransferJobsStatusState;
  periodStartDate: DateTime;
  periodEndDate: DateTime;
}

@Injectable()
export class DataTransferJobsMetadataService {
  constructor(
    private readonly dal: DataTransferJobsMetadataDal,
    private readonly holidayCalendarsService: HolidayCalendarsService,
    private readonly dtJobStatusService: DataTransferJobsStatusService,
  ) {
  }

  findAll() {
    return this.dal.findAll();
  }

  findById(id: string) {
    return this.dal.findById(id);
  }

  async updateOne(id: string, dataTransferJobsMetadata: PartialDataTransferJobsMetadata) {
    const existingMetadata = await this.dal.findById(id, {}, { lean: true });
    if (!existingMetadata) throw new BadRequestException(`Data Transfer Metadata with id ${id} does not exist in the database`);
    return this.dal.updateOne(id, dataTransferJobsMetadata);
  }

  create(body: DataTransferJobsMetadata[]) {
    return this.dal.insert(body);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }

  getJobKeys() {
    return this.getSchedule()
      .pipe(
        map(schedule => schedule.map(data => data.dataTransferJobKey).sort())
      );
  }

  getSchedule() {
    return from(this.getScheduleData())
      .pipe(getRecordWithSuppliers(), this.resetTotalSuccessCount());
  }

  resetTotalSuccessCount() {
    return pipe(
      switchMap((jobs: DataTransferJobsMetadataAndState[]) => {
        const jobsForUpdate = jobs.filter(({ state, schedule }) => {
          if (isNil(state)) {
            return false;
          }

          const currentDay = getCurrentDayBasedOnPeriodDates(schedule.expectedDays as ScheduleDayWithPeriodDates[]);
          if (!currentDay) {
            return false;
          }
          return shouldResetStateRepeatCount(state, currentDay);
        });

        const updatedStatePromises = jobsForUpdate.map(
          item =>
            this.dtJobStatusService.updateJobMetadataStatuses(item._id.toString(), { state: { ...item.state, totalSuccessCount: 0 } })
        );
        const updatedJobs = jobs.map(
          item => jobsForUpdate.some(({ _id }) => _id.equals(item._id))
            ? { ...item, state: { ...item.state, totalSuccessCount: 0 } }
            : item
        );
        return zip(of(updatedJobs), from(Promise.all(updatedStatePromises)));
      }),
      map(([ jobs ]) => jobs)
    );
  }

  getScheduleData() {
    return Promise.all([
      this.dal.findAll({ isEnabled: true }, {}, { lean: true }),
      this.holidayCalendarsService.findAll({}, {}, { lean: true }),
      this.dtJobStatusService.findAll({}, {}, { lean: true }),
    ]);
  }

  async findByJobKey(dataTransferJobKey: string) {
    const job = await this.dal.findOne({ dataTransferJobKey }, {}, { lean: true });
    if (job) {
      const status = await this.dtJobStatusService.getJobMetadataStatuses(job._id.toString());
      return status ? { ...job, state: status.state } : job;
    }

    return null;
  }
}
