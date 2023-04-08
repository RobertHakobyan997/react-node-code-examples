import { ObjectId } from 'mongodb';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

import { CreateContactRequest } from '../../../src/components/contacts/types/create-contact-request';

export const testSortedContactsQuery = {
  field    : 'supplier',
  sortOrder: 'asc',
  limit    : 50,
  offset   : 0
};

export const testContactId = '60c9b74269d770005ab8f864';

export const testContact: Contacts = {
  _id     : new ObjectId(testContactId),
  supplier: 'bnp',
  name    : 'ContactName',
  company : 'Company',
  email   : 'email@email.com',
  number  : '+44 78 89 89',
};

export const metadataId = '60c9b74269d770005ab8f863';

export const testContactToCreate: CreateContactRequest = {
  ...testContact,
  filesMetadataIds: [ metadataId ]
};

export const testContactToCreateWithBrokenId: CreateContactRequest = {
  ...testContact,
  filesMetadataIds: [ '' ]
};

export const testContacts: Contacts[] = new Array(10).fill(testContact);

export const testSortedContacts = {
  page         : 1,
  totalDocs    : 10,
  docs         : testContacts,
  hasNextPage  : false,
  hasPrevPage  : false,
  limit        : 50,
  nextPage     : null,
  offset       : 0,
  pagingCounter: 1,
  prevPage     : null,
  totalPages   : 1
};
