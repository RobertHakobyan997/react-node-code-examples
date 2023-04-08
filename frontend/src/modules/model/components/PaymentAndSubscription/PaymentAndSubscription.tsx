import Accordion from 'src/modules/shared/components/general/Accordion/Accordion'
import SubscriptionAndPurchaseRenderer, {
  SubscriptionAndPaymentVariant,
} from '../SubscriptionAndPaymentRenderer/SubscriptionAndPurchaseRenderer'
import { accordionWrapperUseStyles } from './PaymentAndSubscription.styles'
import { useModal } from '../../../shared/context/modal.context'
import { ModalVariant } from '../../../shared/types/modal.types'
import { CreateSubscriptionForm } from '../../forms/CreateSubscription/Subscription.form'

import { useQuery } from 'react-query'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { getSubscriptionPlanList } from 'src/modules/model/services/subscription.services'
import { CreatePurchaseForm } from 'src/modules/model/forms/CreatePurchase/Purchase.form'
import { getPurchasePlanList } from 'src/modules/model/services/purchase.services'

const PaymentAndSubscription = () => {
  const styles = accordionWrapperUseStyles()
  const { provideModalSettings } = useModal()
  const subscriptionQuery = useQuery([ModelQueryKey.SubscriptionPlanList], () =>
    getSubscriptionPlanList({ pageNumber: 1, pageSize: 10 })
  )

  const paymentsQuery = useQuery([ModelQueryKey.PurchasePlanList], () =>
    getPurchasePlanList({ pageNumber: 1, pageSize: 10 })
  )

  const handleAddSubscription = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <CreateSubscriptionForm />,
    })
  }

  const handleAddPayments = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <CreatePurchaseForm />,
    })
  }

  return (
    <div className={styles.accordionWrapper}>
      <Accordion
        handleAdd={handleAddSubscription}
        title={'План подписки'}
        isDisabled={subscriptionQuery.data?.results.length === 0}
        rendererVariant={SubscriptionAndPaymentVariant.Subscription}
        Renderer={SubscriptionAndPurchaseRenderer}
        items={subscriptionQuery.data?.results ?? []}
      />

      <div style={{ marginTop: '8px' }}>
        <Accordion
          isDisabled={paymentsQuery.data?.results.length === 0}
          handleAdd={handleAddPayments}
          title={'План покупки'}
          rendererVariant={SubscriptionAndPaymentVariant.Payment}
          Renderer={SubscriptionAndPurchaseRenderer}
          items={paymentsQuery.data?.results ?? []}
        />
      </div>
    </div>
  )
}

export default PaymentAndSubscription
