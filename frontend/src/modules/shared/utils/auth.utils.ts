import { SocialMediaProvider } from '../types/auth.types'
import {
  FacebookAuthConstant,
  GoogleAuthConstant,
} from '../constants/auth.constants'

const getAuthData = (socialMedia: SocialMediaProvider) => {
  switch (socialMedia) {
    case SocialMediaProvider.Facebook:
      return FacebookAuthConstant
    case SocialMediaProvider.Google:
      return GoogleAuthConstant
  }
}

export const enhanceAuthorizeUrl = (socialMedia: SocialMediaProvider) => {
  const urlsAndParams = getAuthData(socialMedia)
  const { auth_url, ...params } = urlsAndParams

  const urlParams = new URLSearchParams(params as any).toString()

  return `${auth_url}?${urlParams}`
}
