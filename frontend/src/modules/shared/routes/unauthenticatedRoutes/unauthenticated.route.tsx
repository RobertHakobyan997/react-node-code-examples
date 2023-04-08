import { useRoutes } from 'react-router-dom'
import { UnauthenticatedRouteSchema } from './unauthenticatedRouteSchema'

export const UnauthenticatedRoutes = () => {
  return useRoutes(UnauthenticatedRouteSchema.routes)
}
