import { ButtonVariants } from '../../general/Button/Button.types'
import { Button } from '../../general/Button/Button'
import { useSocialMediaAuth } from '../../../hooks/useSocialMediaAuth'
import { SocialMediaProvider, TokensResponse } from '../../../types/auth.types'
import { useMutation } from 'react-query'

import { saveStorageData } from '../../../utils/localStorage.utils'
import { LocalStorage } from '../../../constants/localStorage.constants'
import { useAuth } from '../../../context/auth.context'
import { useLoader } from '../../../context/loader.context'
import { useModal } from '../../../context/modal.context'
import { errorHandler } from '../../../utils/error.utils'
import { ErrorResponse } from '../../../types/error.types'

export function SocialAuth({
  authService,
  icon,
  socialMedia,
}: {
  socialMedia: SocialMediaProvider
  authService: ({ code }: { code: string }) => Promise<TokensResponse>
  icon: JSX.Element
}) {
  const { mutate, isLoading } = useMutation(authService)
  const { handleLoader } = useLoader()
  const { signIn } = useAuth()

  const { provideModalSettings } = useModal()

  const handleSuccess = (code: string) => {
    mutate(
      { code },
      {
        onSuccess({ access, refresh }: TokensResponse) {
          if (refresh) {
            saveStorageData(LocalStorage.r, refresh)
            saveStorageData(LocalStorage.a, access)
            signIn({ access })
          }
        },

        onError(error) {
          handleLoader(false)
          const errorMessage = errorHandler(error as ErrorResponse)
          provideModalSettings({ content: errorMessage })
        },
      }
    )
  }

  const { getAuth } = useSocialMediaAuth({
    socialMedia,
    onSuccess: handleSuccess,
  })

  useLoader(isLoading)

  return (
    <Button type="button" handleClick={getAuth} variant={ButtonVariants.Icon}>
      {icon}
    </Button>
  )
}
