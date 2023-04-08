import { useRoutes } from 'react-router-dom'
import { PublicRouteSchema } from 'src/modules/shared/routes/publicRoutes/publicRouteSchema'

export const PublicRoutes = () => {
  return useRoutes(PublicRouteSchema.routes)
}
