import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';

import { ScheduleDaysOfTheWeek } from '../../../src/components/files-metadata/enums/schedule-day-of-the-week.enum';

function scheduleDay(
  [ onScheduleDay = 0, onTimeDay = 0, lateDay = 0, startDay = 0 ]: number[],
  [ onScheduleTime = '00:00', onTimeTime = '00:00', lateTime = '00:00' ]: string[],
  scheduleDay?: Partial<ScheduleDay>
) {
  return  {
    isBusinessDay  : true,
    dayOfTheWeek   : ScheduleDaysOfTheWeek.AllWorkDays,
    startTime      : '00:00',
    endTime        : '23:59',
    endOfOnSchedule: {
      day : onScheduleDay,
      time: onScheduleTime
    },
    endOfOnTime: {
      day : onTimeDay,
      time: onTimeTime
    },
    endOfLate: {
      day : lateDay,
      time: lateTime
    },
    startDay,
    ...scheduleDay
  } as ScheduleDay;
}

const notBusinessWeekly = { isBusinessDay: false, dayOfTheWeek: 'Wednesday' };
const notBusiness = { isBusinessDay: false };

export const dailySchedule = scheduleDay([], [], { isBusinessDay: false });
export const australianSchedule = scheduleDay([ 2, 2, 2 ], [ '08:00', '09:00', '18:00' ], notBusiness);
export const australianBusinessSchedule = scheduleDay([ 2, 5, 20, 2 ], [ '05:00', '06:00', '09:59' ]);
export const scheduleOfNextPeriodInCurrentMonth = scheduleDay([ 3, 4, 4, 3 ], []);
export const scheduleOfNextPeriodInCurrentWeek = scheduleDay([ 3, 4, 4, 3 ], [], notBusinessWeekly);
export const scheduleWithEndOfOnTimeFromNextMonth = scheduleDay([ 3, 1, 1, 3 ], []);
export const scheduleStartsFirstNonBusinessDay = scheduleDay([ 1, 28, 28, 1 ], [], notBusiness);
export const scheduleStartsFirstBusinessDay = scheduleDay([ 1, 28, 28, 1 ], [ '08:00', '22:00', '22:15' ]);
