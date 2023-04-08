import { MessageRequest } from '../../../src/types/message-request.types';

export const testMessageRequest: MessageRequest = {
  recipients: {
    users: [
      {
        globalProfileId: '123',
        firstName: '123',
        lastName: '123',
        email: '123@email.com',
        phone: '123',
        read: true,
        deleted: false,
      },
    ],
  },
  sender: {
    globalProfileId: '123',
    firstName: '123',
    lastName: '123',
    email: '123@email.com',
    phone: '123',
  },
  subject: 'subject',
  creationDate: null,
  applicationKey: 'key',
  documents: [],
  body: '',
  bodyType: '',
  channels: [],
};
