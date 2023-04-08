import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { plainToClass } from 'class-transformer';
import FileTypesModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';
import { Types } from 'mongoose';

import { fileTypes, fileTypesRaw } from '../../../test/data/file-types/file-types.const';

import { FileTypesService } from './file-types.service';
import { assert } from './file-types.spec-setup';

describe('FileTypesService', () => {
  let service: FileTypesService;

  beforeEach(async () => {
    service = await assert();
  });

  it('plainToClass', () => {
    const mapped = plainToClass(FileTypesModel, fileTypesRaw);
    mapped.map(el => expect(el._id).toBeInstanceOf(Types.ObjectId));
    expect(mapped).toMatchSnapshot();
  });

  describe('getFileTypes()', () => {
    it('should return all file types', async () => {
      jest.spyOn(service['dal'], 'findAll').mockResolvedValue(fileTypes as Document<Enum>[]);
      const res = await service.findAll();
      expect(res).toEqual(fileTypes);
      expect(res.length).toBe(4);
    });
  });
});
