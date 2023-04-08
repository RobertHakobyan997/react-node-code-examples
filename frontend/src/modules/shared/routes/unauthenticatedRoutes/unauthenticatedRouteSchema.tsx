import { SharedRouteConstants } from '../../constants/sharedRoute.constants'

import { Navigate } from 'react-router-dom'
import { Authorization } from '../../pages/Authorization'
import { Login } from '../../pages/Login'

export const UnauthenticatedRouteSchema = {
  routes: [
    {
      path: SharedRouteConstants.login(),
      element: <Login />,
    },
    {
      path: SharedRouteConstants.authorization(),
      element: <Authorization />,
    },
    {
      path: SharedRouteConstants.fallback(),
      element: <Navigate to={SharedRouteConstants.login()} replace />,
    },
  ],
}
