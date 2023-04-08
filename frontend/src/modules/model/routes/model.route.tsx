import { useRoutes } from 'react-router-dom'
import { ModelRouteSchema } from './modelRouteSchema'

export const ModelRoute = () => {
  return useRoutes(ModelRouteSchema.routes)
}
