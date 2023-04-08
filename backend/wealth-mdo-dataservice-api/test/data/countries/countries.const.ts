import { ObjectId } from 'mongodb';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';

export const countries: Countries[] = [
  {
    _id    : new ObjectId('61a36157d967862ad9886557'),
    region : 'pacific',
    key    : 'fiji',
    display: 'Fiji',
    order  : 1,
    hidden : false
  },
  {
    _id    : new ObjectId('61a3626cd967862ad988655a'),
    region : 'pacific',
    key    : 'vanuatu',
    display: 'Vanuatu',
    order  : 2,
    hidden : false
  },
  {
    _id    : new ObjectId('61a3626cd967862ad938655a'),
    region : 'europe',
    key    : 'uk',
    display: 'UK',
    order  : 3,
    hidden : false
  }
];
