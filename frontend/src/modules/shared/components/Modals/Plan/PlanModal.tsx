import {
  LinkRenderer,
  PriceRenderer,
  PriceRendererVariant,
  SubscriptionAndPayment,
} from 'src/modules/model/components/SubscriptionAndPaymentRenderer/SubscriptionAndPurchaseRenderer'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'

import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'
import { useModal } from 'src/modules/shared/context/modal.context'
import { planModalUseStyles } from 'src/modules/shared/components/Modals/Plan/PlanModal.styles'

export function PlanModal({ content }: { content: SubscriptionAndPayment }) {
  const { provideModalSettings } = useModal()
  const styles = planModalUseStyles()

  const handleCopy = () => {
    navigator.clipboard.writeText(content.link)
    provideModalSettings({
      modalVariant: ModalVariant.Popup,
      popupVariant: PopupVariant.Regular,
      content: 'Ссылка скопирована',
    })
  }

  const navigateToLink = () => {
    window.open(content.link, '_blank')?.focus()
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{content.name}</p>

      <div className={styles.imageWrapper}>
        <ImageLoader
          className={styles.image}
          src={content.photo}
          alt={content.name}
        />
      </div>

      <PriceRenderer variant={PriceRendererVariant.Big} content={content} />

      <p className={styles.description}>{content.description}</p>

      <LinkRenderer
        handleLinkIconClick={handleCopy}
        handleLinkClick={navigateToLink}
        link={content.link}
      />
    </div>
  )
}
