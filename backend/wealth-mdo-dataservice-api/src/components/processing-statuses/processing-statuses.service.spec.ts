import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { processingStatuses } from '../../../test/data/processing-statuses/processing-statuses.const';

import { ProcessingStatusesService } from './processing-statuses.service';
import { assert } from './processing-statuses.spec-setup';

describe('ProcessingStatusesService', () => {
  let service: ProcessingStatusesService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('getProcessingStatuses()', () => {
    it('should return all file statuses', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(processingStatuses as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(processingStatuses);
      expect(res.length).toBe(5);
    });
  });
});
