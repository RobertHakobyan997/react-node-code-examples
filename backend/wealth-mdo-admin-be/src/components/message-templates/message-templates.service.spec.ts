import { Test, TestingModule } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { MessageTemplatesService } from './message-templates.service';

describe('MessageTemplatesService', () => {
  let service: MessageTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        MessageTemplatesService,
        provideMockHttpService()
      ],
    }).compile();

    service = module.get<MessageTemplatesService>(MessageTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
