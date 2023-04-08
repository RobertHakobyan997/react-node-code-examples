import { SharedRouteConstants } from '../../constants/sharedRoute.constants'

import { SharedAccount } from 'src/modules/shared/pages/SharedAccount'
import { LoaderContext } from 'src/modules/shared/context/loader.context'
import { Navigate } from 'react-router-dom'

export const PublicRouteSchema = {
  routes: [
    {
      path: SharedRouteConstants.userAccount({ uuid: ':uuid' }),
      element: (
        <LoaderContext>
          <SharedAccount />
        </LoaderContext>
      ),
    },
    {
      path: SharedRouteConstants.fallback(),
      element: <Navigate to={SharedRouteConstants.login()} replace />,
    },
  ],
}
