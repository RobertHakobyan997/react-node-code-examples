import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { plainToClass } from 'class-transformer';
import FileTypesModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';

export const fileTypesRaw = [
  {
    _id    : '609d4c33bfd3901b8c3af802',
    key    : 'positions',
    display: 'Positions',
    order  : 1,
    hidden : false
  },
  {
    _id    : '609d4c33bfd3901b8c3af803',
    key    : 'transactions',
    display: 'Transactions',
    order  : 2,
    hidden : false
  },
  {
    _id    : '609d4c33bfd3901b8c3af804',
    key    : 'cashFlow',
    display: 'Cash Flow',
    order  : 3,
    hidden : false
  },
  {
    _id    : '609d4c33bfd3901b8c3af805',
    key    : 'error',
    display: 'Error',
    order  : 4,
    hidden : false
  },
];

export const fileTypes: Enum[] = plainToClass(FileTypesModel, fileTypesRaw);
