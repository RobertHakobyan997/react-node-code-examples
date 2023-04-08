const { getUsers } = require('./users-collection-data/users');
const { manageRolesPermissions } = require('./users-collection-data/manage-roles-permissions');

module.exports = {
  async up(db) {
    const insertIntoCollection = async (db, collectionName, callback) => {
      let collection = db.collection(collectionName);
      if (!collection) {
        collection = db.createCollection(collectionName);
      }
      await collection.insertMany(callback());
    };

    insertIntoCollection(db, 'users', getUsers);
    insertIntoCollection(db, 'manage-roles-permissions', manageRolesPermissions);
  },

  async down(db) {
    await db.dropCollection('users');
  },
};
