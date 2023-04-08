const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { ObjectId } = require('mongodb');

require('dotenv').config();

const folder = resolve(process.cwd(), process.env.DAM_DB_FILES_DIR_PATH);

const getListOfFiles = () => readdirSync(folder).filter(file => file.endsWith('.json'));
const getCollectionName = file => file.replace('.json', '');
const castToObjectId = id => ObjectId(id.replace('ObjectId(\'', '').replace('\')', ''));
const getCollectionData = file => {
  const data = JSON.parse(readFileSync(`${folder}/${file}`).toString());
  return data.map(el => ({ ...el, '_id': castToObjectId(el._id) }));
};

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        for (const file of getListOfFiles()) {
          const collection = await db.createCollection(getCollectionName(file));
          await collection.insertMany(getCollectionData(file));
        }
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        for (const file of getListOfFiles()) await db.dropCollection(getCollectionName(file));
      });
    } finally {
      await session.endSession();
    }
  },
};
