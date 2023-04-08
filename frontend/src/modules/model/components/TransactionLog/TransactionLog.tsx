import { Table } from 'src/modules/shared/components/general/Table/Table'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { BreakPointSize } from 'src/modules/shared/constants/style.constants'
import { ResponsiveLogList } from 'src/modules/model/components/ResponsiveLogList/ResponsiveLogList'
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

import { numberWithCommas } from 'src/modules/shared/utils/string.utils'

import { Currency } from 'src/modules/shared/types/response.types'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { getPaymentTransactions } from 'src/modules/model/services/payment.services'

import { Payment, PaymentStatus } from 'src/modules/model/types/payment.types'
import { useAuth } from 'src/modules/shared/context/auth.context'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'

export const TransactionHeaderSchema = [
  {
    accessor: 'amount',
    Header: 'Сумма',
    width: '33%',
  },
  {
    accessor: 'created_date',
    Header: 'Дата',
    width: '33%',
  },
  {
    accessor: 'status',
    Header: 'Статус',
    width: '33%',
  },
]

const transactionStatusRenderer = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.success:
      return (
        <Button
          style={{ color: '#00A070', backgroundColor: '#1C3238' }}
          variant={ButtonVariants.Success}
        >
          Завершенный
        </Button>
      )
    case PaymentStatus.not_completed:
      return <Button variant={ButtonVariants.Pending}>В процессе</Button>
    case PaymentStatus.error:
      return <Button variant={ButtonVariants.Fail}>Отклоненный</Button>
    default:
      return <Button variant={ButtonVariants.Pending}>В процессе</Button>
  }
}

const transactionRenderer = (paymentLog: Payment) => {
  return {
    amount: (
      <Flex alignItems="center">
        <CurrencyRenderer
          variant={CurrencyIconVariant.Small}
          currency={Currency.RUB}
        />
        <div style={{ marginLeft: '12px' }}>
          {numberWithCommas(paymentLog.amount)}
        </div>
      </Flex>
    ),
    created_date: regularDateFormatter(paymentLog.created_date),
    status: transactionStatusRenderer(paymentLog.status),
  }
}

const getPaginationData = (hasPagination?: boolean) => {
  return {
    pageSize: hasPagination ? 10 : 3,
    pageNumber: 1,
  }
}

export function TransactionLog({
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
    [
      ModelQueryKey.PaymentTransactions,
      { ...paginationData, uuid: userState.user?.uuid },
    ],
    () => getPaymentTransactions({ ...paginationData })
  )

  const paymentLogList = data?.results.map(transactionRenderer) ?? []

  const handlePage = (pageNumber: number) =>
    setPaginationData((prev) => ({ ...prev, pageNumber }))

  const navigateTransactions = () => navigate(UserRouteConstants.transactions())

  const isDataEmpty = data?.results.length === 0
  const hasDataPaginated = (data?.count ?? 0) > 3
  const isShowMoreActive = hasDataPaginated && !isUiSeparated

  useLoader(isLoading)

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
            schema={TransactionHeaderSchema}
          />
        ) : (
          <Table
            isUiSeparated={isUiSeparated}
            columns={TransactionHeaderSchema}
            data={paymentLogList}
            columnStyles={{
              paddingLeft: '120px',
            }}
          />
        )}

        {isShowMoreActive && (
          <LogNavigatePage handleNavigate={navigateTransactions} />
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
