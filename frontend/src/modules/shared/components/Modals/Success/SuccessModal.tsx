import { SuccessEffectsIcon } from 'src/modules/shared/components/Icons/Success.icon'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { successModalStyles } from 'src/modules/shared/components/Modals/Success/SuccessModal.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'
import { useModal } from 'src/modules/shared/context/modal.context'

export function SuccessModal({ message }: { message: string }) {
  const styles = successModalStyles()
  const { provideModalSettings } = useModal()

  const handleClose = () =>
    provideModalSettings({
      isVisible: false,
    })

  return (
    <Flex
      direction={'column'}
      justifyContent="center"
      alignItems={'center'}
      className={styles.wrapper}
    >
      <div>
        <p className={styles.text}>{message}</p>
      </div>

      <div className={styles.successIconWrapper}>
        <SuccessEffectsIcon />
      </div>

      <div>
        <Button
          style={{ padding: '10px 16px' }}
          color={AppThemeConstants.primaryColor}
          variant={ButtonVariants.Outlined}
          handleClick={handleClose}
        >
          Закрыть
        </Button>
      </div>
    </Flex>
  )
}
