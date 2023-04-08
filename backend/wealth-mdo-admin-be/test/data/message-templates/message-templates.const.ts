import { ObjectId } from 'mongodb';

export const testMessageTemplate = {
  _id: new ObjectId('621cd924d11c0f5074ee0cbb'),
  key: 'holidayCalendarExpiration',
  holidayCalendarExpiration: 'holidayCalendarExpiration',
  method: 'email',
  template: 'Calendar name: __calendarName__'
};
