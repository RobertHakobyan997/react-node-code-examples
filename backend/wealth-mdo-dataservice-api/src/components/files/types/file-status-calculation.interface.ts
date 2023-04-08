import { ActiveScheduleTime } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';

export interface FileStatusCalculation {
  frequency: string;
  startDay: ActiveScheduleTime;
  endOfOnTime: ActiveScheduleTime;
  endOfLate: ActiveScheduleTime;
  received: boolean;
  isBusinessDay: boolean;
  holidayCalendarId: string;
}

