import { Test } from '@nestjs/testing';
import { ContactsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/contacts';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { FilesMetadataService } from '../files-metadata/files-metadata.service';
import { provideMockService } from '../../../test/mocks/mock-service';
import { SuppliersService } from '../suppliers/suppliers.service';

import { ContactsService } from './contacts.service';
import { ContactsDal } from './contacts.dal';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      ContactsService,
      provideMockService(FilesMetadataService),
      provideMockService(SuppliersService),
      ContactsDal,
      { provide: ContactsModelToken, useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<ContactsService>(ContactsService);
};
