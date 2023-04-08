import { ObjectId } from 'mongodb';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

export const regions: Enum[] = [
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af80b'),
    key    : 'international',
    display: 'International',
    order  : 1,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af80c'),
    key    : 'can',
    display: 'Canada',
    order  : 2,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af80d'),
    key    : 'apac',
    display: 'Asia-Pacific',
    order  : 3,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af80e'),
    key    : 'us',
    display: 'United States',
    order  : 4,
    hidden : false
  },
];
