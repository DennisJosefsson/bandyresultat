import { ErrorInfo } from 'react'

export const logError = (error: Error, info: ErrorInfo) => {
  console.log(error.message)
  console.log(info.componentStack)
}
