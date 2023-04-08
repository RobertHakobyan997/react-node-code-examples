import { Injectable } from '@nestjs/common';
import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';

import { RequestService } from '../../core/request/request.service';

@Injectable()
export class MessageTemplatesService {
  constructor(private readonly request: RequestService) {
  }

  getTemplate(key: string, method: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/message-templates/template`;
    return this.request.get<MessageTemplates>(url, { params: { key, method } });
  }
}
