import { Navigate, useRoutes } from 'react-router-dom'
import { CreateProfile } from '../../pages/CreateProfile'
import { SharedRouteConstants } from '../../constants/sharedRoute.constants'

const createProfileRoutesSchema = [
  {
    path: SharedRouteConstants.createProfile(),
    element: <CreateProfile />,
  },

  {
    path: SharedRouteConstants.fallback(),
    element: <Navigate to={SharedRouteConstants.createProfile()} replace />,
  },
]

export const CreateProfileRoute = () => {
  return useRoutes(createProfileRoutesSchema)
}
