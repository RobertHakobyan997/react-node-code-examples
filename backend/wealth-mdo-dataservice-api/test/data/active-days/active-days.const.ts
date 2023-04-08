import { ObjectId } from 'mongodb';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

export const activeDays: Enum[] = [
  {
    _id    : new ObjectId('61aa29d64977c31c645665da'),
    key    : 'AllWorkDays',
    display: 'All Work Days',
    order  : 1,
    hidden : false,
  },
  {
    _id    : new ObjectId('61aa29dc71439947d7f09d56'),
    key    : 'AllDaysOfWeek',
    display: 'All Days of the Week',
    order  : 2,
    hidden : false,
  },
  {
    _id    : new ObjectId('61aa29e015f5cf0fdb3c9355'),
    key    : 'Monday',
    display: 'Monday',
    order  : 3,
    hidden : false,
  }
];
