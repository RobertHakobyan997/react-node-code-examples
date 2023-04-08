import { ObjectId } from 'mongodb';

export const testRegions = [
  {
    _id: new ObjectId('6075ffd013a048976c4c26c8'),
    key: 'international',
    display: 'International',
    order: 1,
  },
  {
    _id: new ObjectId('612763ec05dbe7bf9510da82'),
    key: 'pacific',
    display: 'Pacific',
    order: 2,
  },
  {
    _id: new ObjectId('61a4d8b1cd8dddba59fc171b'),
    key: 'northAmerica',
    display: 'North America',
    order: 3,
  }
];
