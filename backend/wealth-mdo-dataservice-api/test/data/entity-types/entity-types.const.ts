import { plainToClass } from 'class-transformer';
import EntityTypesModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';

export const entityTypesRaw = {
  _id    : '609d4c33bfd3901b8c3af7f7',
  key    : 'fund',
  display: 'Fund',
  order  : 1,
  hidden : false
};

export const entityTypes = [ plainToClass(EntityTypesModel, entityTypesRaw) ];
