import { ObjectId } from 'mongodb';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

import { UpdateContactRequest } from '../../../src/types/contacts.types';

export const testContactsQuery = {
  field: 'supplier',
  sortOrder: 'asc',
  limit: 50,
  offset: 0
};

export const testContact = {
  _id: new ObjectId('616459bea08a5c401cffb629'),
  name: 'ContactName',
  supplier: 'Supplier',
  company: 'Company',
  email: 'email@email.com',
  number: '+44 78 89 89'
};

export const contactToUpdate: UpdateContactRequest = {
  ...testContact,
  filesMetadataIds: []
};

export const testContacts: Contacts[] = new Array(10).fill(testContact);

export const testSortedContacts = {
  page: 1,
  pages: 10,
  totalDocs: 100,
  docs: testContacts
};
