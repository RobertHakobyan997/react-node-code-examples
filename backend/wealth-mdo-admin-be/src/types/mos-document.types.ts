export interface MOSDocument {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: string;
  storageId: string;
  bucketId: string;
  bucketName: string;
  applicationKey: string;
  isDeleted: boolean;
  isCascadeDeleted: boolean;
  isCurrentVersion: boolean;
  cascadeDelStartingBucketId?: string;
  createdBy?: string;
  updationDate?: string;
  updatedBy?: string;
}
