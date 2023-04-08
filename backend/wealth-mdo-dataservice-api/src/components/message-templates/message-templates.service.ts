import { Injectable } from '@nestjs/common';
import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';

import { MessageTemplatesDal } from './message-templates.dal';
import { PartialMessageTemplates } from './message-templates.controller';

@Injectable()
export class MessageTemplatesService {
  constructor(private readonly dal: MessageTemplatesDal) {
  }

  findAll() {
    return this.dal.findAll();
  }

  findById(id: string) {
    return this.dal.findById(id);
  }

  findOne(key: string, method: string) {
    return this.dal.findOne({ key, method });
  }

  updateOne(id: string, messageTemplate: PartialMessageTemplates) {
    return this.dal.updateOne(id, messageTemplate);
  }

  create(body: MessageTemplates[]) {
    return this.dal.insert(body);
  }

  delete(id: string) {
    return this.dal.findByIdAndDelete(id);
  }
}
