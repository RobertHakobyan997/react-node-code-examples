import Flex from '../../general/Flex/Flex'
import { AppThemeConstants } from '../../../constants/style.constants'
import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'
import { logoutModalUseStyles } from '../Logout/LogoutModal.styles'
import { useModal } from 'src/modules/shared/context/modal.context'
import { ModalVariant } from 'src/modules/shared/types/modal.types'

export function DeactivateAccountModal({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const styles = logoutModalUseStyles()
  const { provideModalSettings } = useModal()

  const handleCancel = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Popup,
      isVisible: false,
    })
  }

  return (
    <div className={styles.wrapper}>
      <Flex alignItems="center" justifyContent="center" direction="column">
        <div>
          <p className={styles.title}>Деактивация аккаунта</p>
          <p
            style={{ color: AppThemeConstants.textColor, textAlign: 'center' }}
          >
            Вы действительно хотите деактивировать ваш аккаунт?
          </p>
        </div>

        <div className={styles.actionsWrapper}>
          <div className={styles.buttonWrapper}>
            <Button
              handleClick={handleCancel}
              variant={ButtonVariants.Secondary}
            >
              Нет
            </Button>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              handleClick={onSuccess}
              variant={ButtonVariants.Primary}
              style={{ background: AppThemeConstants.dangerColor }}
            >
              Да
            </Button>
          </div>
        </div>
      </Flex>
    </div>
  )
}
