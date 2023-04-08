import { useAuth } from '../../context/auth.context'
import { ModelRoute } from '../../../model/routes/model.route'
import { CreateProfileRoute } from './createProfile.route'

export const AuthenticatedRoutes = () => {
  const { userState } = useAuth()
  const { user } = userState

  if (user) {
    switch (user.role) {
      case null:
        return <CreateProfileRoute />

      // case UserRole.MODEL:
      //   return <ModelRoute />
      //

      // case UserRole.STREAMER:
      //   return <StreamerRoute />

      default:
        return <ModelRoute />
    }
  }

  return null
}
