import faker from 'faker';
import { DateTime } from 'luxon';
import { ObjectId } from 'mongodb';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants/schedule-status.enum';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';

export function getTestSydneyMetadata(isBusinessDay: boolean, isReceived: boolean): FilesMetadata {
  const now = DateTime.utc();
  return {
    validations        : [],
    isEnabled          : true,
    _id                : new ObjectId(),
    supplier           : 'bnp',
    fileType           : 'positions',
    entityType         : 'fund',
    region             : 'international',
    fileMask           : faker.system.commonFileName('BNP_Postions_'),
    ftpPath            : faker.system.filePath(),
    ftpAccountName     : '',
    ftpOutputPath      : '',
    holidayCalendarId  : new ObjectId('609d488d3413c47110d7f91f'),
    workflowProcessName: '',
    workflowProcessKey : '',
    snaplogicTasks     : [],
    schedule           : {
      frequency   : 'ContinuousMonthly',
      timeZone    : 'Australia/Sydney',
      expectedDays: [
        {
          isBusinessDay  : isBusinessDay,
          dayOfTheWeek   : 'AllWorkDays',
          endOfOnSchedule: {
            day : 1,
            time: '05:00'
          },
          endOfOnTime: {
            day : 15,
            time: '23:00'
          },
          endOfLate: {
            day : 16,
            time: '23:55'
          },
          startDay : 1,
          startTime: '05:00',
          endTime  : '23:59'
        }
      ]
    },
    notification: [],
    state       : {
      processingStatus    : 'success',
      errorMessage        : '',
      scheduleStatus      : ScheduleStatus.late,
      lastFileUploadedTime: isReceived
        ? DateTime.fromFormat(`${now.year}-${now.month}-1 00:02`, 'yyyy-M-d HH:mm').toJSDate()
        : faker.date.past(2),
      lastPollTime: DateTime.fromFormat(`${now.year}-${now.month}-1 00:01`, 'yyyy-M-d HH:mm').toJSDate()
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  } as unknown as FilesMetadata;
}
