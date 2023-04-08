import { SharedRouteConstants } from './sharedRoute.constants'

export const GoogleAuthConstant = {
  auth_url: 'https://accounts.google.com/o/oauth2/v2/auth',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  prompt: 'select_account',
  access_type: 'offline',
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '',
  redirect_uri: `${
    process.env.REACT_APP_FRONTEND_BASE_URL
  }${SharedRouteConstants.login()}`,
}

export const FacebookAuthConstant = {
  auth_url: 'https://www.facebook.com/v7.0/dialog/oauth',
  client_id: process.env.REACT_APP_FACEBOOK_CLIENT_ID ?? '',
  redirect_uri: `${
    process.env.REACT_APP_FRONTEND_BASE_URL
  }${SharedRouteConstants.login()}`,
  scope: 'email',
}

export const TwitterAuthTokenConstant = {
  twitterApiKey: process.env.REACT_APP_FRONTEND_API_KEY_VALUE ?? '',
  twitterAuthUrl: (token: string) =>
    `https://api.twitter.com/oauth/authorize?oauth_token=${token}`,
}
