import { ErrorInfo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const logError = (_error: ErrorBoundary, info: ErrorInfo) => {
  console.log(info.componentStack)
}
