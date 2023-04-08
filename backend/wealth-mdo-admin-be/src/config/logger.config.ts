import appConfig from './app.config';

export default {
  serviceName: appConfig.name,
  appCode: process.env.LOGGER_APP_CODE,
  appSubComponent: process.env.LOGGER_APP_SUB_COMPONENT,
  level: process.env.LOGGER_LEVEL,
  json: process.env.LOGGER_JSON === 'true',
  showLevel: process.env.LOGGER_SHOW_LEVEL === 'true',
  timestamp: process.env.LOGGER_SHOW_TIMESTAMP === 'true',
  colorize: process.env.LOGGER_COLORIZE === 'true',
  coverConsole: process.env.LOGGER_COVER_CONSOLE === 'true',
  handleExceptions: process.env.LOGGER_HANDLE_EXCEPTIONS === 'true',
  loggerPrivacyLogRequestBody:
    process.env.LOGGER_PRIVACY_LOG_REQUEST_BODY === 'true',
  errorLogBrowserDetailed: process.env.ERROR_LOG_BROWSER_DETAILED === 'true',
};
