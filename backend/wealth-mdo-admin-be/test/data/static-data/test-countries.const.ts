import { ObjectId } from 'mongodb';

export const testCountries = [
  {
    _id: new ObjectId('61a4d918cd8dddba59fc161d'),
    key: 'various',
    display: 'Various',
    order: 1,
    region: 'international'
  },
  {
    _id: new ObjectId('61a4d918cd8dddba59fc171d'),
    key: 'unitedStates',
    display: 'United States',
    order: 2,
    region: 'northAmerica'
  },
  {
    _id: new ObjectId('61a4d962cd8dddba59fc171e'),
    key: 'canada',
    display: 'Canada',
    order: 3,
    region: 'northAmerica'
  }
];
