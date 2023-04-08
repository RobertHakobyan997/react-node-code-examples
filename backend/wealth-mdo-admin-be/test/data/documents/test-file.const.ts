import { ProcessingStatus } from 'ngpd-merceros-wealth-mdo-common-fe/dist/files/constants/processing-status.enum';
import { Directions } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ObjectId } from 'mongodb';

import { FileFilterOptions, FileFilterRequest, QuickDateFilter } from '../../../src/types/file-filter.types';

// ToDo fix types for Files type
export const testFile = {
  _id        : new ObjectId('6029154183ce92370cf20f05'),
  contentType: 'application/vnd.ms-excel',
  length     : 34,
  uploadDate : new Date('2021-02-14T12:19:13.330Z'),
  fileName   : 'file.xls',
  documentId : new ObjectId('602915410546a471e719c73c'),
  uploadedBy : new ObjectId('60200b5b57d9136942249f78') as any,
  status     : ProcessingStatus.success,
  direction  : Directions.inbound,
  supplier   : 'bnp',
  entityType : 'fund',
  fileType   : 'position',
} as any;

const quickFilterOptions: QuickDateFilter = {
  quickOption: { name: '', units: '', count: 0 },
};

const fileFilterOptions: FileFilterOptions = {
  scheduleStatus: [],
  fileDirection : [ Directions.inbound ],
  fileType      : [],
  supplier      : [],
  region        : [],
  entityType    : [],
  quickFilter   : quickFilterOptions,
};

export const fileFilterRequest: FileFilterRequest = {
  field        : 'uploadedDate',
  sortOrder    : 'desc',
  limit        : 50,
  offset       : 0,
  fileName     : 'xls',
  filterOptions: fileFilterOptions,
};
