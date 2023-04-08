import { BadRequestException } from '@nestjs/common';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { testStatuses } from '../../../test/data/schedule-statuses/test-statuses.const';

import { ScheduleStatusesService } from './schedule-statuses.service';
import { assert } from './schedule-statuses.spec-setup';

describe('EventsService', () => {
  let service: ScheduleStatusesService;

  beforeEach(async () => {
    service = await assert();
  });

  describe('getAll()', () => {
    it('should return all schedule statuses', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(testStatuses as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(testStatuses);
      expect(res.length).toBe(3);
      expect(res[0]).toBe(testStatuses[0]);
    });
    it('should throw an error if there were no statuses', async () => {
      jest.spyOn(service['dal'], 'findAll').mockRejectedValue(new BadRequestException('error'));
      await expect(service.findAll())
        .rejects.toThrowError(new BadRequestException('error'));
    });
  });
});
