import { Test } from '@nestjs/testing';

import { mockCommunicationAdapter } from '../../../test/mocks/mock-communication-adapter.const';

import { CommunicationMessagesService } from './communication-messages.service';
import { CommunicationAdapterService } from './communication-adapter.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      CommunicationMessagesService,
      {
        provide: CommunicationAdapterService,
        useValue: mockCommunicationAdapter,
      },
    ],
  }).compile();

  return module.get<CommunicationMessagesService>(CommunicationMessagesService);
};
