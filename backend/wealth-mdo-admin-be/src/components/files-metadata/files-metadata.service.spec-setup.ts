import { Test } from '@nestjs/testing';

import { provideMockAuthorizationService } from '../../../test/mocks/mock-authorization-service';
import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { RequestService } from '../../core/request/request.service';

import { FilesMetadataService } from './files-metadata.service';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      FilesMetadataService,
      RequestService,
      provideMockHttpService(),
      provideMockAuthorizationService(),
    ],
  }).compile();

  return module.get<FilesMetadataService>(FilesMetadataService);
};
