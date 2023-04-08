import { ObjectId } from 'mongodb';

export const testSuppliers = [
  {
    _id: new ObjectId('609d1bde06729b7f7ccd1542'),
    key: 'bnp',
    display: 'BNP',
    order: 1,
  },
  {
    _id: new ObjectId('609d1bde06729b7f7ccd155f'),
    key: 'jpMorgan',
    display: 'J.P. Morgan & Co.',
    order: 2,
  },
  {
    _id: new ObjectId('611a55db8699cfd5d32d7bbf'),
    key: 'northernTrust',
    display: 'Northern Trust',
    order: 3,
  }
];
