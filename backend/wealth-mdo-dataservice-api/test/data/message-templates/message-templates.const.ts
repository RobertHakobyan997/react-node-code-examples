import { ObjectId } from 'mongodb';
import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';

export const messageTemplates: MessageTemplates[] = [
  {
    _id     : new ObjectId('609d4c33bfd3901b8c3af7fe'),
    key     : 'validation',
    method  : 'email',
    template: 'template1',
  },
  {
    _id     : new ObjectId('609d4c33bfd3901b8c3af7ff'),
    key     : 'timeout',
    method  : 'email',
    template: 'template2',
  },
  {
    _id     : new ObjectId('609d4c33bfd3901b8c3af800'),
    key     : 'error',
    method  : 'email',
    template: 'template3',
  }
];
