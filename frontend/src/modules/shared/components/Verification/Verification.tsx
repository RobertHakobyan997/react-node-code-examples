import {
  sumsubStylesString,
  verificationUseStyles,
} from './Verification.styles'
import { Button } from '../general/Button/Button'
import { ButtonVariants } from '../general/Button/Button.types'
import Flex from '../general/Flex/Flex'
import { useModal } from '../../context/modal.context'
import { ModalVariant } from '../../types/modal.types'
import SumsubWebSdk from '@sumsub/websdk-react'
import { generateSumsubAccessToken } from '../../services/verification.services'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useAuth } from '../../context/auth.context'
import { User, UserVerificationStatus } from '../../types/user.types'
import { ErrorMessage } from '../../constants/message.constants'
import { getUser } from 'src/modules/shared/services/auth.services'
import { useFlag } from '@unleash/proxy-client-react'
import { FeatureFlag } from 'src/modules/shared/constants/featureFlag.constants'

const Verifier = ({ updatedUser }: { updatedUser: (user: User) => void }) => {
  const styles = verificationUseStyles()
  const { provideModalSettings } = useModal()
  const { userState } = useAuth()

  const [accessToken, setAccessToken] = useState('')
  const userDataMutation = useMutation(getUser, {
    onSuccess: (data) => {
      if (
        data.verification_status === 'Verified' &&
        userState.user?.verification_status !== 'Verified'
      )
        updatedUser(data)
    },
  })
  const accessTokenMutation = useMutation(generateSumsubAccessToken, {
    onSuccess: ({ access_token }) => setAccessToken(access_token),
    onError: () => {
      provideModalSettings({
        content: ErrorMessage.default(),
        modalVariant: ModalVariant.Popup,
      })
    },
  })

  const handleMessage = (sdkEvent: string, eventResult: any) => {
    console.log({ sdkEvent, eventResult })
  }

  const errorHandler = () =>
    provideModalSettings({
      content: ErrorMessage.default(),
      modalVariant: ModalVariant.Popup,
    })

  const accessTokenExpirationHandler = async () => {
    const { access_token } = await generateSumsubAccessToken()
    setAccessToken(access_token)
    return access_token
  }

  useEffect(() => {
    accessTokenMutation.mutate()

    return () => {
      userDataMutation.mutate({ uuid: userState.uuid ?? '' })
    }
  }, [])

  if (accessToken) {
    return (
      <Flex justifyContent="center" style={{ overflow: 'auto', width: '100%' }}>
        <div className={styles.sumsubWrapper}>
          <SumsubWebSdk
            accessToken={accessToken}
            expirationHandler={accessTokenExpirationHandler}
            config={{
              lang: 'ru',
              country: 'RUS',
              uiConf: {
                customCssStr: sumsubStylesString,
              },
            }}
            options={{}}
            onMessage={handleMessage}
            onError={errorHandler}
          />
        </div>
      </Flex>
    )
  }

  return null
}

const VerificationStatusToButton = {
  [UserVerificationStatus.Pending]: {
    variant: ButtonVariants.Pending,
    text: 'В oжидании',
  },

  [UserVerificationStatus.Rejected]: {
    variant: ButtonVariants.Fail,
    text: 'Отклоненный',
  },

  [UserVerificationStatus.Verified]: {
    text: 'Верифицирован',
    variant: ButtonVariants.Success,
  },
}

export function Verification() {
  const { userState } = useAuth()
  const [isVisible, setIsVisible] = useState(true)

  const [verificationStatusState, setVerificationStatusState] = useState(
    UserVerificationStatus.NotStarted
  )
  const { provideModalSettings } = useModal()

  const styles = verificationUseStyles()

  const enabled = useFlag(FeatureFlag.SumsubVerificationComponent)

  const handleBecomeVerified = (user: User) => {
    setVerificationStatusState(user.verification_status)
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  const handleVerification = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <Verifier updatedUser={handleBecomeVerified} />,
      hasModalCloseButton: true,
    })
  }

  const userVerificationStatus = userState.user?.verification_status
  const verificationStatusData =
    VerificationStatusToButton[verificationStatusState]
  const isValidStatus =
    verificationStatusState !== UserVerificationStatus.NotStarted

  useEffect(() => {
    if (enabled || userVerificationStatus === UserVerificationStatus.Verified) {
      setIsVisible(false)
    }

    if (userVerificationStatus)
      setVerificationStatusState(userVerificationStatus)
  }, [userVerificationStatus, enabled])

  if (!isVisible) {
    return null
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div className={styles.wrapper}>
        <div className={styles.verificationInfo}>
          <h1 className={styles.header}>Верификация Аккаунта</h1>
          {isValidStatus && (
            <Button
              variant={verificationStatusData?.variant ?? ButtonVariants.Text}
              style={{ cursor: 'text' }}
            >
              {verificationStatusData?.text}
            </Button>
          )}
        </div>
        <p className={styles.description}>
          Аккаунт пока что не верифицирован, пожалуйста заполните необходимые
          данные чтобы пользоватся сервисом.
        </p>

        <div className={styles.buttonWrapper}>
          <Button
            variant={ButtonVariants.Primary}
            handleClick={handleVerification}
            isButtonInteractive={
              !(
                userState?.user?.verification_status ===
                UserVerificationStatus.Pending
              )
            }
          >
            Верифицировать
          </Button>
        </div>
      </div>
    </div>
  )
}
