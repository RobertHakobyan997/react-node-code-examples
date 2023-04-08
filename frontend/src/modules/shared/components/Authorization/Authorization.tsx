import { authorizationUseStyles } from './Authorization.styles'
import Flex from '../general/Flex/Flex'
import React from 'react'
import { useMutation } from 'react-query'
import { otpVerify } from '../../services/auth.services'
import { useLoader } from '../../context/loader.context'
import {
  deleteStorageData,
  getStorageData,
  saveStorageData,
} from '../../utils/localStorage.utils'
import { LocalStorage } from '../../constants/localStorage.constants'
import { useAuth } from '../../context/auth.context'
import { useModal } from '../../context/modal.context'
import { Button } from '../general/Button/Button'
import { ButtonVariants } from '../general/Button/Button.types'
import { loginEmail } from '../../services/login.services'
import { ErrorResponse } from '../../types/error.types'
import { errorHandler } from '../../utils/error.utils'
import { OtpInput } from '../general/OtpInput/OtpInput'
import { TokensResponse } from '../../types/auth.types'
import { useNavigate } from 'react-router-dom'
import { SharedRouteConstants } from '../../constants/sharedRoute.constants'

export function AuthorizationHeader() {
  const { headerText, descriptionText } = authorizationUseStyles()
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{ marginBottom: '20px' }}
    >
      <div>
        <h1 className={headerText}>Введите код подтверждения</h1>
        <p className={descriptionText}>
          Мы отправили вам код по электронной почте
        </p>
      </div>
    </Flex>
  )
}

export function AuthorizationRenderer() {
  const { authorizationWrapper, codeText } = authorizationUseStyles()
  const resendEmailMutation = useMutation(loginEmail)
  const { mutate, isLoading } = useMutation(otpVerify)
  const { signIn } = useAuth()
  const { provideModalSettings } = useModal()
  const navigate = useNavigate()

  const handleOtp = (otp: string) => {
    mutate(
      { passcode: otp, email: getStorageData(LocalStorage.e) },
      {
        onSuccess: async ({ access, refresh }: TokensResponse) => {
          if (refresh) {
            saveStorageData(LocalStorage.r, refresh)
            saveStorageData(LocalStorage.a, access)
            deleteStorageData(LocalStorage.e)
            await signIn({ access })
            await navigate(SharedRouteConstants.createProfile())
          }
        },

        onError: (error) => {
          const errorMessage = errorHandler(error as ErrorResponse)
          provideModalSettings({ content: errorMessage })
        },
      }
    )
  }

  const handleResendEmail = () => {
    resendEmailMutation.mutate(
      { email: getStorageData(LocalStorage.e) },
      {
        onError: (error) => {
          const errorMessage = errorHandler(error as ErrorResponse)
          provideModalSettings({ content: errorMessage })
        },
      }
    )
  }

  useLoader(isLoading || resendEmailMutation.isLoading)

  return (
    <div>
      <AuthorizationHeader />

      <OtpInput inputsLength={6} handleAction={handleOtp} />

      <div className={authorizationWrapper} style={{ marginTop: '20px' }}>
        <span className={codeText}>Не получили код?</span>
        <Button
          type={'button'}
          handleClick={handleResendEmail}
          variant={ButtonVariants.Text}
        >
          Отправить снова
        </Button>
      </div>
    </div>
  )
}
