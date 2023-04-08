import { Pagination } from '../../../src/types/pagination.types';
import { Message } from '../../../src/types/message.types';

export const testMessage: Message = {
  documents     : [],
  channels      : [],
  body          : 'body',
  id            : '602c20dc5f063d3cb42eac55',
  recipients    : {
    users : [
      {
        read           : false,
        deleted        : false,
        globalProfileId: '123',
        firstName      : '123',
        lastName       : '123',
        email          : '123@email.com',
        phone          : '123',
      },
    ],
    groups: [],
  },
  sender        : {
    globalProfileId: '123',
    firstName      : '123',
    lastName       : '123',
    email          : '123@email.com',
    phone          : '123',
  },
  subject       : 'subject',
  creationDate  : new Date('2021-02-16T19:45:32.691Z'),
  applicationKey: 'key',
  status        : 'init',
};

export const testListOfMessages: Pagination<Message> = {
  docs : [ testMessage ],
  limit: 10,
  page : 1,
  total: 1,
};
