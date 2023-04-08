import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { enhanceAuthorizeUrl } from '../utils/auth.utils'
import { SocialMediaProvider } from '../types/auth.types'
import {
  deleteStorageData,
  getStorageData,
  saveStorageData,
} from '../utils/localStorage.utils'
import { LocalStorage } from '../constants/localStorage.constants'

export const useSocialMediaAuth = ({
  onSuccess,
  socialMedia,
}: {
  onSuccess: (code: string) => any
  socialMedia: SocialMediaProvider
}) => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const getAuth = () => {
    const socialAuthPath = enhanceAuthorizeUrl(socialMedia)
    saveStorageData(LocalStorage.socialAuth, socialAuthPath)
    window.location.href = socialAuthPath
  }

  useEffect(() => {
    const code = searchParams.get('code')
    const socialAuthLocal = getStorageData(LocalStorage.socialAuth)
    const isRedirectedFromSocialMedia =
      socialAuthLocal && socialAuthLocal.includes(socialMedia)

    if (code && isRedirectedFromSocialMedia) {
      onSuccess(code)
      deleteStorageData(LocalStorage.socialAuth)
      setSearchParams('')
    }
  }, [location.search])

  return { getAuth }
}
