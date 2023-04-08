import getenv from 'getenv';

export default () => ({
  // NODE
  env: getenv('NODE_ENV', ''),

  // APP_CONFIG
  host: getenv('APP_HOST', 'localhost'),
  port: getenv.int('APP_PORT', 3002),
  name: getenv('APP_NAME', 'data-service-api'),

  // FRONTEND
  frontendHost: getenv('APP_FRONTEND_HOST', ''),

  // SWAGGER
  version: getenv('APP_VERSION', '1.0'),

  // DataDog
  ddEnv       : getenv('NODE_ENV', ''),
  ddService   : getenv('DD_SERVICE', ''),
  // this environment is set at the container level and managed by DevOps
  ddHost      : getenv('MERCEROS_KUBERNETES_HOST_IP', ''),
  ddEnabled   : getenv.bool('DD_TRACE_ENABLED', false),
  ddVersion   : getenv('DD_VERSION', '1.0'),
  ddSampleRate: getenv.int('DD_TRACE_SAMPLE_RATE', 1),
});
