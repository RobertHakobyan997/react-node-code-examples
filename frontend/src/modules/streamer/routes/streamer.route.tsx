import { useRoutes } from 'react-router-dom'
import { StreamerRouteSchema } from './streamerRouteSchema'

export const StreamerRoute = () => {
  return useRoutes(StreamerRouteSchema.routes)
}
