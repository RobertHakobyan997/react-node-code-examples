import { TwitterIcon } from '../../Icons/Authentication.icon'

import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'

import { useTwitterAuth } from '../../../hooks/useTwitterAuth'
import { TokensResponse } from '../../../types/auth.types'
import { saveStorageData } from '../../../utils/localStorage.utils'
import { LocalStorage } from '../../../constants/localStorage.constants'
import { useModal } from '../../../context/modal.context'
import { useLoader } from '../../../context/loader.context'
import { useAuth } from '../../../context/auth.context'

export function TwitterAuth() {
  const { provideModalSettings } = useModal()
  const { signIn } = useAuth()
  const handleSuccess = ({ access, refresh }: TokensResponse) => {
    saveStorageData(LocalStorage.a, access)
    saveStorageData(LocalStorage.r, refresh)
    signIn({ access })
  }

  const handleError = (errorMessage: string) => {
    provideModalSettings({ content: errorMessage })
  }

  const { getAuth, isLoading } = useTwitterAuth({
    onSuccess: handleSuccess,
    onError: handleError,
  })

  useLoader(isLoading)

  return (
    <Button type="button" variant={ButtonVariants.Icon} handleClick={getAuth}>
      <TwitterIcon />
    </Button>
  )
}
