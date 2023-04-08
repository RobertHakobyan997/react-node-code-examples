import { IAuthClientConfig } from 'ngpd-merceros-authorization-client-be';

export const authClientConfig: IAuthClientConfig = {
  host: process.env.AUTHORIZATION_API_HOST,
  apikey: process.env.AUTHORIZATION_API_KEY,
};
