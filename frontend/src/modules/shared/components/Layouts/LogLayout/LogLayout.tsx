import { ComponentWithChildrenCallback } from 'src/modules/shared/types/component.types'
import { useState } from 'react'
import { logLayoutUseStyles } from 'src/modules/shared/components/Layouts/LogLayout/LogLayout.styles'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { SubscriptionLog } from 'src/modules/model/components/SubscriptionLog/SubscriptionLog'
import { PurchaseLog } from 'src/modules/model/components/PurchaseLog/PurchaseLog'
import { DonationLog } from 'src/modules/shared/components/DonationLog/DonationLog'
import { ArrowRight } from 'src/modules/shared/components/Icons/ArrowIcon'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'

import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { useNavigate } from 'react-router-dom'

export const enum LogTab {
  Donation = 'Donation',
  Subscription = 'Subscription',
  Purchase = 'Purchase',
}

export const LogNavigatePage = ({
  handleNavigate,
}: {
  handleNavigate: () => void
}) => {
  const styles = logLayoutUseStyles({})

  return (
    <div className={styles.buttonWrapper}>
      <Button variant={ButtonVariants.Text} handleClick={handleNavigate}>
        <Flex
          alignItems="center"
          justifyContent="center"
          className={styles.buttonContentWrapper}
        >
          <span className={styles.buttonText}>Смотреть</span>
          <ArrowRight isActive={true} color={'currentColor'} />
        </Flex>
      </Button>
    </div>
  )
}

const Tabs = [
  {
    id: 0,
    logPage: UserRouteConstants.donations(),
    queryKey: SharedQueryKey.DonationList,
    nameId: LogTab.Donation,
    content: 'Донаты',
  },
  {
    id: 1,
    logPage: UserRouteConstants.subscriptions(),
    queryKey: ModelQueryKey.SubscriptionList,
    nameId: LogTab.Subscription,
    content: 'Подписки ',
  },
  {
    id: 2,
    logPage: UserRouteConstants.purchases(),
    queryKey: ModelQueryKey.PurchaseList,
    nameId: LogTab.Purchase,
    content: 'Покупки',
  },
]

interface LogLayoutProps extends ComponentWithChildrenCallback<LogTab> {
  currentTab?: LogTab
  isUiSeparated?: boolean
}

export function LogLayout({
  children,
  currentTab = LogTab.Donation,
  isUiSeparated = false,
}: LogLayoutProps) {
  const navigate = useNavigate()
  const styles = logLayoutUseStyles({ isUiSeparated })
  const [tab, setTab] = useState(currentTab)

  const navigatePage = (tab: LogTab) => () => {
    const tabData = Tabs.find((item) => item.nameId === tab)
    if (tabData?.logPage) navigate(tabData.logPage)
  }

  const handleChangeTab = (tab: LogTab) => () => {
    setTab(tab)

    if (isUiSeparated) navigatePage(tab)
  }

  return (
    <div className={styles.wrapper}>
      {!isUiSeparated && (
        <>
          <div className={styles.logHeaderWrapper}>
            <span className={styles.headerText}>Лог транзакции</span>
          </div>
          <div className={styles.tabWrapper}>
            {Tabs.map((tabItem) => (
              <Button
                key={tabItem.id}
                active={tabItem.nameId === tab}
                variant={ButtonVariants.Tab}
                handleClick={handleChangeTab(tabItem.nameId)}
              >
                {tabItem.content}
              </Button>
            ))}
          </div>
        </>
      )}

      {children(tab)}
    </div>
  )
}

export const LogRenderer = ({
  variant,
  isUiSeparated,
  hasPagination,
}: {
  variant: LogTab
  isUiSeparated: boolean
  hasPagination: boolean
}) => {
  switch (variant) {
    case LogTab.Donation:
      return (
        <DonationLog
          hasPagination={hasPagination}
          isUiSeparated={isUiSeparated}
          hasHeader={false}
        />
      )

    case LogTab.Subscription:
      return (
        <SubscriptionLog
          hasPagination={hasPagination}
          isUiSeparated={isUiSeparated}
        />
      )

    case LogTab.Purchase:
      return (
        <PurchaseLog
          hasPagination={hasPagination}
          isUiSeparated={isUiSeparated}
        />
      )

    default:
      return (
        <SubscriptionLog
          hasPagination={hasPagination}
          isUiSeparated={isUiSeparated}
        />
      )
  }
}
