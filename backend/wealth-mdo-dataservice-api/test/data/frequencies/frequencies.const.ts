import { ObjectId } from 'mongodb';
import Frequencies from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/frequencies';

export const frequencies: Frequencies[] = [
  {
    _id                   : new ObjectId('61aa29d64977c31c645665da'),
    key                   : 'ContinuousMonthly',
    display               : 'Continuous Monthly',
    possibleExpectedDays  : [ 'AllWorkDays', 'AllDaysOfWeek' ],
    isMultipleExpectedDays: false,
    order                 : 1,
    hidden                : false,
  },
  {
    _id                   : new ObjectId('61aa29dc71439947d7f09d56'),
    key                   : 'Daily',
    display               : 'Daily',
    order                 : 2,
    possibleExpectedDays  : [ 'AllWorkDays', 'AllDaysOfWeek' ],
    isMultipleExpectedDays: false,
    hidden                : false,
  },
  {
    _id                   : new ObjectId('61aa29e015f5cf0fdb3c9355'),
    key                   : 'Weekly',
    display               : 'Weekly',
    possibleExpectedDays  : [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
    isMultipleExpectedDays: true,
    order                 : 3,
    hidden                : false,
  }
];
