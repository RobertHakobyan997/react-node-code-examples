const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { Types } = require('mongoose');

require('dotenv').config();

const folder = resolve(process.cwd(), process.env.DAM_DB_FILES_DIR_PATH);
const excludedFiles = [ 'files-metadata.json' ];

const getListOfFiles = () => readdirSync(folder).filter(file => file.endsWith('.json') && !excludedFiles.includes(file));
const getCollectionName = file => file.replace('.json', '');
const castToObjectId = id => Types.ObjectId(id.replace('ObjectId(\'', '').replace('\')', ''));
const castToIsoDate = date => new Date(date.replace('ISODate(\'', '').replace('\')', ''));
const castValues = el => {
  const obj = Array.isArray(el) ? [] : {};
  for (const prop in el)
    if (Object.prototype.hasOwnProperty.call(el, prop)) {
      let value = el[prop];
      if (typeof (value) === 'object') value = castValues(value);
      if (String.prototype.startsWith.call(value, 'ObjectId(')) value = castToObjectId(value);
      if (String.prototype.startsWith.call(value, 'ISODate(')) value = castToIsoDate(value);
      obj[prop] = value;
    }
  return obj;
};

const getCollectionData = file => {
  const data = JSON.parse(readFileSync(`${folder}/${file}`).toString());
  return data.map(el => castValues(el));
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
