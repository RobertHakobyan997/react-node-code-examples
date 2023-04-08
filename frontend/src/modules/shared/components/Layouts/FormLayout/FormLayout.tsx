import { formLayoutUseStyles } from './FormLayout.styles'
import { ComponentWithChildren } from '../../../types/component.types'
import Flex from '../../general/Flex/Flex'
import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'
import { useModal } from '../../../context/modal.context'

interface FormLayoutProps extends ComponentWithChildren {
  isSubmitActive: boolean
  submitText?: string
  handleClose?: () => void
  toLeft?: boolean | null
  style?: {}
}

export function FormLayout({
  children,
  isSubmitActive,
  submitText = ' Сохранить',
  handleClose,
  toLeft,
  style,
}: FormLayoutProps) {
  const styles = formLayoutUseStyles()
  const { provideModalSettings, modalSettings } = useModal()

  const handleInnerClose = () => {
    if (modalSettings.isVisible)
      provideModalSettings({
        isVisible: false,
      })

    if (handleClose) handleClose()
  }

  return (
    <Flex
      alignItems={toLeft ? 'flex-start' : 'center'}
      justifyContent={toLeft ? 'flex-start' : 'center'}
      direction="column"
      className={styles.contentWrapper}
      style={style}
    >
      {children}

      <div className={styles.actionsWrapper}>
        <div className={styles.buttonWrapper}>
          <Button
            variant={ButtonVariants.Secondary}
            handleClick={handleInnerClose}
            style={{ fontWeight: 500 }}
          >
            Отмена
          </Button>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            type={isSubmitActive ? 'submit' : 'button'}
            isButtonInteractive={isSubmitActive}
            variant={ButtonVariants.Primary}
            style={{ fontWeight: 500 }}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </Flex>
  )
}
