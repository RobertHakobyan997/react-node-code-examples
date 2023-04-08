import { ObjectId } from 'mongodb';

export const testScheduleStatuses = [
  {
    _id: new ObjectId('6078f858194984ad90f1b502'),
    key: 'ontime',
    display: 'On Time',
    order: 1,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b503'),
    key: 'late',
    display: 'Late',
    order: 2,
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b504'),
    key: 'missing',
    display: 'Missing',
    order: 3,
  }
];
