import { ComponentWithChildren } from '../../../types/component.types'
import { forwardRef, useRef } from 'react'

import useOnclickOutside from '../../../hooks/useOutsideClick'
import { Button } from '../../general/Button/Button'
import { ButtonVariants } from '../../general/Button/Button.types'
import { CloseIcon } from '../../Icons/Close.icon'
import { modalUseStyles } from './ModalLayout.styles'

interface ModalProps extends ComponentWithChildren {
  handleClose: () => void
  hasCloseButton: boolean
}

export const ModalLayout = forwardRef<HTMLDivElement | {}, ModalProps>(
  ({ children, handleClose, hasCloseButton = false }: ModalProps, ref) => {
    const modalContentRef = useRef(null)
    const styles = modalUseStyles()

    useOnclickOutside(modalContentRef, () => {
      handleClose()
    })

    return (
      <div
        className={styles.modalWrapper}
        ref={ref as any}
        style={{ opacity: 0 }}
      >
        <div
          ref={modalContentRef}
          className={styles.modalContent}
          style={{ overflow: 'overlay' }}
        >
          {hasCloseButton && (
            <div
              style={{ position: 'absolute', right: '1.25rem', top: '1.25rem' }}
            >
              <Button handleClick={handleClose} variant={ButtonVariants.Text}>
                <CloseIcon />
              </Button>
            </div>
          )}
          {children}
        </div>
      </div>
    )
  }
)
