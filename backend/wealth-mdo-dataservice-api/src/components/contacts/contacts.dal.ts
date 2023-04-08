import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import ContactsModel, { ContactsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/contacts';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class ContactsDal {
  private readonly logger = new Logger(ContactsDal.name);

  constructor(@Inject(ContactsModelToken) private readonly model: Model<Document<Contacts>>) {
  }

  findAll(filter: FilterQuery<Document<Contacts>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Contacts>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  create(doc: Contacts) {
    const contact = plainToClass(ContactsModel, doc) as Document<Contacts>;
    return this.model.create(contact);
  }

  async updateOne(_id: any, docs: UpdateQuery<Contacts>) {
    const prev = await this.findById(_id, {}, { lean: true });
    const updated = mergeMemo(prev, docs);
    await this.model.updateOne({ _id }, plainToClass(ContactsModel, updated));
    return updated;
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
