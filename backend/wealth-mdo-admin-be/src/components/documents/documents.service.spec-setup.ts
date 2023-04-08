import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { provideMockFilesService } from '../../../test/mocks/mock-files-service';
import { RequestService } from '../../core/request/request.service';

import { DocumentsService } from './documents.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      DocumentsService,
      RequestService,
      provideMockHttpService(),
      provideMockFilesService(),
    ],
  }).compile();

  return module.get<DocumentsService>(DocumentsService);
};
