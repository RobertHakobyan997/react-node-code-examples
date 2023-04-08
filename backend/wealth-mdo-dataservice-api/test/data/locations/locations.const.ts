import { ObjectId } from 'mongodb';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

export const locations: Enum[] = [
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af807'),
    key    : 'globalScape',
    display: 'Global Scape',
    order  : 1,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af808'),
    key    : 'eagle',
    display: 'Eagle',
    order  : 2,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af809'),
    key    : 'null',
    display: 'Null',
    order  : 3,
    hidden : false
  },
];
