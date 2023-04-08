import { renderPlanItemStyles } from './RendererItem.styles'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'

import { PlanType } from 'src/modules/model/components/PublicPurchaseAndSubscriptionRenderer/PublicPurchaseAndSubscriptionRenderer'
import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import { PurchasePlan } from 'src/modules/model/types/purchase'
import { useModal } from 'src/modules/shared/context/modal.context'
import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'
import { SubscriptionAndPurchasePaymentForm } from 'src/modules/model/forms/public/SubscriptionAndPurchasePayment/SubscriptionAndPurchasePayment.form'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import {
  LinkRenderer,
  PriceRenderer,
  PriceRendererVariant,
} from 'src/modules/model/components/SubscriptionAndPaymentRenderer/SubscriptionAndPurchaseRenderer'
import { stringShorter } from 'src/modules/shared/utils/string.utils'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { BreakPointSize } from 'src/modules/shared/constants/style.constants'

export default function RendererPlanItem({
  planType,
  content,
  isMyProfile,
}: {
  planType: PlanType
  content: SubscriptionPlan | PurchasePlan
  isMyProfile: boolean
}) {
  const { width } = useWindowSize()
  const { provideModalSettings } = useModal()
  const styles = renderPlanItemStyles()
  const { name, description, photo } = content

  const handlePayment = () => {
    return provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: (
        <SubscriptionAndPurchasePaymentForm
          planType={planType}
          planContent={content}
        />
      ),
    })
  }

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
      <p className={styles.titleResponsive}>{name}</p>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <ImageLoader
            src={photo as string}
            className={styles.image}
            alt="cover"
          />
        </div>
        <div className={styles.rightPartWrapper}>
          <p className={styles.title}>{name}</p>

          <PriceRenderer
            variant={PriceRendererVariant.Small}
            content={content}
          />

          {!isMyProfile && width >= BreakPointSize.Tablet && (
            <Button
              className={styles.joinBtn}
              variant={ButtonVariants.Primary}
              handleClick={handlePayment}
            >
              Присоединиться
            </Button>
          )}

          <div className={styles.description}>
            {stringShorter({
              string: description,
              hasEnding: false,
              firstPartLength: 80,
            })}
          </div>

          {isMyProfile && (
            <LinkRenderer
              handleLinkIconClick={handleCopy}
              handleLinkClick={navigateToLink}
              link={content.link}
            />
          )}
        </div>
      </div>

      {!isMyProfile && width <= BreakPointSize.Tablet && (
        <Button
          className={styles.joinBtn}
          variant={ButtonVariants.Primary}
          handleClick={handlePayment}
        >
          Присоединиться
        </Button>
      )}
    </div>
  )
}
