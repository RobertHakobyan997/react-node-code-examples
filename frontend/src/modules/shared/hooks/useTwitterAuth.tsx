import { TwitterAuthTokenConstant } from '../constants/auth.constants'
import { loginTwitter, twitterRequestToken } from '../services/login.services'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { errorHandler } from '../utils/error.utils'
import { ErrorResponse } from '../types/error.types'

export const useTwitterAuth = ({
  onSuccess,
  onError,
}: {
  onSuccess: (code: any) => void
  onError: (message: string) => void
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [twitterKeys, setTwitterKeys] = useState<any>({
    oauth_token: '',
  })

  const twitterRequestTokenMutation = useMutation(twitterRequestToken, {
    onSuccess: (twitterData) => {
      if (twitterData) setTwitterKeys(twitterData)
    },
    onError: (error) => {
      const errorMessage = errorHandler(error as ErrorResponse)
      onError(errorMessage)
    },
  })

  const loginTwitterMutation = useMutation(loginTwitter, {
    onSuccess: (response) => {
      if (response) onSuccess(response)
    },
    onError: (error) => {
      const errorMessage = errorHandler(error as ErrorResponse)
      onError(errorMessage)
    },
  })

  const getAuth = () => {
    twitterRequestTokenMutation.mutate()
  }

  useEffect(() => {
    const oauthToken = searchParams.get('oauth_token')
    const oauthVerifier = searchParams.get('oauth_verifier')

    if (oauthToken && oauthVerifier) {
      loginTwitterMutation.mutate({ oauthToken, oauthVerifier })
      setSearchParams('')
    }

    if (twitterKeys.oauth_token)
      window.location.href = TwitterAuthTokenConstant.twitterAuthUrl(
        twitterKeys.oauth_token
      )
  }, [location.search, twitterKeys.oauth_token])

  const isLoading =
    twitterRequestTokenMutation.isLoading || loginTwitterMutation.isLoading

  return { getAuth, isLoading }
}
