import { Injectable } from '@nestjs/common';

import { Message } from '../../types/message.types';
import { MessageRequest } from '../../types/message-request.types';
import { FailedMessage } from '../../types/failed-message.types';
import { MessagesApi } from '../../types/messages-api.types';
import { Pagination } from '../../types/pagination.types';

import { CommunicationAdapterService } from './communication-adapter.service';

@Injectable()
export class CommunicationMessagesService {
  private readonly messagesAdapter: MessagesApi;

  constructor(
    private readonly communicationAdapterService: CommunicationAdapterService
  ) {
    this.messagesAdapter = this.communicationAdapterService.getMessagesAdapter();
  }

  getMessages(
    applicationKey: string,
    senderGlobalProfileId: string,
    recipientGlobalProfileId: string,
    hideRead: boolean,
    hideDeleted: boolean,
    page: number,
    limit: number
  ): Promise<Pagination<Message>> {
    return this.messagesAdapter.getMessages(
      applicationKey,
      senderGlobalProfileId,
      recipientGlobalProfileId,
      hideRead,
      hideDeleted,
      page,
      limit
    );
  }

  getMessage(messageId: string): Promise<Message> {
    return this.messagesAdapter.getMessage(messageId);
  }

  createMessage(data: MessageRequest): Promise<Message> {
    return this.messagesAdapter.createMessage(data);
  }

  updateMessage(messageId: string, data: MessageRequest): Promise<Message> {
    return this.messagesAdapter.updateMessage(messageId, data);
  }

  deleteMessage(messageId: string): Promise<Message> {
    return this.messagesAdapter.deleteMessage(messageId);
  }

  markMessageAsRead(
    globalProfileId: string,
    messageId: string
  ): Promise<Message> {
    return this.messagesAdapter.markMessageAsRead(globalProfileId, messageId);
  }

  markMessageAsDeleted(
    globalProfileId: string,
    messageId: string
  ): Promise<Message> {
    return this.messagesAdapter.markMessageAsDeleted(
      globalProfileId,
      messageId
    );
  }

  sendMessage(messageId: string): Promise<Message> {
    return this.messagesAdapter.sendMessage(messageId);
  }

  archiveMessages(applicationKey: string, expireDate: number): Promise<any> {
    return this.messagesAdapter.archiveMessages(applicationKey, expireDate);
  }

  getArchivedMessages(
    applicationKey: string,
    page: number,
    limit: number
  ): Promise<Pagination<Message>> {
    return this.messagesAdapter.getArchivedMessages(
      applicationKey,
      page,
      limit
    );
  }

  getArchivedMessage(messageId: string): Promise<Message> {
    return this.messagesAdapter.getArchivedMessage(messageId);
  }

  getFailedMessages(
    applicationKey: string,
    globalProfileId: string,
    messageId: string,
    page: number,
    limit: number
  ): Promise<Pagination<FailedMessage>> {
    return this.messagesAdapter.getFailedMessages(
      applicationKey,
      globalProfileId,
      messageId,
      page,
      limit
    );
  }

  getFailedMessage(failedMessageId: string): Promise<FailedMessage> {
    return this.messagesAdapter.getFailedMessage(failedMessageId);
  }

  getFailedMessageIds(): Promise<string[]> {
    return this.messagesAdapter.getFailedMessageIds();
  }
}
