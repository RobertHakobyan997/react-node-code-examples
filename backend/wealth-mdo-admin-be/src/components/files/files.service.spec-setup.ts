import { Test } from '@nestjs/testing';

import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';
import { provideMockAuthorizationService } from '../../../test/mocks/mock-authorization-service';

import { FilesService } from './files.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      FilesService,
      RequestService,
      provideMockHttpService(),
      provideMockAuthorizationService(),
    ],
  }).compile();

  return module.get<FilesService>(FilesService);
};
