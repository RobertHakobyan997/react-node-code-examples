import { ObjectId } from 'mongodb';

export const testEntityTypes = [
  {
    _id: new ObjectId('608ba9cbc1656e7b68ab3ed3'),
    key: 'fund',
    display: 'Fund',
    order: 1
  },
  {
    _id: new ObjectId('608ba9cbc1656e7b68ab3ed4'),
    key: 'client',
    display: 'Client',
    order: 2
  },
  {
    _id: new ObjectId('611a61778699cfd5d32d81b7'),
    key: 'account',
    display: 'Account',
    order: 3
  }
];
