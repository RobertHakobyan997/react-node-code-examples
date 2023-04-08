import { startCase } from 'lodash';
import UserEvents from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/user-events';
import { ObjectId } from 'mongodb';

import { mockAuthRole, mockDBUser } from '../authorization';
import { EVENT_TYPE } from '../../../src/constants/events.const';

export const oldTestUser = {
  _id            : new ObjectId('5db311afef8df000195645b1'),
  appId          : new ObjectId('60a6584154f38159287a1a8e'),
  firstName      : 'Test Name',
  lastName       : 'Test Lastname',
  email          : 'test@mmc.com',
  globalProfileId: 1205615,
  activated      : true,
};

export const newTestUser = {
  ...oldTestUser,
  firstName: 'New Name',
};

export const testEvent: any = {
  _id         : new ObjectId('60a6584154f38159287a1a8c'),
  channel     : 'BE',
  topic       : '',
  source      : 'MDO',
  user        : {
    user : mockDBUser,
    roles: [ mockAuthRole ],
  },
  data        : {
    oldValue: {
      user : oldTestUser,
      roles: [ mockAuthRole ],
    },
    newValue: {
      user : newTestUser,
      roles: [ { ...mockAuthRole, name: 'Admin' } ],
    },
  },
  collectionId: new ObjectId('60a6584154f38159287a1a90'),
  createdAt   : '2021-05-20',
  updatedAt   : '2021-05-20',
};

export const testEventId = testEvent._id;
export const testEvents: UserEvents[] = [
  testEvent, testEvent,
];

export const userEvents: UserEvents[] = [
  { ...testEvent, topic: EVENT_TYPE.activated },
  { ...testEvent, topic: EVENT_TYPE.deactivated },
  { ...testEvent, topic: EVENT_TYPE.created },
  { ...testEvent, topic: EVENT_TYPE.modified },
  { ...testEvent, topic: EVENT_TYPE.deleted },
];

export const paginatedUserEvents = {
  docs  : userEvents,
  total : 5,
  limit : 50,
  offset: 0,
};

const mappedEventCommonData = {
  user     : `${mockDBUser.firstName} ${mockDBUser.lastName}`,
  createdAt: testEvent.createdAt,
  role     : 'Name',
};

export const mappedEvents = [
  {
    ...mappedEventCommonData,
    topic   : startCase(EVENT_TYPE.activated),
    oldValue: 'Status: Inactive',
    newValue: 'Status: Active',
  },
  {
    ...mappedEventCommonData,
    topic   : startCase(EVENT_TYPE.deactivated),
    oldValue: 'Status: Active',
    newValue: 'Status: Inactive',
  },
  {
    ...mappedEventCommonData,
    topic   : startCase(EVENT_TYPE.created),
    oldValue: '--',
    newValue: '--',
  },
  {
    ...mappedEventCommonData,
    topic   : startCase(EVENT_TYPE.modified),
    oldValue: `First Name: ${oldTestUser.firstName}, Role: ${startCase(mockAuthRole.name)}`,
    newValue: `First Name: ${newTestUser.firstName}, Role: Admin`,
  },
  {
    ...mappedEventCommonData,
    topic   : startCase(EVENT_TYPE.deleted),
    oldValue: '--',
    newValue: '--',
  },
];
