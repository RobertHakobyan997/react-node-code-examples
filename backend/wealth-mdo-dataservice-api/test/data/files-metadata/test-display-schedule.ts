import { DateTime } from 'luxon';
import { ActiveSchedule } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { ScheduleDaysOfTheWeek } from '../../../src/components/files-metadata/enums/schedule-day-of-the-week.enum';

function getBusinessScheduleDisplay(isBusiness: boolean = true): ActiveSchedule {
  return {
    frequency         : Frequency.ContinuousMonthly,
    isBusinessDay     : isBusiness,
    startDay          : 18,
    dayOfTheWeek      : ScheduleDaysOfTheWeek.AllWorkDays,
    startTime         : '00:00',
    endTime           : '00:00',
    endOfOnSchedule   : { time: '00:00' },
    endOfOnTime       : { time: '00:00' },
    endOfLate         : { time: '00:00' },
    timeZone          : 'UTC',
    nextFileExpectedOn: DateTime.now(),
  };
}

export const notBusinessScheduleDisplay = getBusinessScheduleDisplay(false);
export const businessScheduleDisplay = getBusinessScheduleDisplay();
