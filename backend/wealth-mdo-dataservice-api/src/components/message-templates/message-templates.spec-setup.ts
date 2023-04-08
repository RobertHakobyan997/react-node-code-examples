import { Test, TestingModule } from '@nestjs/testing';
import { MessageTemplatesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/message-templates';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';

import { MessageTemplatesService } from './message-templates.service';
import { MessageTemplatesDal } from './message-templates.dal';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MessageTemplatesService,
      MessageTemplatesDal,
      { provide: MessageTemplatesModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<MessageTemplatesService>(MessageTemplatesService);
};
