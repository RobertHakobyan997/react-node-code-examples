import { QueryClient } from 'react-query'

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 20,
    },
  },
})
