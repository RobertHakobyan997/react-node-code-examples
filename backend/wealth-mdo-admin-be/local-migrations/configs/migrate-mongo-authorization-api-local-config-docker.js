// In this file you can configure migrate-mongo

const localConfig = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: 'mongodb://mdo-mongo:27017',

    // TODO Change this to your database name:
    databaseName: 'merceros-authorization',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'local-migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',
};

// Return the config as a promise
module.exports = localConfig;
