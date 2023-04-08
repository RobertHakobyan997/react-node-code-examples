import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import MessageTemplatesModel, { MessageTemplatesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/message-templates';
import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { mergeMemo } from '../../core/utils/lodash';

@Injectable()
export class MessageTemplatesDal {
  private readonly logger = new Logger(MessageTemplatesDal.name);

  constructor(@Inject(MessageTemplatesModelToken) private readonly model: Model<Document<MessageTemplates>>) {
  }

  findAll(filter: FilterQuery<Document<MessageTemplates>> = {}, sort: string | any = {}) {
    return this.model
      .find(filter)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<MessageTemplates>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, projection: any = {}, options: any = {}) {
    return this.model.findById(id, projection, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(MessageTemplatesModel, docs));
  }

  async updateOne(_id: any, docs: UpdateQuery<MessageTemplates>) {
    const prev = await this.findById(_id, {}, { lean: true });
    const updated = mergeMemo(prev, docs);
    await this.model.updateOne({ _id }, plainToClass(MessageTemplatesModel, updated));
    return updated;
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
