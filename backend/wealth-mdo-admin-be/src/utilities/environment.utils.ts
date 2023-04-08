export const ENV_LOCAL = 'dev';
export const ENV_DEV = 'development';
export const ENV_PROD = 'prod';

export const IS_LOCAL = process.env.NODE_ENV === ENV_LOCAL;
export const IS_DEV = process.env.NODE_ENV === ENV_DEV;
export const IS_PROD = process.env.NODE_ENV === ENV_PROD;
