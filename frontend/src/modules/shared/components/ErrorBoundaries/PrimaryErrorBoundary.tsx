import { Component, ErrorInfo } from 'react'

import { ComponentWithChildren } from '../../types/component.types'
import { ErrorPage } from '../ErrorPage/ErrorPage'

export class PrimaryErrorBoundary extends Component<ComponentWithChildren> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }

    return this.props.children
  }
}
