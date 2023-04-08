import { ObjectId } from 'mongodb';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

export const timeZones: TimeZones[] = [
  {
    _id    : new ObjectId('61aa29d64977c31c645665da'),
    source : 'IANA-specified zones',
    key    : 'Etc/UTC',
    display: 'UTC',
    order  : 1,
    hidden : false,
  },
  {
    _id    : new ObjectId('61aa29dc71439947d7f09d56'),
    source : 'IANA-specified zones',
    key    : 'America/New_York',
    display: 'US/Eastern',
    order  : 2,
    hidden : false,
  }
];
