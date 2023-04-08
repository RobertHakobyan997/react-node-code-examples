import { LogHeader } from 'src/modules/shared/components/LogHeader/LogHeader'

import { Donations } from 'src/modules/streamer/components/Donations/Donations'

import { useNavigate } from 'react-router-dom'
import { StreamerRouteConstants } from 'src/modules/streamer/constants/route.constants'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getDonationList } from 'src/modules/streamer/services/donation.services'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { Pagination } from 'src/modules/shared/components/Pagination/Pagination'
import { EmptyLog } from 'src/modules/shared/components/EmptyLog/EmptyLog'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { LogNavigatePage } from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'
import { useAuth } from 'src/modules/shared/context/auth.context'
import { UserRole } from 'src/modules/shared/types/user.types'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'

const getPaginationData = (hasPagination?: boolean) => {
  return {
    pageSize: hasPagination ? 6 : 3,
    pageNumber: 1,
  }
}

const getRouteConstants = (role?: UserRole | null) => {
  switch (role) {
    case UserRole.STREAMER:
      return StreamerRouteConstants
    case UserRole.MODEL:
      return UserRouteConstants
    default:
      return UserRouteConstants
  }
}

export function DonationLog({
  hasHeader = true,
  isUiSeparated = false,
  hasPagination = false,
}: {
  hasHeader?: boolean
  isUiSeparated?: boolean
  hasPagination?: boolean
}) {
  const { userState } = useAuth()
  const navigate = useNavigate()
  const [paginationData, setPaginationData] = useState(
    getPaginationData(hasPagination)
  )

  const { data, isLoading } = useQuery(
    [SharedQueryKey.DonationList, paginationData],
    () => getDonationList({ ...paginationData, uuid: userState.uuid as string })
  )

  const handlePage = (pageNumber: number) =>
    setPaginationData((prev) => ({ ...prev, pageNumber }))

  const navigateDonations = () => {
    const RouteConstants = getRouteConstants(userState.user?.role)
    navigate(RouteConstants.donations())
  }

  const isDataEmpty = !data?.results.length

  const hasDataPaginated = (data?.count ?? 0) > 3
  const isShowMoreActive = hasDataPaginated && !isUiSeparated

  useLoader(isLoading)

  return (
    <div>
      {hasHeader && <LogHeader hasLogs title={'Лог донатов'} />}

      {isDataEmpty ? (
        <EmptyLog isUiSeparated={isUiSeparated} />
      ) : (
        <Donations
          donations={data?.results ?? []}
          isUiSeparated={isUiSeparated}
        />
      )}

      {isShowMoreActive && (
        <LogNavigatePage handleNavigate={navigateDonations} />
      )}

      {hasPagination && (
        <Pagination
          pageSize={paginationData.pageSize}
          allItems={data?.count ?? 1}
          currentPage={paginationData.pageNumber}
          handlePage={handlePage}
        />
      )}
    </div>
  )
}
