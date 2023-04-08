import { QueryClientProvider } from 'react-query'
import { queryClientConfig } from '../libs/reactQuery/reactQuery.config'
import { ReactNode } from 'react'

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClientConfig}>
      {children}
    </QueryClientProvider>
  )
}
