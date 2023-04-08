import { Pagination } from './pagination.types';
import { Message } from './message.types';
import { MessageRequest } from './message-request.types';
import { FailedMessage } from './failed-message.types';

export interface MessagesApi {
  getMessages: (
    applicationKey: string,
    senderGlobalProfileId: string,
    recipientGlobalProfileId: string,
    hideRead: boolean,
    hideDeleted: boolean,
    page: number,
    limit: number
  ) => Promise<Pagination<Message>>;

  getMessage: (messageId: string) => Promise<Message>;

  createMessage: (data: MessageRequest) => Promise<Message>;

  updateMessage: (messageId: string, data: MessageRequest) => Promise<Message>;

  deleteMessage: (messageId: string) => Promise<Message>;

  markMessageAsRead: (
    globalProfileId: string,
    messageId: string
  ) => Promise<Message>;

  markMessageAsDeleted: (
    globalProfileId: string,
    messageId: string
  ) => Promise<Message>;

  sendMessage: (messageId: string) => Promise<Message>;

  archiveMessages: (applicationKey: string, expireDate: number) => Promise<any>;

  getArchivedMessages: (
    applicationKey: string,
    page: number,
    limit: number
  ) => Promise<Pagination<Message>>;

  getArchivedMessage: (messageId: string) => Promise<Message>;

  getFailedMessages: (
    applicationKey: string,
    globalProfileId: string,
    messageId: string,
    page: number,
    limit: number
  ) => Promise<Pagination<FailedMessage>>;

  getFailedMessage: (failedMessageId: string) => Promise<FailedMessage>;

  getFailedMessageIds: () => Promise<string[]>;
}
