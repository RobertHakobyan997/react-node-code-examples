import { ObjectId } from 'mongodb';
import { EventChannel, ScheduleStatus, EventSource } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { testEventRaw } from './test-events.const';

export const testEvent = {
  ...testEventRaw,
  createdAt: new Date(2021, 1, 1),
  data     : {},
  topic    : ScheduleStatus.onTime,
  source   : EventSource.Camunda,
  channel  : EventChannel.FileScheduleStatus,
};

export const scheduleStatus = {
  _id    : new ObjectId('608ba9cbc1656e7b68ab3eec'),
  key    : 'onTime',
  display: 'On Time',
  order  : 3,
  hidden : false,
};

export const scheduleStatuses = [ scheduleStatus ];

export const testScheduleHistoryRequest = {
  field         : 'createdAt',
  fileMetadataId: '609d455d3413c47110d7f91f',
  fromDate      : '2022-01-31',
  limit         : 50,
  offset        : 0,
  sortOrder     : 'asc',
  statuses      : [ ScheduleStatus.alert ],
  timeZone      : 'UTC',
  toDate        : '2022-02-31'
};
