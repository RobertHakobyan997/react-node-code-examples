import { SharedRouteConstants } from '../../shared/constants/sharedRoute.constants'
import { Navigate } from 'react-router-dom'
import { UserRouteConstants } from '../constants/route.constants'
import { ModelProfile } from '../pages/ModelProfile'
import { Payments } from 'src/modules/model/pages/Payments'
import { Subscriptions } from 'src/modules/model/pages/Subscriptions'
import { ModelDonationsPage } from 'src/modules/model/pages/Donations'
import { Transactions } from 'src/modules/model/pages/Transactions'
import EditProfile from 'src/modules/model/pages/EditProfile/EditProfile'

export const ModelRouteSchema = {
  routes: [
    {
      path: UserRouteConstants.profile(),
      element: <ModelProfile />,
    },

    {
      path: UserRouteConstants.subscriptions(),
      element: <Subscriptions />,
    },

    {
      path: UserRouteConstants.purchases(),
      element: <Payments />,
    },
    {
      path: UserRouteConstants.donations(),
      element: <ModelDonationsPage />,
    },
    {
      path: UserRouteConstants.editProfile(),
      element: <EditProfile />,
    },

    {
      path: UserRouteConstants.transactions(),
      element: <Transactions />,
    },
    {
      path: SharedRouteConstants.fallback(),
      element: <Navigate to={UserRouteConstants.profile()} replace />,
    },
  ],
}
