import { ObjectId } from 'mongodb';
import * as faker from 'faker';
import { Frequency, ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';

function getTestFileMetadataBase(id: number = 0): FilesMetadata {
  return {
    validations        : [],
    _id                : new ObjectId(),
    supplier           : id % 2 === 0 ? 'bnp' : 'mdo',
    fileType           : faker.system.fileType(),
    entityType         : 'fund',
    region             : id % 5 === 0 ? faker.address.country() : 'international',
    fileMask           : faker.system.commonFileName('BNP_Postions_'),
    ftpPath               : faker.system.filePath(),
    ftpAccountName        : '',
    ftpOutputPath         : '',
    workflowProcessName: '',
    workflowProcessKey : '',
    snaplogicTasks     : [
      {
        camundaTopicName: 'PL_MDO_Abc',
        accountName     : '',
        eaglePaceURL    : '',
        taskUrl         : ''
      }
    ],
    schedule: {
      frequency: Frequency.Daily,
      timeZone: 'UTC',
      expectedDays: [
        {
          dayOfTheWeek: id % 2 ? 'AllWorkDays': 'AllDaysOfWeek',
          startTime   : '05:00',
          endTime     : '00:00',
          endOfOnTime : {
            time: '14:15'
          },
          endOfOnSchedule: {
            time: '14:00'
          },
          endOfLate: {
            time: '16:00'
          }
        },
      ],
    },
    notification: [
      {
        notificationMethod: 'email',
        notificationKey   : 'email',
        notificationIds   : [ faker.internet.email() ],
        escalationLevel   : 1,
      }
    ],
    state: {
      processingStatus: id % 2 === 0  ? 'success' : 'failed',
      errorMessage    : id % 2 === 0  ? '' : 'Something went wrong',
      scheduleStatus  : id % 2 === 0
        ? ScheduleStatus.onTime
        : id % 3 === 0
          ? ScheduleStatus.alert
          : ScheduleStatus.late
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    __v      : 0,
  } as FilesMetadata;
}

function getTestFileMetadata(id: number = 0): FilesMetadata {
  return getTestFileMetadataBase(id);
}

export const testFileMetadata = getTestFileMetadata();

export const testFileMetadataResponse = {
  ...getTestFileMetadataBase(),
  holidayCalendarId  : '6150d3232d6e37b573c44824'
};

export const testFileMetadatasResponse = new Array(10).fill(testFileMetadataResponse);
