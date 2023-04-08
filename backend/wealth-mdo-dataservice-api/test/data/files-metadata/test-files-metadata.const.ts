import * as faker from 'faker';
import { Frequency, ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ObjectId } from 'mongodb';
import Schedule from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import { ActiveSchedule } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';

import { allWorkDays, now } from '../../../src/core/utils/luxon';
import { ScheduleDaysOfTheWeek } from '../../../src/components/files-metadata/enums/schedule-day-of-the-week.enum';

import { australianBusinessSchedule, scheduleStartsFirstNonBusinessDay, scheduleStartsFirstBusinessDay } from './schedule-day.const';

export const testMetadataId = '60f97f86ad28a03090c897c9';

export function weeklySchedule(): Schedule {
  return {
    frequency   : Frequency.Weekly,
    timeZone    : 'UTC',
    expectedDays: [
      {
        // ToDo fix types, number | string
        dayOfTheWeek: now().weekdayLong as any,

        startTime  : '00:01',
        endTime    : '00:00',
        endOfOnTime: {
          time: '14:15'
        },
        endOfOnSchedule: {
          time: '14:00'
        },
        endOfLate: {
          time: '16:00'
        },
      } as ScheduleDay
    ]
  };
}

function dailySchedule(): Schedule {
  return {
    frequency   : Frequency.Daily,
    timeZone    : 'UTC',
    expectedDays: [
      {
        dayOfTheWeek: allWorkDays,
        startTime   : '00:01',
        endTime     : '00:00',
        endOfOnTime : {
          time: '14:15'
        },
        endOfOnSchedule: {
          time: '14:00'
        },
        endOfLate: {
          time: '16:00'
        },
      } as ScheduleDay
    ],
  };
}

export function monthlySchedule(frequency: Frequency, expectedDays?: Partial<ScheduleDay>): Schedule {
  return {
    frequency   : frequency,
    timeZone    : 'UTC',
    expectedDays: [
      {
        isBusinessDay: true,
        dayOfTheWeek : ScheduleDaysOfTheWeek.AllWorkDays,
        startDay     : 2,
        startTime    : '05:00',
        endTime      : '00:00',
        endOfOnTime  : {
          time: '14:15',
          day : 1
        },
        endOfOnSchedule: {
          time: '14:00',
          day : 1
        },
        endOfLate: {
          time: '16:00',
          day : 1
        },
        ...expectedDays
      } as ScheduleDay
    ],
  };
}

export function getTestFileMetadata(id: number = 0, _id?: ObjectId): FilesMetadata {
  return {
    validations        : [],
    _id                : _id ?? new ObjectId(testMetadataId),
    supplier           : id % 2 === 0 ? 'bnp' : 'mdo',
    fileType           : 'positions',
    entityType         : 'fund',
    region             : 'international',
    fileMask           : faker.system.commonFileName('BNP_Positions_'),
    ftpPath            : faker.system.filePath(),
    ftpAccountName     : '',
    ftpOutputPath      : '',
    workflowProcessName: '',
    workflowProcessKey : '',
    contacts           : [ new ObjectId() ],
    holidayCalendarId  : new ObjectId('609d488d3413c47110d7f91f'),
    snaplogicTasks     : [ {
      camundaTopicName: 'PL_MDO_Abc',
      accountName     : '',
      eaglePaceURL    : '',
      taskUrl         : ''
    } ],
    source      : 'test',
    schedule    : id % 2 ? weeklySchedule() : dailySchedule(),
    notification: [
      {
        notificationMethod: 'email',
        notificationKey   : 'email',
        notificationIds   : [ faker.internet.email() ],
        escalationLevel   : 1,
      },
      {
        notificationMethod: 'email',
        notificationKey   : 'email',
        notificationIds   : [ faker.internet.email() ],
        escalationLevel   : 2,
      },
    ],
    state: {
      processingStatus: id % 2 === 0 ? 'success' : 'failed',
      errorMessage    : id % 2 === 0 ? '' : 'Something went wrong',
      scheduleStatus  : id % 2 === 0
        ? ScheduleStatus.onTime
        : id % 3 === 0
          ? ScheduleStatus.alert
          : ScheduleStatus.late
    },
    createdAt: faker.date.past().toDateString(),
    updatedAt: faker.date.past().toDateString(),
    isEnabled: id % 2 === 0,
    isMaster : true,
  } as unknown as FilesMetadata; // ToDO fix types, no unknown!
}

export const testFileMetadataFilterQuery = {
  supplier: 'bnp'
};
export const testFileMetadata = getTestFileMetadata();
export const testFilesMetadata = new Array(10).fill(null).map((_, id) => getTestFileMetadata(id));
export const testFilesMetadataRandomId = new Array(10).fill(null).map((_, id) => getTestFileMetadata(id, new ObjectId()));

export const testFilesMonthlyMetadata = (frequency: Frequency) => ([
  { ...testFileMetadata, schedule: monthlySchedule(frequency) },
  {
    ...testFileMetadata,
    _id     : new ObjectId(),
    schedule: monthlySchedule(frequency, { isBusinessDay: false }),
  },
  {
    ...testFileMetadata,
    _id     : new ObjectId(),
    schedule: monthlySchedule(frequency, {
      isBusinessDay: false,
      dayOfTheWeek : ScheduleDaysOfTheWeek.AllDaysOfWeek,
      startDay     : 7,
    }),
  },
] as FilesMetadata[]);

export const testFilesMonthlyMetadataStartsOnHoliday = (frequency: Frequency, startDay = 5) => ([
  { ...testFileMetadata, schedule: monthlySchedule(frequency, { startDay: startDay }) },
] as FilesMetadata[]);

export const testNotBusinessMonthlyMetadata = (frequency: Frequency, startDay = 6) => ([
  {
    ...testFileMetadata,
    _id     : new ObjectId(),
    schedule: monthlySchedule(frequency, { isBusinessDay: false, startDay: startDay }),
  },
  {
    ...testFileMetadata,
    _id     : new ObjectId(),
    schedule: monthlySchedule(frequency, {
      isBusinessDay: false,
      dayOfTheWeek : ScheduleDaysOfTheWeek.AllDaysOfWeek,
      startDay     : startDay,
    }),
  },
] as FilesMetadata[]);

export const receivedAustralianMonthly: FilesMetadata = {
  ...testFileMetadata,
  state: {
    ...testFileMetadata.state,
    lastProcessTime     : new Date('2021-09-10'),
    lastFileUploadedTime: new Date('2021-09-10'),
  },
  _id     : new ObjectId(),
  schedule: {
    ...monthlySchedule(Frequency.ContinuousMonthly),
    expectedDays: [ australianBusinessSchedule ],
    timeZone    : 'Australia/Sydney'
  },
};

export const testFileId = testFileMetadata._id.toString();

export const testPaginateFilesMetadata = {
  docs         : testFilesMetadata,
  totalDocs    : 10,
  offset       : 0,
  limit        : 2,
  totalPages   : 5,
  page         : 1,
  hasPrevPage  : false,
  hasNextPage  : true,
  prevPage     : null,
  nextPage     : 2,
  pagingCounter: 1,
};

export const testSydneyNonBusinessSchedule = {
  frequency: Frequency.ContinuousMonthly,
  ...scheduleStartsFirstNonBusinessDay,
  timeZone : 'Australia/Sydney'
} as ActiveSchedule;

export const testSydneyBusinessSchedule = {
  frequency: Frequency.ContinuousMonthly,
  ...scheduleStartsFirstBusinessDay,
  timeZone : 'Australia/Sydney'
} as ActiveSchedule;
