import { ObjectId } from 'mongodb';

export const testTimeZones = [
  {
    _id: new ObjectId('61af5c98a2733056fbd91cf3'),
    key: 'Etc/UTC',
    display: 'UTC',
    order: 1,
    source: 'IANA-specified zones'
  },
  {
    _id: new ObjectId('61af5cc37e28281eb5e2e7d3'),
    key: 'America/New_York',
    display: 'US/Eastern',
    order: 2,
    source: 'IANA-specified zones'
  },
  {
    _id: new ObjectId('61af5cc863bf761025a31cbe'),
    key: 'America/Chicago',
    display: 'US/Central',
    order: 3,
    soucre: 'IANA-specified zones'
  }
];
