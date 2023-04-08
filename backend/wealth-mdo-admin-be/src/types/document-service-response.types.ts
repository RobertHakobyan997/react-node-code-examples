import { Types } from 'mongoose';

export interface DocumentServiceFileResponse {
  id: Types.ObjectId;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: Date;
  storageId: string;
  bucketId: string;
  bucketName: string;
  applicationKey: string;
}
