import { ObjectId } from 'mongodb';

export const testDirections = [
  {
    _id: new ObjectId('608ba9cbc1656e7b68ab3ed5'),
    key: 'inbound',
    display: 'Inbound',
    order: 1,
  },
  {
    _id: new ObjectId('608ba9cbc1656e7b68ab3ed6'),
    key: 'outbound',
    display: 'Outbound',
    order: 2,
  },
  {
    _id: new ObjectId('608ba9cbc1656e7b68ab3ed7'),
    key: 'error',
    display: 'Error',
    order: 3,
  }
];
