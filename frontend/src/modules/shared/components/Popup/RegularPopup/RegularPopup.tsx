import { PopupVariant } from '../../../types/modal.types'
import { popupUseStyles } from './RegularPopup.styles'
import { ErrorIcon } from '../../Icons/Error.icon'
import Flex from '../../general/Flex/Flex'
import { SuccessIconPopup } from 'src/modules/shared/components/Icons/Success.icon'

const getPopupHeader = (variant: PopupVariant) => {
  switch (variant) {
    case PopupVariant.Error:
      return 'Ошибка'
    case PopupVariant.Regular:
      return false
  }
}

const getPopupIcon = (variant: PopupVariant) => {
  switch (variant) {
    case PopupVariant.Error:
      return <ErrorIcon />
    case PopupVariant.Regular:
      return <SuccessIconPopup />
  }
}

export default function RegularPopup({
  popupVariant,
  text,
}: {
  popupVariant: PopupVariant
  text: string
}) {
  const popupHeader = getPopupHeader(popupVariant)
  const popupIcon = getPopupIcon(popupVariant)

  const styles = popupUseStyles({ variant: popupVariant })

  return (
    <div className={styles.wrapper}>
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={styles[`content${popupVariant}`]}
      >
        <div>{popupIcon}</div>
        <div>
          {popupHeader && (
            <div>
              <span>{popupHeader}</span>
            </div>
          )}

          <div>
            <p className={styles.popupTextStyle}>{text}</p>
          </div>
        </div>
      </Flex>
    </div>
  )
}
