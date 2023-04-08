import getenv from 'getenv';

export default {
  getConfigEnabled: getenv.bool('DEV_GET_CONFIG_ENABLED', false),
  getEnvEnabled: getenv.bool('DEV_GET_ENV_ENABLED', false),
  authorizationAccessKey: process.env.DAM_EXPORT_ACCESS_KEY,
  dataAccessModule: {
    accessKey: process.env.DAM_EXPORT_ACCESS_KEY,
    importKey: process.env.DAM_IMPORT_ACCESS_KEY,
    allowWrite: getenv.bool('DAM_DATA_ACCESS_ALLOW_WRITE', false),
    dbConnectionToken: process.env.DAM_DB_CONNECTION_TOKEN,
    dbFilesDirPath: process.env.DAM_DB_FILES_DIR_PATH,
    collectionsList: process.env.DAM_COLLECTIONS_LIST.split(','),
  },
};
