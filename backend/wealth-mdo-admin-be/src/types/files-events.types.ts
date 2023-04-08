import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export interface ScheduleHistory {
  fileMetadataId: string;
  field: string;
  sortOrder: string;
  limit: number;
  offset: number;
  statuses: ScheduleStatus[];
  timeZone: string;
  fromDate?: string;
  toDate?: string;
}
