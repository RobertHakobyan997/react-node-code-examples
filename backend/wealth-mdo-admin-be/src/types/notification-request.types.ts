import { CommunicationDocument } from './communication-document.types';
import { Recipient } from './recipient.types';

export interface NotificationRequest {
  recipients?: Recipient;
  subject: string;
  body?: string;
  startDate: Date;
  endDate?: Date;
  applicationKeys?: any;
  documents?: CommunicationDocument[];
  customData?: any;
  createdByGlobalProfileID?: number | string;
}
