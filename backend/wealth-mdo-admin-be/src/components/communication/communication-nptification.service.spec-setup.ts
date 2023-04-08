import { Test } from '@nestjs/testing';

import { mockCommunicationAdapter } from '../../../test/mocks/mock-communication-adapter.const';

import { CommunicationAdapterService } from './communication-adapter.service';
import { CommunicationNotificationsService } from './communication-notifications.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      CommunicationNotificationsService,
      { provide: CommunicationAdapterService, useValue: mockCommunicationAdapter }
    ],
  }).compile();

  return module.get<CommunicationNotificationsService>(CommunicationNotificationsService);
};
