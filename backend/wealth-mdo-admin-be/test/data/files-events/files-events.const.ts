import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { ScheduleHistory } from '../../../src/types/files-events.types';

export const testScheduleHistoryRequest: ScheduleHistory = {
  field: 'createdAt',
  fileMetadataId: '',
  fromDate: '2022-01-31',
  limit: 50,
  offset: 0,
  sortOrder: 'desc',
  statuses: [ ScheduleStatus.alert ],
  toDate: '2022-02-31',
  timeZone: 'UTC'
};
