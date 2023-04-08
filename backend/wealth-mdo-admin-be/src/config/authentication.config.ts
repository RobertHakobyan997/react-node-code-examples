import { AuthenticationOptions } from 'ngpd-merceros-authentication-be-components';
import { Logger } from 'ngpd-merceros-logger-be';
import * as os from 'os';

import communicationConfig from './communication.config';

const privateCert = process.env.AUTHENTICATION_SAML_PRIVATE_CERTIFICATE.replace(
  /\\n/g,
  os.EOL
);

const authenticationConfig: AuthenticationOptions = {
  jwtSecret: process.env.AUTHENTICATION_JWT_SECRET,
  jwtExpiresIn: +process.env.AUTHENTICATION_JWT_EXPIRES_IN,
  jwtRefreshTokenExpiresIn: +process.env
    .AUTHENTICATION_JWT_REFRESH_TOKEN_EXPIRES_IN,
  frontendUrl: process.env.AUTHENTICATION_FRONTEND_URL,
  loginRedirect: process.env.AUTHENTICATION_LOGIN_REDIRECT,
  successRedirect: process.env.AUTHENTICATION_SUCCESS_REDIRECT,
  failureRedirect: process.env.AUTHENTICATION_FAILURE_REDIRECT,
  accountLockedRedirect: process.env.AUTHENTICATION_ACCOUNT_LOCKED_REDIRECT,
  passwordExpiredRedirect: process.env.AUTHENTICATION_ACCOUNT_EXPIRED_REDIRECT,
  api: {
    app: process.env.AUTHENTICATION_APP_NAME,
    host: process.env.AUTHENTICATION_MSSO_API_HOST,
    apiKey: process.env.AUTHENTICATION_MSSO_API_KEY,
  },
  mfa: {
    enabled: process.env.AUTHENTICATION_MFA_ENABLED === 'true',
    host: process.env.AUTHENTICATION_MFA_HOST,
    apiKey: process.env.AUTHENTICATION_MFA_KEY,
    appScope: process.env.AUTHENTICATION_MFA_SCOPE,
  },
  saml: {
    entryPoint: process.env.AUTHENTICATION_SAML_ENTRY_POINT,
    issuer: process.env.AUTHENTICATION_SAML_ISSUER,
    callbackUrl: process.env.AUTHENTICATION_SAML_CALLBACK_URL,
    logoutUrl: process.env.AUTHENTICATION_SAML_LOGOUT_URL,
    logoutCallbackUrl: process.env.AUTHENTICATION_SAML_LOGOUT_CALLBACK_URL,
  },
  dev: {
    devModeEnabled: process.env.AUTHENTICATION_DEV_MODE_ENABLED === 'true',
    loginWhitelist: process.env.AUTHENTICATION_DEV_LOGIN_WHITELIST.split(','),
  },
  mailing: {
    communicationApiUrl: communicationConfig.apiUrl,
    communicationApiKey: communicationConfig.apiKey,
    applicationKey: communicationConfig.applicationKey,
    customEmails: {
      activation: true,
      forgotPassword: true,
      forgotPasswordSuccess: true,
    },
  },
  logger: Logger,
  endpoints: {
    dev: process.env.AUTHENTICATION_DEV_MODE_ENABLED === 'true',
  },
};

if (!authenticationConfig.jwtExpiresIn)
  delete authenticationConfig.jwtExpiresIn;

if (!authenticationConfig.jwtRefreshTokenExpiresIn)
  delete authenticationConfig.jwtRefreshTokenExpiresIn;

if (privateCert)
  authenticationConfig.saml.privateCert = privateCert;

export default authenticationConfig;
