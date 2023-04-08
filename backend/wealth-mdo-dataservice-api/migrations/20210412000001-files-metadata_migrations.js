const { readFileSync } = require('fs');
const { resolve } = require('path');
const { Types } = require('mongoose');

require('dotenv').config();

const folder = resolve(process.cwd(), process.env.DAM_DB_FILES_DIR_PATH);
const requiredFileName = 'files-metadata.json';

const idProperties = [ '_id', 'holidayCalendarId' ];
const dateProperties = [ 'lastProcessTime', 'lastPollTime', 'lastFileUploadedTime' ];

const getCollectionName = file => file.replace('.json', '');

const castValues = el => {
  let prop;
  if (el instanceof Object) {
    for (prop in el) {
      if (el[prop] && el[prop] instanceof Object) {
        castValues(el[prop]);
      } else if (el[prop]) {
        if (idProperties.includes(prop)) el[prop] = Types.ObjectId(el[prop]);
        else if (dateProperties.includes(prop)) el[prop] = new Date(el[prop]);
      }
    }
  }

  return el;
};

const getCollectionData = () => {
  const data = JSON.parse(readFileSync(`${folder}/${requiredFileName}`).toString());
  return data.map(el => castValues(el));
};

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        const collection = await db.createCollection(getCollectionName(requiredFileName));
        await collection.insertMany(getCollectionData());
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.dropCollection(getCollectionName());
      });
    } finally {
      await session.endSession();
    }
  },
};
