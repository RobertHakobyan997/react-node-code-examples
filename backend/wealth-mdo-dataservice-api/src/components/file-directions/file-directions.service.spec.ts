import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { plainToClass } from 'class-transformer';
import FileDirectionsModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';
import { Types } from 'mongoose';

import { fileDirections, fileDirectionsRaw } from '../../../test/data/file-directions.const';

import { FileDirectionsService } from './file-directions.service';
import { assert } from './file-directions.spec-setup';

describe('FileDirectionsService', () => {
  let service: FileDirectionsService;

  beforeEach(async () => {
    service = await assert();
  });

  it('plainToClass', () => {
    const mapped = plainToClass(FileDirectionsModel, fileDirectionsRaw);
    mapped.map(el => expect(el._id).toBeInstanceOf(Types.ObjectId));
    expect(mapped).toMatchSnapshot();
  });

  describe('getFileDirections()', () => {
    it('should return all file directions', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(fileDirections as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(fileDirections);
      expect(res.length).toBe(3);
    });
  });
});
