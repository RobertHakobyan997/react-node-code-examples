export interface FailedMessage {
  id: string;
  applicationKey: string;
  recipient: string;
  globalProfileId: string;
  messageId: string;
  errorMessage: string;
  channel: string;
  creationDate: Date;
}
