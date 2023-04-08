import { Table } from 'src/modules/shared/components/general/Table/Table'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { BreakPointSize } from 'src/modules/shared/constants/style.constants'
import { ResponsiveLogList } from 'src/modules/model/components/ResponsiveLogList/ResponsiveLogList'
import { PurchaseLogType } from '../../types/purchase'
import { getPurchaseList } from '../../services/purchase.services'
import { useQuery } from 'react-query'
import { useLoader } from 'src/modules/shared/context/loader.context'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import {
  CurrencyIconVariant,
  CurrencyRenderer,
} from 'src/modules/shared/components/CurrencyRenderer/CurrencyRenderer'
import { ModelQueryKey } from '../../constants/queryKeys.constants'
import { useState } from 'react'
import { Pagination } from 'src/modules/shared/components/Pagination/Pagination'
import { regularDateFormatter } from 'src/modules/shared/utils/date.utils'
import { EmptyLog } from 'src/modules/shared/components/EmptyLog/EmptyLog'
import { LogNavigatePage } from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'
import { useNavigate } from 'react-router-dom'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'
import { numberWithCommas } from 'src/modules/shared/utils/string.utils'
import { useAuth } from 'src/modules/shared/context/auth.context'

export const PaymentHeaderSchema = [
  {
    accessor: 'type',
    Header: 'Тип',
  },
  {
    accessor: 'paymentName',
    Header: 'Название  плана',
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
    accessor: 'date',
    Header: 'Дата',
  },
]

const purchaseRenderer = (purchaseLog: PurchaseLogType) => {
  return {
    type: 'Покупка',
    paymentName: purchaseLog.purchase_plan.name,
    nickname: purchaseLog.nickname,
    date: regularDateFormatter(purchaseLog.created_at),
    price: (
      <Flex alignItems="center">
        <CurrencyRenderer
          variant={CurrencyIconVariant.Small}
          currency={purchaseLog.purchase_plan.currency}
        />
        <div style={{ marginLeft: '12px' }}>
          {numberWithCommas(purchaseLog.purchase_plan.price)}
        </div>
      </Flex>
    ),
  }
}

const getPaginationData = (hasPagination?: boolean) => {
  return {
    pageSize: hasPagination ? 10 : 3,
    pageNumber: 1,
  }
}

export function PurchaseLog({
  isUiSeparated = true,
  hasPagination = false,
}: {
  isUiSeparated?: boolean
  hasPagination?: boolean
}) {
  const { userState } = useAuth()
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const [paginationData, setPaginationData] = useState(
    getPaginationData(hasPagination)
  )

  const { data, isLoading } = useQuery(
    [ModelQueryKey.PurchaseList, paginationData],
    () => getPurchaseList({ ...paginationData, uuid: userState.uuid as string })
  )

  const paymentLogList = data?.results.map(purchaseRenderer) ?? []

  const handlePage = (pageNumber: number) =>
    setPaginationData((prev) => ({ ...prev, pageNumber }))

  const navigatePurchases = () => navigate(UserRouteConstants.purchases())

  useLoader(isLoading)

  const isDataEmpty = data?.results.length === 0
  const hasDataPaginated = (data?.count ?? 0) > 3
  const isShowMoreActive = hasDataPaginated && !isUiSeparated

  if (isDataEmpty) {
    return <EmptyLog isUiSeparated={isUiSeparated} />
  }

  return (
    <>
      <div>
        {width <= BreakPointSize.Tablet ? (
          <ResponsiveLogList
            isUiSeparated={isUiSeparated}
            list={paymentLogList}
            schema={PaymentHeaderSchema}
          />
        ) : (
          <Table
            isUiSeparated={isUiSeparated}
            columns={PaymentHeaderSchema}
            data={paymentLogList}
          />
        )}

        {isShowMoreActive && (
          <LogNavigatePage handleNavigate={navigatePurchases} />
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
    </>
  )
}
