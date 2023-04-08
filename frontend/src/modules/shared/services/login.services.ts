import axiosConfigured from '../libs/axios/main.config'
import { TwitterAuthTokenConstant } from '../constants/auth.constants'
import { TokensResponse, TwitterTokenResponse } from '../types/auth.types'

export async function loginGoogle({
  code,
}: {
  code: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post(`/accounts/login/google/`, { code })
    .then((res) => res.data)
}

export async function loginTwitter({
  oauthToken,
  oauthVerifier,
}: {
  oauthToken: string
  oauthVerifier: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post(`/accounts/login/twitter/`, {
      oauth_verifier: oauthVerifier,
      oauth_token: oauthToken,
    })
    .then((res) => res.data)
}

export async function twitterRequestToken(): Promise<TwitterTokenResponse> {
  return axiosConfigured
    .get(`/accounts/twitter/request-token/`, {
      headers: {
        'Frontend-Api-Key': TwitterAuthTokenConstant.twitterApiKey,
      },
    })
    .then((res) => res.data)
}

export async function loginFacebook({
  code,
}: {
  code: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post(`/accounts/login/facebook/`, { code })
    .then((res) => res.data)
}

export async function loginEmail({
  email,
}: {
  email: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post(`/accounts/login/email/`, { email })
    .then((res) => res.data)
}
