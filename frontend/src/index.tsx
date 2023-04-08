import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import App from './App'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryProvider } from './modules/shared/context/reactQuery.context'
import { BrowserRouter } from 'react-router-dom'
import { PrimaryErrorBoundary } from './modules/shared/components/ErrorBoundaries/PrimaryErrorBoundary'
import { AuthProvider } from './modules/shared/context/auth.context'
import { ThemeProvider } from 'react-jss'
import { AppThemeConstants } from './modules/shared/constants/style.constants'
import { LoaderContext } from './modules/shared/context/loader.context'
import { ModalProvider } from './modules/shared/context/modal.context'
import { FlagProvider } from '@unleash/proxy-client-react'
import { unleashProxyConfig } from './modules/shared/libs/unleashProxy/unleashProxy.config'
import { TransitionLayout } from 'src/modules/shared/components/Layouts/TransitionLayout/TransitionLayout'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={AppThemeConstants}>
      <PrimaryErrorBoundary>
        <LoaderContext>
          <QueryProvider>
            <AuthProvider>
              <ModalProvider>
                <TransitionLayout>
                  <FlagProvider config={unleashProxyConfig}>
                    <App />

                    <ReactQueryDevtools initialIsOpen={false} />
                  </FlagProvider>
                </TransitionLayout>
              </ModalProvider>
            </AuthProvider>
          </QueryProvider>
        </LoaderContext>
      </PrimaryErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
