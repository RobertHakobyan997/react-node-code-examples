import { Table } from 'src/modules/shared/components/general/Table/Table'
import { useNavigate } from 'react-router-dom'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'

import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { BreakPointSize } from 'src/modules/shared/constants/style.constants'
import { ResponsiveLogList } from 'src/modules/model/components/ResponsiveLogList/ResponsiveLogList'
import { Pagination } from 'src/modules/shared/components/Pagination/Pagination'
import { useQuery } from 'react-query'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'

import { useState } from 'react'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { SubscriptionLogType } from 'src/modules/model/types/subscription'
import {
  CurrencyIconVariant,
  CurrencyRenderer,
} from 'src/modules/shared/components/CurrencyRenderer/CurrencyRenderer'
import { getSubscriptionList } from 'src/modules/model/services/subscription.services'
import { regularDateFormatter } from 'src/modules/shared/utils/date.utils'
import { EmptyLog } from 'src/modules/shared/components/EmptyLog/EmptyLog'
import { LogNavigatePage } from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'
import { numberWithCommas } from 'src/modules/shared/utils/string.utils'
import { useAuth } from 'src/modules/shared/context/auth.context'

export const SubscriptionHeaderSchema = [
  {
    accessor: 'type',
    Header: 'Тип',
  },
  {
    accessor: 'subscriptionName',
    Header: 'Название плана',
  },
  {
    accessor: 'nickname',
    Header: 'Никнейм',
  },
  {
    accessor: 'price',
    Header: 'Сумма',
  },
  {
    accessor: 'duration',
    Header: 'Срок',
  },
  {
    accessor: 'date',
    Header: 'Дата',
  },
]

export const subscriptionRenderer = (subscription: SubscriptionLogType) => ({
  type: 'Подписка',
  subscriptionName: subscription.subscription_plan.name,
  nickname: subscription.nickname,
  price: (
    <Flex alignItems="center">
      <CurrencyRenderer
        variant={CurrencyIconVariant.Small}
        currency={subscription.subscription_plan.currency}
      />
      <div style={{ marginLeft: '12px' }}>
        {numberWithCommas(subscription.subscription_plan.price)}
      </div>
    </Flex>
  ),
  duration: <span>{subscription.subscription_plan.duration} Месяц</span>,
  date: regularDateFormatter(subscription.created_at),
})

const getPaginationData = (hasPagination?: boolean) => {
  return {
    pageSize: hasPagination ? 12 : 3,
    pageNumber: 1,
  }
}

export function SubscriptionLog({
  isUiSeparated = false,
  hasPagination = false,
}: {
  isUiSeparated?: boolean
  hasPagination?: boolean
}) {
  const { userState } = useAuth()
  const navigate = useNavigate()
  const [paginationData, setPaginationData] = useState(
    getPaginationData(hasPagination)
  )

  const { width } = useWindowSize()

  const { data, isLoading } = useQuery(
    [ModelQueryKey.SubscriptionList, paginationData],
    () =>
      getSubscriptionList({ ...paginationData, uuid: userState.uuid as string })
  )

  const subscriptionsList = data?.results.map(subscriptionRenderer) ?? []

  const handlePage = (pageNumber: number) =>
    setPaginationData((prev) => ({ ...prev, pageNumber }))

  const navigateSubscriptions = () =>
    navigate(UserRouteConstants.subscriptions())

  const isDataEmpty = data?.results.length === 0
  const hasDataPaginated = (data?.count ?? 0) > 3
  const isShowMoreActive = hasDataPaginated && !isUiSeparated

  useLoader(isLoading)

  if (isDataEmpty) {
    return <EmptyLog isUiSeparated={isUiSeparated} />
  }

  return (
    <div>
      {width <= BreakPointSize.Tablet ? (
        <ResponsiveLogList
          list={subscriptionsList}
          isUiSeparated={isUiSeparated}
          schema={SubscriptionHeaderSchema}
        />
      ) : (
        <Table
          isUiSeparated={isUiSeparated}
          columns={SubscriptionHeaderSchema}
          data={subscriptionsList}
        />
      )}

      {isShowMoreActive && (
        <LogNavigatePage handleNavigate={navigateSubscriptions} />
      )}

      {hasPagination && (
        <Pagination
          pageSize={paginationData.pageSize}
          allItems={data?.count ?? 0}
          currentPage={paginationData.pageNumber}
          handlePage={handlePage}
        />
      )}
    </div>
  )
}
