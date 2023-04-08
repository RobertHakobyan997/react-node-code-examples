import { testCommunicationValues } from '../../../test/data/communication/test-communication-values.const';
import {
  testListOfMessages,
  testMessage,
} from '../../../test/data/communication/test-message.const';
import { testMessageRequest } from '../../../test/data/communication/test-message-request.const';

import { assert } from './communication-messages.service.spec-setup';
import { CommunicationMessagesService } from './communication-messages.service';

describe('CommunicationMessagesService', () => {
  let communicationMessagesService: CommunicationMessagesService;
  const MESSAGES_ADAPTER = 'messagesAdapter';

  beforeAll(async () => {
    communicationMessagesService = await assert();
  });

  describe('getMessages', () => {
    it('should return messages', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getMessages'
      ).mockResolvedValue(testListOfMessages);
      expect(
        await communicationMessagesService.getMessages(
          testCommunicationValues.applicationKey,
          testCommunicationValues.senderGlobalProfileId,
          testCommunicationValues.recipientGlobalProfileId,
          testCommunicationValues.hideRead,
          testCommunicationValues.hideDeleted,
          testCommunicationValues.page,
          testCommunicationValues.limit
        )
      ).toEqual(testListOfMessages);
    });
  });

  describe('getMessage', () => {
    it('should return message', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getMessage'
      ).mockResolvedValue(testMessage);
      expect(
        await communicationMessagesService.getMessage(testMessage.id)
      ).toEqual(testMessage);
    });
  });

  describe('createMessage', () => {
    it('should create and return message', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'createMessage'
      ).mockResolvedValue(testMessage);
      expect(
        await communicationMessagesService.createMessage(testMessageRequest)
      ).toEqual(testMessage);
    });
  });

  describe('updateMessage', () => {
    it('should update and return message', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'updateMessage'
      ).mockResolvedValue({ ...testMessage, body: '' });
      expect(
        await communicationMessagesService.updateMessage(testMessage.id, {
          ...testMessageRequest,
          body: '',
        })
      ).toEqual({ ...testMessage, body: '' });
    });
  });

  describe('deleteMessage', () => {
    it('should delete and return message', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'deleteMessage'
      ).mockResolvedValue(testMessage);
      expect(
        await communicationMessagesService.deleteMessage(testMessage.id)
      ).toEqual(testMessage);
    });
  });

  describe('markMessageAsRead', () => {
    it('should mark message as read by recipient', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'markMessageAsRead'
      ).mockResolvedValue({
        ...testMessage,
        recipients: { users: [ { read: true } ] },
      } as any);
      const message = await communicationMessagesService.markMessageAsRead(
        testCommunicationValues.senderGlobalProfileId,
        testMessage.id
      );
      expect(message.recipients.users[0].read).toBeTruthy();
    });
  });

  describe('markMessageAsDeleted', () => {
    it('should mark message as deleted by recipient', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'markMessageAsDeleted'
      ).mockResolvedValue({
        ...testMessage,
        recipients: { users: [ { deleted: true } ] },
      } as any);
      const message = await communicationMessagesService.markMessageAsDeleted(
        testCommunicationValues.senderGlobalProfileId,
        testMessage.id
      );
      expect(message.recipients.users[0].deleted).toBeTruthy();
    });
  });

  describe('sendMessage', () => {
    it('should send and return message', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'sendMessage'
      ).mockResolvedValue({ ...testMessage, status: 'sent' });
      expect(await communicationMessagesService.sendMessage(testMessage.id)).toEqual({
        ...testMessage,
        status: 'sent',
      });
    });
  });

  describe('archiveMessages', () => {
    it('should archive messages', async () => {
      jest.spyOn(communicationMessagesService[MESSAGES_ADAPTER], 'archiveMessages');
      await communicationMessagesService.archiveMessages(
        testCommunicationValues.applicationKey,
        123
      );
      expect(
        communicationMessagesService[MESSAGES_ADAPTER].archiveMessages
      ).toHaveBeenCalled();
    });
  });

  describe('getArchivedMessages', () => {
    it('should return list of archived messages', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getArchivedMessages'
      ).mockResolvedValue(testListOfMessages);
      expect(
        await communicationMessagesService.getArchivedMessages(
          testCommunicationValues.applicationKey,
          1,
          10
        )
      ).toEqual(testListOfMessages);
    });
  });

  describe('getArchivedMessage', () => {
    it('should return one archived message by id', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getArchivedMessage'
      ).mockResolvedValue({ ...testMessage, status: 'archived' });
      expect(
        await communicationMessagesService.getArchivedMessage(testMessage.id)
      ).toEqual({ ...testMessage, status: 'archived' });
    });
  });

  describe('getFailedMessages', () => {
    it('should return list of failed messages', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getFailedMessages'
      ).mockResolvedValue(testListOfMessages as any);
      expect(
        await communicationMessagesService.getFailedMessages(
          testCommunicationValues.applicationKey,
          testCommunicationValues.senderGlobalProfileId,
          testMessage.id,
          1,
          10
        )
      ).toEqual(testListOfMessages);
    });
  });

  describe('getFailedMessage', () => {
    it('should return failed message by id', async () => {
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getFailedMessage'
      ).mockResolvedValue({ ...testMessage, status: 'failed' } as any);
      expect(
        await communicationMessagesService.getFailedMessage(testMessage.id)
      ).toEqual({ ...testMessage, status: 'failed' });
    });
  });

  describe('getFailedMessageIds', () => {
    it('should return list of failed message ids', async () => {
      const failedIds = testListOfMessages.docs.map(m => m.id);
      jest.spyOn(
        communicationMessagesService[MESSAGES_ADAPTER],
        'getFailedMessageIds'
      ).mockResolvedValue(failedIds);
      expect(await communicationMessagesService.getFailedMessageIds()).toEqual(
        failedIds
      );
    });
  });
});
