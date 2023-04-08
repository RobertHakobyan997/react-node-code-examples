import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { messageTemplates } from '../../../test/data/message-templates/message-templates.const';

import { MessageTemplatesService } from './message-templates.service';
import { assert } from './message-templates.spec-setup';

describe('ProcessingStatusesService', () => {
  let service: MessageTemplatesService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('findAll()', () => {
    it('should return all message templates', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(messageTemplates as Document<MessageTemplates>[]);
      const res = await service.findAll();
      expect(res).toEqual(messageTemplates);
      expect(res.length).toBe(3);
    });
  });

  describe('findByFilter()', () => {
    it('should return message template by key and method', async () => {
      jest.spyOn(service['dal'], 'findOne').mockResolvedValue(messageTemplates[0] as Document<MessageTemplates>);
      const res = await service.findOne('validation', 'email');
      expect(res).toEqual(messageTemplates[0]);
    });
  });

  describe('findById()', () => {
    it('should return message template by id', async () => {
      jest.spyOn(service['dal'], 'findById').mockResolvedValue(messageTemplates[0] as Document<MessageTemplates>);
      const res = await service.findById(messageTemplates[0]._id.toString());
      expect(res).toEqual(messageTemplates[0]);
    });
  });

  describe('create()', () => {
    it('should create and return message templates', async () => {
      jest.spyOn(service['dal'], 'insert').mockImplementation((data: MessageTemplates[]) => data as any);
      const res = await service.create(messageTemplates);
      expect(res).toEqual(messageTemplates);
      expect(service['dal'].insert).toHaveBeenCalledWith(messageTemplates);
    });
  });

  describe('delete()', () => {
    it('should delete file metadata and return result of the operation', async () => {
      jest.spyOn(service['dal'], 'findByIdAndDelete').mockResolvedValue(null);
      await service.delete(messageTemplates[0]._id.toString());
      expect(service['dal'].findByIdAndDelete).toHaveBeenCalledWith(messageTemplates[0]._id.toString());
    });
  });
});
