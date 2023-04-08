import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';
import { plainToClass } from 'class-transformer';
import DataTransferJobsMetadataModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/data-transfer-jobs-metadata';
import { DateTime } from 'luxon';
import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ObjectId } from 'mongodb';
import DataTransferJobsSchedule from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-schedule';

import { testHolidayDates } from '../../holiday-calendars/holiday-calendars.const';

import { dataTransferJobsStatus } from './data-transfer-jobs-status.const';

export const dataTransferJobsMetadataRaw = {
  '_id'                : '611f68a99f217cce3a4d91f8',
  'dataTransferJobKey' : 'eagle2Kafka_Entities',
  'region'             : 'unitedStates',
  'workflowProcessName': 'DataTransfer_Default_Workflow',
  'workflowProcessKey' : '',
  'isEnabled'          : true,
  'schedule'           : {
    'startDate'        : '2021-09-01',
    'startTime'        : '00:01',
    'frequency'        : 'Daily',
    'repeatDuration'   : '1',
    'endDate'          : '2023-09-01',
    'timeZone'         : 'America/Chicago',
    'holidayCalendarId': '609d488d3413c47110d7f91f',
    'expectedDays'     : [
      {
        'dayOfTheWeek'   : 'AllWorkDays',
        'endOfOnSchedule': {
          'time': '13:00'
        },
        'endOfOnTime': {
          'time': '16:00'
        },
        'endOfLate': {
          'time': '17:00'
        }
      }
    ]
  },
  'snaplogicTasks': [
    {
      'taskUrl'         : 'TASK_TRGD_MDO_Eagle2Kafka_PushData',
      'camundaTopicName': 'callSnaplogicDataTransferTask'
    }
  ],
  'data': [
    {
      '_id'                 : '611f6d0df72945a1fb538c0d',
      'objectType'          : 'Entities',
      'dbName'              : 'rulesdbo',
      'tableName'           : 'entity',
      'columnName'          : 'upd_Date',
      'eagleApiEndPointName': 'entities',
      'topicName'           : 'P500_EAGLE2KF_ENTITIES',
      'childObjectName'     : 'genericEntity',
      'parentObjectName'    : 'entityTransaction',
      'dataHeader'          : 'entityTransactionMessage',
      'historyOnlyFlag'     : 'N',
      'eaglePaceURL'        : 'https://mgi-d003-star.eagleaccess.com/eagle/v2',
      'accountName'         : 'EaglePaceAPI',
      'ftpPath'             : 'ftp://intranetftp.mercer.com/public/wealth/MDO/',
      'ftpAccountName'      : 'EaglePaceSFTP',
      'ftpOutputPath'       : 'ftp://intranetftp.mercer.com/public/wealth/MDO/output/',
      'eagleIdentifiers'    : {
        'accountIdType' : 'NRS_CUSTODY_FUND',
        'securityIdType': 'NRS_CUSTODY'
      }
    }
  ],
  'notification': [
    {
      'notificationMethod': 'email',
      'notificationKey'   : 'validation',
      'notificationIds'   : [
        'mikhail.krastelev@mmc.com',
        'tagaibek.tolubaev@mmc.com',
        'kiran.dhage@mercer.com',
        'prabhukumar.a@mercer.com',
        'saran.thiruchabai@mmc.com',
        'nemi.nabiraj@mmc.com'
      ],
      'escalationLevel': 1
    },
    {
      'notificationMethod': 'email',
      'notificationKey'   : 'alerts',
      'notificationIds'   : [
        'mikhail.krastelev@emergn.com',
        'tagaibek.tolubaev@emergn.com',
        'kiran.dhage@mercer.com',
        'prabhukumar.a@mercer.com',
        'saran.thiruchabai@mmc.com',
        'nemi.nabiraj@mmc.com'
      ],
      'escalationLevel': 1
    }
  ]
};

export const testDataTransferJobsSchedule: DataTransferJobsSchedule = {
  startDate        : DateTime.fromFormat('2021-09-01', 'yyyy-mm-dd').toJSDate(),
  startTime        : '05:00',
  frequency        : Frequency.Daily,
  repeatDuration   : 1,
  endDate          : DateTime.fromFormat('2099-09-01', 'yyyy-mm-dd').toJSDate(),
  timeZone         : 'UTC',
  holidayCalendarId: '609d488d3413c47110d7f91f',
  expectedDays     : [
    {
      dayOfTheWeek   : 'AllWorkDays',
      endOfOnSchedule: {
        day : 1,
        time: '13:00',
      },
      endOfOnTime: {
        day : 2,
        time: '16:00'
      },
      endOfLate: {
        day : 3,
        time: '17:00'
      }
    }
  ]
};

export const testDataTransferMetadata: DataTransferJobsMetadata = {
  _id                : new ObjectId('611f68a99f217cce3a4d91f8'),
  dataTransferJobKey : 'eagle2Kafka_Entities',
  region             : 'northernAmerica',
  country            : 'unitedStates',
  workflowProcessName: 'DataTransfer_Default_Workflow',
  workflowProcessKey : '',
  isEnabled          : true,
  schedule           : testDataTransferJobsSchedule,
  snaplogicTasks     : [],
  data               : [],
  notification       : []
};

export const dataTransferJobsMetadata: DataTransferJobsMetadata[] = [
  plainToClass(DataTransferJobsMetadataModel, dataTransferJobsMetadataRaw)
];

export const dataTransferJobsMetadataWithHolidays = {
  ...testDataTransferMetadata,
  holidayDates: testHolidayDates
};

export function metadataWithStatus(repeatDuration: number, totalSuccessCount: number): any {
  const metadata = {
    ...testDataTransferMetadata,
    state: {
      ...dataTransferJobsStatus[0].state,
      lastSuccessfulProcessTime: new Date('2021-08-02T15:00:00.000Z').valueOf(),
      totalSuccessCount,
    },
    schedule: {
      ...testDataTransferMetadata.schedule,
      repeatDuration: repeatDuration,
      expectedDays  : [
        {
          periodStartDate: new Date('2021-07-02T15:00:00.000Z').valueOf(),
          periodEndDate  : new Date('2021-09-02T15:00:00.000Z').valueOf(),
          dayOfTheWeek   : 'AllWorkDays',
          endOfOnSchedule: {
            day : 1,
            time: '13:00',
          },
          endOfOnTime: {
            day : 2,
            time: '16:00'
          },
          endOfLate: {
            day : 3,
            time: '17:00'
          }
        }
      ]
    }
  };
  return metadata;
}

