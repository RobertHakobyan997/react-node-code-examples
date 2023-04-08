import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { profileHeaderUseStyles } from './ProfileHeader.styles'
import { useAuth } from '../../../context/auth.context'

import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'
import { Logout } from '../../Icons/Authentication.icon'
import Flex from '../../general/Flex/Flex'
import { useModal } from '../../../context/modal.context'
import { LogoutModal } from '../../Modals/Logout/Logout.modal'
import { ModalVariant } from '../../../types/modal.types'

import { updateUserService } from '../../../services/auth.services'

import { useLoader } from '../../../context/loader.context'
import { RubliIconRound } from '../../Icons/Amount.icon'

const AccountSettings = ({ handleLogout }: { handleLogout: () => void }) => {
  const { moneyText } = profileHeaderUseStyles()
  const {
    userState: { user },
  } = useAuth()

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{ marginRight: '2rem' }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        style={{ marginRight: '1.25rem' }}
      >
        <span className={moneyText}>
          {user?.balance.toLocaleString('en-US') ?? 0}
        </span>
        <RubliIconRound />
      </Flex>

      <Button handleClick={handleLogout} variant={ButtonVariants.Text}>
        <Logout />
      </Button>
    </Flex>
  )
}

export function ProfileHeader({
  isSettingsShown,
}: {
  isSettingsShown: boolean
}) {
  const navigate = useNavigate()
  const { userState, logOut } = useAuth()
  const { header } = profileHeaderUseStyles()
  const { provideModalSettings } = useModal()
  const userDeactivationMutation = useMutation(updateUserService)
  const isUserExist = userState.user && userState.user.role

  const closeModal = () => {
    provideModalSettings({ isVisible: false })
  }

  const onSuccessLogout = () => {
    closeModal()
    logOut()
    navigate('/')
  }

  // const handleContact = () => {
  //   provideModalSettings({
  //     modalVariant: ModalVariant.Modal,
  //     content: <div>Contact us</div>,
  //   })
  // }

  const handleLogout = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: (
        <LogoutModal onCancel={closeModal} onSuccess={onSuccessLogout} />
      ),
    })
  }

  useLoader(userDeactivationMutation.isLoading)

  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-end" className={header}>
        {isUserExist && isSettingsShown && (
          <AccountSettings
            handleLogout={handleLogout}
            // handleContact={handleContact}
          />
        )}
      </Flex>
    </div>
  )
}
