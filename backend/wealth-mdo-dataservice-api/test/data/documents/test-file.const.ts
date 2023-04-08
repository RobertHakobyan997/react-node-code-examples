import * as faker from 'faker';
import { ScheduleStatus, Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ObjectId } from 'mongodb';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import { PaginateResult } from 'mongoose';

import { FilesStatus } from '../../../src/components/files/types/files-status.interface';
import { testMetadataId } from '../files-metadata/test-files-metadata.const';
import { DateFilterOption } from '../../../src/components/files/constants/files.const';
import { FileFilterRequest } from '../../../src/components/files/types/file-filter.interface';

const docId = new ObjectId();
const fName = `BNP_Positions_Fund_International_${+new Date()}`;
const uploadDate = faker.date.past();
const statusFaker = faker.datatype.number(5);

export const testFilteredNumberOfRecords = 99;

export const testFile: Files = {
  _id            : docId,
  filesMetadataId: new ObjectId('60b634fc7fdd107c380ce156'),
  masterFileId   : docId,
  masterFileName : 'testMasterFileName',
  sourceFileData : {
    fileName               : fName,
    uploadedDate           : uploadDate,
    numberOfRecords        : faker.datatype.number({ min: 200, max: 3000, precision: 0 }),
    filteredNumberOfRecords: faker.datatype.number({ min: 200, max: 3000, precision: 0 }),
    externalLocation       : 'globalScape',
    path                   : `ftp://intranetftp.mercer.com/public/wealth/MDO/${fName}`,
    supplier               : 'bnp',
    fileType               : 'positions',
    fileDirection          : faker.datatype.number(5) < 3 ? 'inbound' : 'outbound',
    fileSize               : 1234,
    entityType             : 'fund',
    region                 : 'international',
    fileFormat             : 'xls',
  },
  uploadedBy     : faker.datatype.number(5) < 3 ? 'system' : new ObjectId().toHexString(),
  mosDocumentData: {
    documentId : docId,
    fileName   : fName,
    contentType: 'text/csv',
    length     : 1234,
    uploadDate : uploadDate,
  },
  processWorkflowData: {
    processId  : 'Process_01sjmza',
    processName: 'smaple_bpm',
    instanceId : 'Process_01sjmza:2:118ed9ff-7777-11eb-b1b4-0242ac11004e',
  },
  fileActions: [],
  state      : {
    processingStatus: statusFaker < 3 ? 'success' : 'failed',
    errorMessage    : statusFaker < 3 ? '' : 'Something went wrong',
    scheduleStatus  : statusFaker < 3
      ? ScheduleStatus.onTime
      : statusFaker === 3
        ? ScheduleStatus.alert
        : ScheduleStatus.late,
  },
};

function getFileWithStatus(status: Status) {
  return {
    ...testFile,
    filesMetadataId: new ObjectId(testMetadataId),
    state          : { ...testFile.state, processingStatus: status },
    sourceFileData : {
      ...testFile.sourceFileData,
      fileName               : status,
      filteredNumberOfRecords: testFilteredNumberOfRecords
    },
  };
}

function getTestFilesListStatus(status: Status) {
  return [
    { ...testFile, filesMetadataId: new ObjectId(testMetadataId), state: { ...testFile.state, processingStatus: Status.inProgress } },
    getFileWithStatus(status),
    { ...testFile, filesMetadataId: new ObjectId(testMetadataId), state: { ...testFile.state, processingStatus: status } },
    { ...testFile, filesMetadataId: new ObjectId(testMetadataId), state: { ...testFile.state, processingStatus: Status.failed } },
  ];
}

export const testFileDocId = () => testFile.mosDocumentData.documentId.toString();

export const testOutboundFile: Files = {
  ...testFile,
  sourceFileData: { ...testFile.sourceFileData, fileDirection: 'outbound' },
};

export const testFilesList: Files[] = [
  { ...testFile },
  { ...testFile, _id: new ObjectId('6029154183ce92370cf20f05') },
  { ...testFile, _id: new ObjectId('6029158183ce92370cf20f06') },
  { ...testFile, _id: new ObjectId('6029159883ce92370cf20f07') },
  { ...testFile, filesMetadataId: new ObjectId(testMetadataId) },
];

export const testFilesWithFinishedWithErrorsFile = getTestFilesListStatus(Status.finishedWithErrors);
export const testFilesWithSuccessFile = getTestFilesListStatus(Status.success);
export const testFilesWithoutSuccessOrErrorFile = getTestFilesListStatus(Status.failed);

export const testOutboundFilesList: Files[] = [
  { ...testOutboundFile },
  { ...testOutboundFile, _id: new ObjectId('6029154183ce92370cf20f05') },
  { ...testOutboundFile, _id: new ObjectId('6029158183ce92370cf20f06') },
  { ...testOutboundFile, _id: new ObjectId('6029159883ce92370cf20f07') },
];

export const testFilesStatuses: FilesStatus = {
  [Status.all]                 : faker.datatype.number(),
  [Status.success]             : faker.datatype.number(),
  [Status.failed]              : faker.datatype.number(),
  [Status.inProgress]          : faker.datatype.number(),
  [Status.finishedWithErrors]  : faker.datatype.number(),
  [Status.technicalError]      : faker.datatype.number(),
  [Status.waitingToBeProcessed]: faker.datatype.number(),
};

export const testPaginateFiles = {
  docs  : testFilesList,
  total : 3,
  limit : 50,
  page  : 1,
  pages : 1,
  offset: 0,
};

export const testPaginatedSortedFileList = {
  docs: [
    {
      ...testFile,
      masterFileName: undefined
    },
    {
      ...testFile,
      masterFileName: 'A'
    },
    {
      ...testFile,
      masterFileName: 'a'
    }
  ]
} as PaginateResult<Files>;

export const testFileFilterOptions = {
  quickFilter: {
    quickOption: {
      count: 0,
      name : DateFilterOption.all,
      units: ''
    }
  },
};
export const testFileFilter = {
  field        : 'sourceFileData.uploadedBy',
  sortOrder    : 'desc',
  limit        : 50,
  offset       : 0,
  fileName     : 'test',
  filterOptions: testFileFilterOptions,
} as FileFilterRequest;
