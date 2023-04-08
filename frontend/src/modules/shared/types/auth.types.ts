export interface TokensResponse {
  refresh: string
  access: string
}
export interface TwitterTokenResponse {
  oauth_token: string
}

export enum SocialMediaProvider {
  Google = 'google',
  Facebook = 'facebook',
}
