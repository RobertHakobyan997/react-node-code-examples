import { ObjectId } from 'mongodb';

export const testQuickDateFilters = [
  {
    _id: new ObjectId('6078f858194984ad90f1b507'),
    key: '24h',
    display: '24 Hours',
    order: 1,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    key: '3d',
    display: '3 Days',
    order: 2,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b505'),
    key: '3m',
    display: '3 Months',
    order: 5,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b504'),
    key: '1y',
    display: '1 Year',
    order: 7,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b503'),
    key: 'all',
    display: 'All Years',
    order: 11,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b502'),
    key: 'custom',
    display: 'Custom Date Range',
    order: 12,
  },
];
