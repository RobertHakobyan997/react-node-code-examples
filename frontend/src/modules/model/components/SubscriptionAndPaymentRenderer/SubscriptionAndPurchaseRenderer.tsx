import { SettingsIcon } from 'src/modules/shared/components/Icons/Settings.icon'

import { Button } from '../../../shared/components/general/Button/Button'
import { ButtonVariants } from '../../../shared/components/general/Button/Button.types'
import { useRef, useState } from 'react'
import {
  DropdownItem,
  DropdownVariant,
} from '../../../shared/components/general/Dropdown/Dropdown'
import { subscriptionAndPurchaseUseStyles } from './SuscriptionAndPurchaseRenderer.styles'
import Flex from '../../../shared/components/general/Flex/Flex'
import { LinkIcon } from '../../../shared/components/Icons/Link.icon'
import coverImg from 'src/assets/images/cover.svg'
import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'
import useOutsideClick from 'src/modules/shared/hooks/useOutsideClick'
import {
  numberWithCommas,
  stringShorter,
} from 'src/modules/shared/utils/string.utils'
import { useMutation, useQueryClient } from 'react-query'
import { deleteSubscriptionPlan } from 'src/modules/model/services/subscription.services'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { useModal } from 'src/modules/shared/context/modal.context'
import { EditSubscriptionForm } from 'src/modules/model/forms/CreateSubscription/Subscription.form'
import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'
import {
  CurrencyIconVariant,
  CurrencyRenderer,
} from 'src/modules/shared/components/CurrencyRenderer/CurrencyRenderer'
import { Currency } from 'src/modules/shared/types/response.types'
import { EditPurchaseForm } from 'src/modules/model/forms/CreatePurchase/Purchase.form'
import { deletePurchasePlan } from 'src/modules/model/services/purchase.services'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { Separator } from 'src/modules/shared/components/general/Separator/Separator'
import { PenIcon } from 'src/modules/shared/components/Icons/Pen.icon'
import { RecycleIcon } from 'src/modules/shared/components/Icons/Recycle.icon'
import { IconVariant } from 'src/modules/shared/types/icon.types'
import { PlanModal } from 'src/modules/shared/components/Modals/Plan/PlanModal'

export interface SubscriptionAndPayment {
  id: number
  name: string
  description: string
  photo: string
  link: string
  price: string
  currency: Currency
  duration?: string
}

export const enum SubscriptionAndPaymentVariant {
  Subscription = 'Subscription',
  Payment = 'Payment',
}

export const enum SubscriptionAndPaymentSettingsVariant {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

const SettingsList = [
  {
    id: 0,
    content: 'Редактировать',
    nameId: 'edit',
  },
  {
    id: 1,
    content: (
      <span style={{ color: AppThemeConstants.dangerColor }}>Удалить</span>
    ),
    nameId: 'delete',
  },
]

export const enum PriceRendererVariant {
  Small = 'Small',
  Big = 'Big',
}

export const PriceRenderer = ({
  content,
  variant,
}: {
  variant: PriceRendererVariant
  content: {
    price: string
    currency: Currency
    duration?: string
  }
}) => {
  const styles = subscriptionAndPurchaseUseStyles({ variant })

  return (
    <Flex flexWrap="wrap" alignItems="flex-end">
      <span style={{ marginRight: '0.5rem' }}>
        <CurrencyRenderer
          currency={content.currency}
          variant={CurrencyIconVariant.Small}
          size={variant === PriceRendererVariant.Small ? 12 : 14}
        />
      </span>

      <span className={styles.contentPrice}>
        {numberWithCommas(content.price)}
      </span>

      <span className={styles.contentDuration}>
        {content.duration
          ? `/ ${content.duration} месяц`
          : '/ Бессрочная подписка'}
      </span>
    </Flex>
  )
}

export const LinkRenderer = ({
  handleLinkIconClick,
  handleLinkClick,
  link,
}: {
  handleLinkIconClick: () => void
  handleLinkClick: () => void
  link: string
}) => {
  const styles = subscriptionAndPurchaseUseStyles({})

  return (
    <div className={styles.contentLinkContainer}>
      <Button
        handleClick={handleLinkIconClick}
        className={styles.linkButton}
        variant={ButtonVariants.Text}
      >
        <LinkIcon width={20} color={'currentColor'} />
      </Button>

      <Button
        style={{ overflow: 'hidden' }}
        handleClick={handleLinkClick}
        variant={ButtonVariants.Text}
      >
        <span className={styles.contentLink} style={{ marginLeft: '14px' }}>
          {stringShorter({ string: link, firstPartLength: 10 })}
        </span>
      </Button>
    </div>
  )
}

const SettingsBlock = ({
  isResponsive = false,
  content,
  variant,
  settingsVariant = SubscriptionAndPaymentSettingsVariant.Primary,
}: {
  isResponsive?: boolean
  variant: SubscriptionAndPaymentVariant
  content: SubscriptionAndPayment
  settingsVariant?: SubscriptionAndPaymentSettingsVariant
}) => {
  const settingsRef = useRef(null)
  const styles = subscriptionAndPurchaseUseStyles({})
  const queryClient = useQueryClient()
  const { provideModalSettings } = useModal()
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const subscriptionDeleteMutation = useMutation(deleteSubscriptionPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.SubscriptionPlanList,
      })
    },
  })

  const purchaseDeleteMutation = useMutation(deletePurchasePlan, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.PurchasePlanList,
      })
    },
  })

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev)

  const handleAction = (actionName: string) => () => {
    setIsSettingsOpen(false)

    if (actionName === 'delete') {
      switch (variant) {
        case SubscriptionAndPaymentVariant.Subscription:
          subscriptionDeleteMutation.mutate({ id: content.id })
          return
        case SubscriptionAndPaymentVariant.Payment:
          purchaseDeleteMutation.mutate({ id: content.id })
          return

        default:
          subscriptionDeleteMutation.mutate({ id: content.id })
          return
      }
    }

    if (actionName === 'edit') {
      provideModalSettings({
        modalVariant: ModalVariant.Modal,
        content:
          variant === SubscriptionAndPaymentVariant.Subscription ? (
            <EditSubscriptionForm subscription={content as SubscriptionPlan} />
          ) : (
            <EditPurchaseForm purchase={content} />
          ),
      })
    }
  }

  useOutsideClick(settingsRef, () => setIsSettingsOpen(false))

  useLoader(
    subscriptionDeleteMutation.isLoading || purchaseDeleteMutation.isLoading
  )

  if (isResponsive) {
    return (
      <Flex justifyContent="flex-end" style={{ gap: '0 20px' }}>
        <Button
          handleClick={handleAction('edit')}
          variant={ButtonVariants.Text}
        >
          <PenIcon />
        </Button>
        <Button
          handleClick={handleAction('delete')}
          variant={ButtonVariants.Text}
        >
          <RecycleIcon
            variant={IconVariant.Big}
            color={AppThemeConstants.textDarker}
          />
        </Button>
      </Flex>
    )
  }

  return (
    <div ref={settingsRef} style={{ position: 'relative' }}>
      <Button
        variant={ButtonVariants.Round}
        active={isSettingsOpen}
        handleClick={toggleSettings}
      >
        <SettingsIcon />
      </Button>
      {isSettingsOpen && (
        <div className={styles[`dialogWrapper${settingsVariant}`]}>
          <div className={styles[`triangle${settingsVariant}`]}></div>
          <div className={styles.settingsWrapper}>
            {SettingsList.map((settings) => {
              return (
                <DropdownItem
                  key={settings.id}
                  // isOneItem={SettingsList.length <= 1}
                  variant={DropdownVariant.Regular}
                  style={{ fontSize: '1rem' }}
                  dropdown={settings}
                  handleClick={handleAction(settings.nameId)}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const SubscriptionAndPurchaseRenderer = ({
  content,
  variant,
  settingsVariant = SubscriptionAndPaymentSettingsVariant.Primary,
}: {
  content: SubscriptionAndPayment
  variant: SubscriptionAndPaymentVariant
  settingsVariant?: SubscriptionAndPaymentSettingsVariant
}) => {
  const { width } = useWindowSize()
  const styles = subscriptionAndPurchaseUseStyles({})
  const { provideModalSettings } = useModal()

  const navigateToLink = () => {
    window.open(content.link, '_blank')?.focus()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content.link)
    provideModalSettings({
      modalVariant: ModalVariant.Popup,
      popupVariant: PopupVariant.Regular,
      content: 'Ссылка скопирована',
    })
  }

  const openPlanModal = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <PlanModal content={content} />,
    })
  }

  const isTabletSize = width < 768

  return (
    <div className={styles.wrapper}>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ position: 'relative' }}
      >
        <p className={styles.contentName}>{content.name}</p>

        {!isTabletSize && (
          <SettingsBlock
            settingsVariant={settingsVariant}
            variant={variant}
            content={content}
          />
        )}
      </Flex>

      <div className={styles.planLayout}>
        <div className={styles.imageWrapper}>
          <Button
            className={styles.imageButton}
            variant={ButtonVariants.Text}
            handleClick={openPlanModal}
          >
            <ImageLoader
              className={styles.imageContent}
              src={content.photo || coverImg}
              alt="cover"
            />
          </Button>
        </div>

        <div style={{ lineBreak: 'anywhere', overflow: 'auto' }}>
          <div className={styles.currencyWrapper}>
            <PriceRenderer
              variant={PriceRendererVariant.Small}
              content={content}
            />
          </div>

          <p className={styles.contentDescription}>
            {stringShorter({
              string: content.description,
              hasEnding: false,
              firstPartLength: 80,
            })}
          </p>

          <LinkRenderer
            handleLinkIconClick={handleCopy}
            handleLinkClick={navigateToLink}
            link={content.link}
          />
        </div>
      </div>

      {isTabletSize && (
        <>
          <Separator
            color={AppThemeConstants.textDarker}
            topSpace={10}
            bottomSpace={12}
          />

          <div>
            <SettingsBlock
              settingsVariant={settingsVariant}
              variant={variant}
              content={content}
              isResponsive
            />
          </div>
        </>
      )}
    </div>
  )
}
export default SubscriptionAndPurchaseRenderer
