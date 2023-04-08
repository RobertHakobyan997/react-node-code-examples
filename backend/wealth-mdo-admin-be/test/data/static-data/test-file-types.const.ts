import { ObjectId } from 'mongodb';

export const testFileTypes = [
  {
    _id: new ObjectId('6075ffd013a048976c4c26bf'),
    key: 'positions',
    display: 'Positions',
    order: 1,
  },
  {
    _id: new ObjectId('6075ffd013a048976c4c26c0'),
    key: 'transactions',
    display: 'Transactions',
    order: 2,
  },
  {
    _id: new ObjectId('6075ffd013a048976c4c26c1'),
    key: 'cashflow',
    display: 'Cash flow',
    order: 3,
  }
];
