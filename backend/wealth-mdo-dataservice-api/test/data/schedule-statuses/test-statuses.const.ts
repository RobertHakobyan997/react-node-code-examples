import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { ObjectId } from 'mongodb';

export const testStatuses: Enum[] = [
  {
    _id    : new ObjectId(),
    key    : 'missing',
    display: 'Missing',
    order  : 1,
    hidden : false
  },
  {
    _id    : new ObjectId(),
    key    : 'late',
    display: 'Late',
    order  : 2,
    hidden : false
  },
  {
    _id    : new ObjectId(),
    key    : 'ontime',
    display: 'On Time',
    order  : 3,
    hidden : false
  },
];
