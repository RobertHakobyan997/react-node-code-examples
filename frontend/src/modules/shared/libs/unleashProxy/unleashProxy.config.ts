export const unleashProxyConfig = {
  url: process.env.REACT_APP_UNLEASH_URL as string,
  clientKey: process.env.REACT_APP_UNLEASH_PROXY_CLIENT_KEYS as string,
  refreshInterval: 3600,
  appName: process.env.REACT_APP_UNLEASH_APP_NAME as string,
  environment: process.env.REACT_APP_UNLEASH_ENV as string,
}
