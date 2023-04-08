import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

import {
  testContactsQuery,
  testContact,
  testContacts,
  testSortedContacts,
  contactToUpdate
} from '../../../test/data/contacts/contacts.const';

import { ContactsService } from './contacts.service';
import { assert } from './contacts.service.spec-setup';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeAll(async () => {
    service = await assert();
  });

  describe('create()', () => {
    it('should create and return created contact', async () => {
      const createContactRequestBody = {
        ...testContact,
        filesMetadataIds: [ ]
      };
      jest.spyOn(service['request'], 'post').mockReturnValue(of(createContactRequestBody));
      const contacts = service.create(createContactRequestBody);
      contacts.subscribe(res => expect(res).toEqual(createContactRequestBody));
    });
  });

  describe('getContacts()', () => {
    it('should return contacts', async () => {
      jest.spyOn(service['request'], 'get').mockReturnValue(of(testContacts));
      const supplier = 'Supplier';
      const contacts = service.getContacts(supplier);

      contacts.subscribe(res => expect(res).toEqual(testContacts));
    });
  });

  describe('getSortedContacts()', () => {
    it('should return sorted contacts', async () => {
      jest.spyOn(service['request'], 'post').mockReturnValue(of(testSortedContacts));

      const contacts = service.getSortedContacts(testContactsQuery);

      contacts.subscribe(res => expect(res).toEqual(testSortedContacts));
    });
  });

  describe('updateContact()', () => {
    it('should update and return contact', async () => {
      jest.spyOn(service['request'], 'put').mockReturnValue(of(testContact));

      const contact = service.updateContact(testContact._id.toString(), contactToUpdate);

      contact.subscribe(res => expect(res).toEqual(testContact));
    });
  });

  describe('delete', () => {
    it('should delete and return deleted contact', async () => {
      const deletedContact = testContacts[0];
      const mockAxiosResponse = {
        data: deletedContact,
      } as AxiosResponse;
      jest.spyOn(service['request'], 'delete').mockReturnValue(of(mockAxiosResponse));
      const contacts = service.delete(deletedContact._id.toString());
      contacts.subscribe(res => expect(res).toEqual(deletedContact));
    });
  });
});
