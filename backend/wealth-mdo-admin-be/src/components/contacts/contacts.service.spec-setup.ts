import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { ContactsService } from './contacts.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      ContactsService,
      RequestService,
      provideMockHttpService(),
    ],
  }).compile();

  return module.get<ContactsService>(ContactsService);
};
