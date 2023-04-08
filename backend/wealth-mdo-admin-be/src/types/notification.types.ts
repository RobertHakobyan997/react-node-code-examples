import { CommunicationDocument } from './communication-document.types';
import { Recipient } from './recipient.types';

export interface Notification {
  id: string;
  recipients: Recipient;
  subject: string;
  body: string;
  startDate: Date;
  endDate: Date;
  applicationKeys: any;
  status: string;
  documents: CommunicationDocument[];
  customData: any;
  createdByGlobalProfileID: number | string;
}
