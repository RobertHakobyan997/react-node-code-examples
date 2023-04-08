export default {
  // NODE
  env: process.env.NODE_ENV,

  // APP_CONFIG
  host: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  name: process.env.APP_NAME,

  // FRONTEND
  frontendHost: process.env.APP_FRONTEND_HOST,

  // SWAGGER
  version: process.env.APP_VERSION,

  // CORS
  cors: process.env.APP_CORS,
};
