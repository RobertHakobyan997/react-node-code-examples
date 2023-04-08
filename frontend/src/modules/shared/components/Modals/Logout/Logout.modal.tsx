import Flex from '../../general/Flex/Flex'
import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'
import { logoutModalUseStyles } from './LogoutModal.styles'
import { AppThemeConstants } from '../../../constants/style.constants'

export function LogoutModal({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void
  onSuccess: () => void
}) {
  const styles = logoutModalUseStyles()

  return (
    <div className={styles.wrapper}>
      <Flex alignItems="center" justifyContent="center" direction="column">
        <div>
          <p className={styles.title}>Выход</p>

          <p style={{ color: AppThemeConstants.textColor }}>
            Вы действительно хотите выйти?
          </p>
        </div>
        <div className={styles.actionsWrapper}>
          <div className={styles.buttonWrapper}>
            <Button handleClick={onCancel} variant={ButtonVariants.Secondary}>
              Отмена
            </Button>
          </div>
          <div className={styles.buttonWrapper}>
            <Button handleClick={onSuccess} variant={ButtonVariants.Primary}>
              Выйти
            </Button>
          </div>
        </div>
      </Flex>
    </div>
  )
}
