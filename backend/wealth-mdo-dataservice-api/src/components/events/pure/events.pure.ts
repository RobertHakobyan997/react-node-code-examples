import { chain, isNil } from 'lodash';
import { EventChannel, EventSource, ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { ObjectId } from 'mongodb';
import { DateTime } from 'luxon';

const dateMask = 'yyyy-MM-dd';

export const mapDisplayKeys = (array: Enum[], key: string) => chain(array)
  .find([ 'key', key ])
  .get('display', key)
  .value();

export const mapFileReceived = (doc: any) => {
  if (isNil(doc.data?.fileReceived)) {
    // for old events which does not contain fileReceived
    return doc.topic === ScheduleStatus.alert ? 'No' : 'Yes';
  } else {
    return doc.data.fileReceived ? 'Yes' : 'No';
  }
};

const formatScheduleDate = (date: DateTime, format: string,  timeZone: string) => {
  const formattedDate = date.toFormat(format);
  return `${formattedDate} (${timeZone})`;
};

export const mapScheduleHistory = (
  doc: { createdAt: Date; data: any; topic: string },
  scheduleStatuses: Enum[],
  timeZone: string,
  timeZoneName = 'Unknown time zone'
) => {
  const createdDate = DateTime.fromJSDate(doc.createdAt).setZone(timeZone);
  const expectedDate = doc.data?.expectedDate ? DateTime.fromISO(doc.data?.expectedDate).setZone(timeZone) : null;
  return {
    date        : formatScheduleDate(createdDate, dateMask, timeZoneName),
    time        : formatScheduleDate(createdDate, 'HH:mm:ss', timeZoneName),
    fileReceived: mapFileReceived(doc),
    fileStatus  : mapDisplayKeys(scheduleStatuses, doc.topic),
    expectedDate: expectedDate ? formatScheduleDate(expectedDate, 'yyyy-MM-dd HH:mm:ss', timeZoneName) : ''
  };
};

export const createDateFilter = (fromDate?: string , toDate?: string, zone = 'UTC') => {
  const dateFormat = 'yyyyy-MM-dd';

  const fromDateFilter = fromDate
    ? { $gte: DateTime.fromFormat(fromDate, dateFormat, { zone }).startOf('day').toJSDate() }
    : {};
  const toDateFilter = toDate
    ? { $lte: DateTime.fromFormat(toDate, dateFormat, { zone }).endOf('day').toJSDate() }
    : {};
  return fromDate || toDate ? {
    createdAt: {
      ...fromDateFilter,
      ...toDateFilter,
    },
  } : {};
};

export const createScheduleHistoryFilter = (fileMetadataId, fromDate, toDate, timezone) => ({
  collectionId: {  $in: [ new ObjectId(fileMetadataId), fileMetadataId ] }, // old records are stored with string, new - with oid
  source      : EventSource.Camunda,
  channel     : EventChannel.FileScheduleStatus,
  topic       : { $in: [
    ScheduleStatus.alert,
    ScheduleStatus.late,
    ScheduleStatus.onTime,
    ScheduleStatus.onSchedule
  ] },
  ...createDateFilter(fromDate, toDate, timezone)
});
