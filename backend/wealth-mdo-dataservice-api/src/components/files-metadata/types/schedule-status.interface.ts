import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export interface ScheduleStatuses {
  [ScheduleStatus.all]: number;
  [ScheduleStatus.alert]: number;
  [ScheduleStatus.late]: number;
  [ScheduleStatus.onTime]: number;
}
