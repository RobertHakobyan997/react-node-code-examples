import { chain, find, get, isEmpty, isEqual, uniqBy } from 'lodash';
import { Directions, ScheduleStatus, Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { PaginateResult } from 'mongoose';
import { DateTime } from 'luxon';
import { ActiveScheduleTime } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import { ObjectId } from 'mongodb';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import HolidayCalendarDate from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-date';

import { fromFormat, now, scheduleTimeFormat } from '../../../core/utils/luxon';
import { DateFilterOption } from '../constants/files.const';
import { FileFilterOptions } from '../types/file-filter.interface';
import { getAllWorkDays } from '../../holiday-calendars/pure/holiday-calendars.pure';

export function getProcessingStatus(status: string) {
  if (status === Status.success) {
    return { $in: [
      Status.success,
      Status.successNoOutput,
      Status.successFileSaved
    ] };
  }

  if (status === Status.inProgress) {
    return { $in: [
      Status.inProgress,
      Status.reprocess,
      Status.resend
    ] };
  }

  return status === Status.all
    ? { $in: Object.values(Status) }
    : status;
}

export function mapFilterOptions(filterParams: FileFilterOptions) {
  return chain(filterParams)
    .omitBy(isEmpty)
    .omit('quickFilter')
    .mapKeys((_, key) => isEqual('scheduleStatus', key)
      ? `state.${key}`
      : `sourceFileData.${key}`)
    .mapValues(value => ({ $in: value }))
    .value();
}

export const createCustomDateFilter = quickFilter => ({
  'sourceFileData.uploadedDate': {
    $lte: fromFormat(quickFilter.toDate, 'yyyyy-MM-dd').endOf('day').toJSDate(),
    $gte: fromFormat(quickFilter.fromDate, 'yyyyy-MM-dd').startOf('day').toJSDate(),
  },
});

export const createDefaultDateFilter = quickFilter => ({
  'sourceFileData.uploadedDate': {
    $gte: now().minus({ [quickFilter.quickOption.units]: quickFilter.quickOption.count }).toJSDate(),
  },
});

export const getDateFilter = quickFilter => {
  if (quickFilter.quickOption.name === DateFilterOption.all) return {};

  return quickFilter.quickOption.name === DateFilterOption.custom
    ? createCustomDateFilter(quickFilter)
    : createDefaultDateFilter(quickFilter);
};

export const stickStatusToTimeBounds = (start, end, received) => {
  const isBefore = now() < start;
  const isAfter = now() > end;
  if (isBefore) return ScheduleStatus.onTime;
  return isAfter && !received
    ? ScheduleStatus.alert
    : ScheduleStatus.late;
};

export function getMasterFileIds(files: PaginateResult<Files>): ObjectId[] {
  return files.docs
    .map(doc => doc.sourceFileData.fileDirection === Directions.outbound ? doc.masterFileId : doc._id)
    .filter(id => !!id);
}

export function mapDisplayKeys(array: any, key: string) {
  return get(find(array, [ 'key', key ]), 'display', key);
}

export function mapMasterFile(doc: Files, relatedFiles: Files[]) {
  const errorFiles = relatedFiles.filter(f => f.sourceFileData.fileDirection === Directions.error);
  const nonMasterFiles = relatedFiles.filter(file =>
    file.sourceFileData.fileDirection === Directions.inbound && file.masterFileId.toString() === doc.masterFileId?.toString());
  (doc as any).relatedFileNames = nonMasterFiles.map(({ sourceFileData }) => sourceFileData?.fileName);

  const masterFileId = doc.sourceFileData.fileDirection === Directions.outbound ? doc.masterFileId : doc._id;
  const errorFile = chain(errorFiles)
    .filter(file => file.masterFileId.toString() === masterFileId.toString())
    .orderBy('createdAt', 'desc')
    .head()
    .value();
  (doc as any).errorFile = errorFile
    ? {
      id      : errorFile.mosDocumentData.documentId,
      fileName: errorFile.sourceFileData.fileName,
    }
    : {};

  return doc;
}

function mapTechnicalError(doc: Files, technicalErrors: any) {
  const technicalError = technicalErrors[doc._id.toString()];

  if (technicalError) {
    doc['technicalError'] = technicalError;
  }

  return doc;
}

export function replaceKeys(
  doc: Files,
  [ suppliers, fileTypes, fileDirections, entityTypes, regions, processingStatuses, scheduleStatuses ]: Enum[][],
) {
  doc.sourceFileData.supplier = mapDisplayKeys(suppliers, doc.sourceFileData.supplier);
  doc.sourceFileData.fileType = mapDisplayKeys(fileTypes, doc.sourceFileData.fileType);
  (doc as any).dateType = doc.sourceFileData.fileDirection === Directions.inbound ? 'Receipt' : 'Sent';
  doc.sourceFileData.fileDirection = mapDisplayKeys(fileDirections, doc.sourceFileData.fileDirection);
  doc.sourceFileData.entityType = mapDisplayKeys(entityTypes, doc.sourceFileData.entityType);
  doc.sourceFileData.region = mapDisplayKeys(regions, doc.sourceFileData.region);
  doc.state.processingStatus = mapDisplayKeys(processingStatuses, doc.state.processingStatus);
  doc.state.scheduleStatus = mapDisplayKeys(scheduleStatuses, doc.state.scheduleStatus);

  return doc;
}

export function filesMapper(docs: Files[], staticData: Enum[][], masterFiles: Files[], technicalErrors: any) {
  return docs
    .map(doc => mapMasterFile(doc, masterFiles))
    .map(doc => mapTechnicalError(doc, technicalErrors))
    .map(doc => replaceKeys(doc, staticData));
}

export function convertDayTimeToValidCalendarDate({ day, time }: ActiveScheduleTime, workingDays): DateTime {
  const utcTime: DateTime = fromFormat(time, scheduleTimeFormat);
  return DateTime.fromISO(workingDays[day - 1].holidayDate).set({ hour: utcTime.get('hour'), minute: utcTime.get('minute') });
}

export function getMonthFromWorkingDaysList([ workingDay ]) {
  return DateTime.fromISO(workingDay.holidayDate).get('month');
}

export function calculateDate(scheduleTime: ActiveScheduleTime, workingDays, isBusinessDay: boolean): DateTime {
  const calculatedMonth = getMonthFromWorkingDaysList(workingDays);
  return isBusinessDay
    ? convertDayTimeToValidCalendarDate(scheduleTime, workingDays)
    : fromFormat(scheduleTime.time, scheduleTimeFormat).set({ day: scheduleTime.day, month: calculatedMonth });
}

export function calculateStatusForTimeBoundaries(currentDate: DateTime, onTimeDate: DateTime, lateDate: DateTime, received: boolean) {
  if (currentDate < onTimeDate) return ScheduleStatus.onTime;
  if (currentDate <= lateDate && currentDate >= onTimeDate) return ScheduleStatus.late;
  return received ? ScheduleStatus.late : ScheduleStatus.alert;
}

export function calculateWorkingDays(
  { day }: ActiveScheduleTime,
  startDay: ActiveScheduleTime,
  currentDate: DateTime,
  listOfHolidays: HolidayCalendarDate[],
  isBusinessDay: boolean
) {
  const previousMonthDate = currentDate.minus({ month: 1 });
  const nextMonthDate = currentDate.plus({ month: 1 });

  const workDaysInTheCurrentMonth = getAllWorkDays(false, currentDate, listOfHolidays, 'month');
  const workDaysInThePreviousMonth = getAllWorkDays(false, previousMonthDate, listOfHolidays, 'month');
  const workDaysInTheNextMonth = getAllWorkDays(false, nextMonthDate, listOfHolidays, 'month');

  const startDateTime: DateTime = calculateDate(startDay, workDaysInTheCurrentMonth, isBusinessDay);

  return day <= startDay.day
    ? workDaysInTheNextMonth
    : currentDate >= startDateTime
      ? workDaysInTheCurrentMonth
      : workDaysInThePreviousMonth;
}

export const getLastProcessedFiles = (files: Files[]) => {
  const filteredFiles = files.filter(({ state }) =>
    state.processingStatus === Status.finishedWithErrors || state.processingStatus === Status.success);
  return uniqBy(filteredFiles, ({ filesMetadataId }) => filesMetadataId.toString());
};

export const getFilesSortingIteratee = (field: string) => {
  // TODO: (move to constants if needed)
  const fieldsToSkipSorting = [
    'masterFileName',
  ];
  return fieldsToSkipSorting.includes(field) ? '' : field;
};

