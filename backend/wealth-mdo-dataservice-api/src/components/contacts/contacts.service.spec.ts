import { BadRequestException } from '@nestjs/common';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import {
  testContact,
  testContacts,
  testSortedContacts,
  testSortedContactsQuery,
  testContactToCreate,
  testContactToCreateWithBrokenId,
  metadataId,
  testContactId
} from '../../../test/data/contacts/contacts.const';
import { testSuppliers } from '../../../test/data/suppliers/test-suppliers';

import { ContactsService } from './contacts.service';
import { assert } from './contacts.spec-setup';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('create()', () => {
    it('should create and return contact', async () => {
      jest.spyOn(service['dal'], 'create').mockResolvedValue(testContact as any);
      jest.spyOn(service['filesMetadataService'], 'updateMany');

      await service.create(testContactToCreate);

      expect(service['dal'].create).toHaveBeenCalledWith(testContact);
      expect(service['filesMetadataService'].updateMany).toHaveBeenCalledWith(
        { _id: { $in: [ metadataId ] } },
        { $push: { contacts: testContact._id } }
      );
    });

    it('should throw error',  async () => {
      expect(service.create(testContactToCreateWithBrokenId))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('getContacts()', () => {
    it('should return all contacts', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testContacts as Document<Contacts>[]);

      const res = await service.findAll();

      expect(res).toEqual(testContacts);
    });
  });

  describe('getSortedContacts()', () => {
    it('should return sorted contacts', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testContacts as any);
      jest.spyOn(service['suppliersService'], 'findAll').mockResolvedValue(testSuppliers as any);

      const res = await service.getSortedContacts(testSortedContactsQuery);

      expect(service['dal'].findAll).toHaveBeenCalledWith(
        {},
        { [testSortedContactsQuery.field]: testSortedContactsQuery.sortOrder },
        { lean: true },
      );

      expect(res).toEqual({
        ...testSortedContacts,
        docs: testSortedContacts.docs.map(
          doc => (
            {
              ...doc,
              supplier: { ...testSuppliers[0] }
            }
          )
        ),
      });
    });
  });

  describe('delete()', () => {
    it('should delete contact and return result of operation', async () => {
      const contactId = testContact._id.toString();
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockResolvedValue(testContact as Document<Contacts>);
      jest.spyOn(service['filesMetadataService'], 'deleteContacts');
      await service.delete(contactId);
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalledWith(contactId);
      expect(service['filesMetadataService'].deleteContacts).toHaveBeenCalledWith(contactId);
    });
  });

  describe('updateContact', () => {
    it('should update contact and list of contacts in specified metadata', async () => {
      jest.spyOn(service['dal'], 'updateOne').mockResolvedValue(testContact as Document<Contacts>);
      jest.spyOn(service['filesMetadataService'], 'updateContacts');
      await service.updateContact(testContactId, { contact: testContact, filesMetadataIds: [ metadataId ] });
      expect(service['dal'].updateOne).toHaveBeenCalled();
      expect(service['filesMetadataService'].updateContacts).toHaveBeenCalled();
    });
  });
});
