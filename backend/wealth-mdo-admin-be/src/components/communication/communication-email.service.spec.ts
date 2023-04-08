import { Test, TestingModule } from '@nestjs/testing';

import { CommunicationAdapterService } from './communication-adapter.service';
import { CommunicationEmailService } from './communication-email.service';
import { CommunicationMessagesService } from './communication-messages.service';

describe('CommunicationEmailService', () => {
  let service: CommunicationEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ CommunicationEmailService, CommunicationMessagesService, CommunicationAdapterService ],
    }).compile();

    service = module.get<CommunicationEmailService>(CommunicationEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
