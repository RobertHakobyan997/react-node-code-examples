const faker = require('faker');
const { Types } = require('mongoose');
const { ScheduleStatus } = require('ngpd-merceros-wealth-mdo-common-be/dist/constants');

const COLLECTION_NAME = 'events';

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        const collection = await db.createCollection(COLLECTION_NAME);
        const events = [];
        const metadatas = await db.collection('files-metadata').find().toArray();
        const files = await db.collection('files').find().toArray();

        for (const metadata of metadatas) {
          const scheduleStatus = metadata.state.scheduleStatus;
          const fileId = scheduleStatus === ScheduleStatus.alert
            ? ''
            : (files.find(f => f.scheduleStatus === scheduleStatus)?.fileId ?? '');
          events.push({
            _id    : Types.ObjectId(),
            channel: 'File_Schedule_Status',
            topic  : scheduleStatus,
            source : 'Camunda',
            user   : {},
            data   : {
              camundaInstanceId: Types.ObjectId(),
              taskId           : faker.datatype.number(1000),
              fileId           : fileId,
            },
            collectionId: metadata._id,
            createdAt   : new Date(),
            updatedAt   : new Date(),
          });
        }

        await collection.insertMany(events);
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.dropCollection(COLLECTION_NAME);
      });
    } finally {
      await session.endSession();
    }
  },
};

