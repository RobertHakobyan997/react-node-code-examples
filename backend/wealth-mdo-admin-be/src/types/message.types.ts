import { CommunicationUser } from './communication-user.types';
import { CommunicationDocument } from './communication-document.types';
import { Recipient } from './recipient.types';

export interface Message {
  id: string;
  recipients: Recipient;
  sender: CommunicationUser;
  subject: string;
  body: string;
  creationDate: Date;
  applicationKey: string;
  documents: CommunicationDocument[];
  status: string;
  channels: string[];
}
