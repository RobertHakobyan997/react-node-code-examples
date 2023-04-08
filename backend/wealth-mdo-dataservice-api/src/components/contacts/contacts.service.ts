import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import { Timing } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/timing.decorator';
import { ObjectId } from 'mongodb';

import { paginate } from '../../core/utils/paginate';
import { FilesMetadataService } from '../files-metadata/files-metadata.service';
import { SuppliersService } from '../suppliers/suppliers.service';

import { UpdateContactRequest } from './types/update-contact-request';
import { ContactsFilter } from './types/contacts-filter-request';
import { CreateContactRequest } from './types/create-contact-request';
import { ContactsDal } from './contacts.dal';
import { contactsMapper } from './pure/contacts.pure';

@Injectable()
export class ContactsService {
  constructor(
    private readonly dal: ContactsDal,
    private readonly filesMetadataService: FilesMetadataService,
    private readonly suppliersService: SuppliersService
  ) {}

  async create(body: CreateContactRequest) {
    const { filesMetadataIds, ...contact } = body;
    if (filesMetadataIds.some(id => !ObjectId.isValid(id))) {
      throw new BadRequestException('Incorrect metadataId');
    }

    const createdContact = await this.dal.create(contact);
    // Adding created contact to appropriate files metadata
    await this.filesMetadataService.updateMany(
      { _id: { $in: filesMetadataIds } },
      { $push: { contacts: createdContact._id } }
    );

    return createdContact;
  }

  async findAll(filter: FilterQuery<Document<Contacts>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }

  @Timing
  async getSortedContacts({ field, sortOrder, limit, offset }: ContactsFilter) {
    const [ contacts, suppliers ] = await Promise.all([
      this.dal.findAll({}, { [field]: sortOrder }, { lean: true }),
      this.suppliersService.findAll({}, {}, { lean: true }),
    ]);
    const updatedContacts = contactsMapper(contacts, suppliers);
    return paginate(updatedContacts, { limit, offset });
  }

  @Timing
  async updateContact(id: any, { contact, filesMetadataIds }: UpdateContactRequest) {
    const updated = await this.dal.updateOne(id, contact);
    await this.filesMetadataService.updateContacts(id, filesMetadataIds);

    return updated;
  }

  async delete(id: string){
    await this.filesMetadataService.deleteContacts(id);
    return this.dal.findByIdAndDelete(id);
  }
}
