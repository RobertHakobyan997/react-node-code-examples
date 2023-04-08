const { getApps } = require('./auth-collection-data/apps');
const { getUsers } = require('./auth-collection-data/users');
const { getRoles } = require('./auth-collection-data/roles');
const { getRoleUser } = require('./auth-collection-data/role-users');
const { getPermissions } = require('./auth-collection-data/permissions');

module.exports = {
  async up(db) {
    const insertIntoCollection = async (db, collectionName, callback) => {
      let collection = db.collection(collectionName);
      if (!collection) {
        collection = db.createCollection(collectionName);
      }
      await collection.insertMany(callback());
    };

    await insertIntoCollection(db, 'users', getUsers);
    await insertIntoCollection(db, 'apps', getApps);
    await insertIntoCollection(db, 'roles', getRoles);
    await insertIntoCollection(db, 'role-users', getRoleUser);
    await insertIntoCollection(db, 'permissions', getPermissions);
  },

  async down(db) {
    const insertIntoCollection = async (db, collectionName, callback) => {
      let collection = db.collection(collectionName);
      if (!collection) {
        collection = db.createCollection(collectionName);
      }
      await collection.insertMany(callback());
    };

    await insertIntoCollection(db, 'users', getUsers);
    await insertIntoCollection(db, 'apps', getApps);
    await insertIntoCollection(db, 'roles', getRoles);
    await insertIntoCollection(db, 'role-users', getRoleUser);
    await insertIntoCollection(db, 'permissions', getPermissions);
  },
};
