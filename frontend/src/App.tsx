import React from 'react'
import { useAuth } from './modules/shared/context/auth.context'
import { AuthenticatedRoutes } from './modules/shared/routes/authenticatedRoutes/authenticated.route'
import { getStorageData } from './modules/shared/utils/localStorage.utils'
import { LocalStorage } from './modules/shared/constants/localStorage.constants'
import { useLoader } from './modules/shared/context/loader.context'
import { UnauthenticatedRoutes } from 'src/modules/shared/routes/unauthenticatedRoutes/unauthenticated.route'
import { useLocation } from 'react-router-dom'
import { PublicRoutes } from 'src/modules/shared/routes/publicRoutes/public.route'

import { SharedRouteConstants } from 'src/modules/shared/constants/sharedRoute.constants'
import { use100VhFix } from 'src/modules/shared/hooks/use100VhFix'

export default function App() {
  const { isLoading } = useAuth()
  const refresh = getStorageData(LocalStorage.r)
  const { pathname } = useLocation()

  useLoader(isLoading)
  use100VhFix()

  if (
    pathname.startsWith(SharedRouteConstants.userAccount({})) ||
    pathname.startsWith(SharedRouteConstants.sberbankPaymentUrl())
  ) {
    return <PublicRoutes />
  }

  if (refresh) {
    return <AuthenticatedRoutes />
  }

  return <UnauthenticatedRoutes />
}
