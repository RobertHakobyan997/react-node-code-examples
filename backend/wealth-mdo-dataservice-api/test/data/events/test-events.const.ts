import * as faker from 'faker';
import { Schema as MongooseSchema } from 'mongoose';
import { ObjectId } from 'mongodb';
import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { plainToClass } from 'class-transformer';
import EventsModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/events';
import { EventChannel, ScheduleStatus, EventSource } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { testMetadataId } from '../files-metadata/test-files-metadata.const';

function getTestEventRaw() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);
  return {
    _id    : new ObjectId().toString(),
    channel: 'Client_Digest',
    topic  : 'SAVE_PLAN_FROM_SUMMARY',
    source : 'BOTF',
    user   : {
      userId: new ObjectId().toString(),
      firstName,
      lastName,
      email,
      meta  : faker.internet.userAgent(),
      userIp: faker.internet.ip(),
    } as any,
    data: {
      camundaInstanceId: '',
      taskId           : '',
    } as unknown as MongooseSchema.Types.Mixed,
    collectionId: new ObjectId(),
  };
}

export const testEventRaw = getTestEventRaw();
export const testEvent: Events = plainToClass(EventsModel, getTestEventRaw());
export const testEvents: Events[] = new Array(100).fill(null).map(() => plainToClass(EventsModel, getTestEventRaw()));

export const testSortedEvents = {
  page     : 1,
  totalDocs: 10,
  docs     : testEvents.map(event => ({
    ...event,
    channel     : EventChannel.FileScheduleStatus,
    topic       : ScheduleStatus.onTime,
    source      : EventSource.Camunda,
    collectionId: new ObjectId(testMetadataId)
  })),
  hasNextPage  : false,
  hasPrevPage  : false,
  limit        : 50,
  nextPage     : null,
  offset       : 0,
  pagingCounter: 1,
  prevPage     : null,
  totalPages   : 1
};
