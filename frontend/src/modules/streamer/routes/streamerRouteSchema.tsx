import { Navigate } from 'react-router-dom'
import { StreamerRouteConstants } from '../constants/route.constants'
import { StreamerProfile } from '../pages/StreamerProfile'
import { StreamerDonationsPage } from 'src/modules/streamer/pages/StreamerDonationsPage'

export const StreamerRouteSchema = {
  routes: [
    {
      path: StreamerRouteConstants.profile(),
      element: <StreamerProfile />,
    },
    {
      path: StreamerRouteConstants.donations(),
      element: <StreamerDonationsPage />,
    },

    {
      path: StreamerRouteConstants.fallback(),
      element: <Navigate to={StreamerRouteConstants.profile()} replace />,
    },
  ],
}
