import { useState } from 'react'
import { useQueryClient } from 'react-query'

import emptyStateOfPlans from 'src/assets/images/emptyStateOfPlans.svg'

import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { planPurchaseAndSubscriptionsStyles } from './PublicPurchaseAndSubscriptionRenderer.styles'
import RendererPlanItem from '../RendererItem/RendererPlanItem'
import { PurchasePlan } from 'src/modules/model/types/purchase'
import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { PublicUser } from 'src/modules/shared/types/user.types'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { useParams } from 'react-router-dom'

export enum PlanType {
  Subscriptions = 'Subscriptions',
  Purchases = 'Purchases',
}

const getActiveData = ({
  activeTab,
  purchasesData,
  subscriptionsData,
}: {
  activeTab: PlanType
  purchasesData: PurchasePlan[]
  subscriptionsData: SubscriptionPlan[]
}): SubscriptionPlan[] | PurchasePlan[] => {
  switch (activeTab) {
    case PlanType.Purchases:
      return purchasesData
    case PlanType.Subscriptions:
      return subscriptionsData
    default:
      return purchasesData
  }
}

const PublicPurchaseAndSubscriptionRenderer = ({
  isMyProfile,
  hasSocialLinksAndVideo,
}: {
  isMyProfile: boolean
  hasSocialLinksAndVideo: boolean
}) => {
  const styles = planPurchaseAndSubscriptionsStyles()
  const queryClient = useQueryClient()
  const params = useParams()
  const [activeTab, setActiveTab] = useState(PlanType.Subscriptions)

  const publicUser = queryClient.getQueryData([
    SharedQueryKey.PublicUser,
    { uuid: params.uuid },
  ]) as PublicUser

  const activeData = getActiveData({
    activeTab,
    subscriptionsData: publicUser?.subscription_plans ?? [],
    purchasesData: publicUser?.purchase_plans ?? [],
  })

  return (
    <>
      <div
        className={styles.planTab}
        style={{ paddingTop: hasSocialLinksAndVideo ? '40px' : '32px' }}
      >
        <Button
          variant={ButtonVariants.Tab}
          active={activeTab === PlanType.Subscriptions}
          handleClick={() => setActiveTab(PlanType.Subscriptions)}
        >
          План подписки
        </Button>
        <Button
          variant={ButtonVariants.Tab}
          active={activeTab === PlanType.Purchases}
          handleClick={() => setActiveTab(PlanType.Purchases)}
        >
          План покупки
        </Button>
      </div>

      {activeData.length ? (
        <div className={styles.plansWrapper}>
          {activeData?.map((content) => (
            <RendererPlanItem
              isMyProfile={isMyProfile}
              key={content.name}
              content={content}
              planType={
                activeTab === PlanType.Purchases
                  ? PlanType.Purchases
                  : PlanType.Subscriptions
              }
            />
          ))}
        </div>
      ) : (
        <Flex justifyContent="center" style={{ margin: '32px 0 20px 0' }}>
          <ImageLoader src={emptyStateOfPlans} alt="Empty plan" />
        </Flex>
      )}
    </>
  )
}

export default PublicPurchaseAndSubscriptionRenderer
