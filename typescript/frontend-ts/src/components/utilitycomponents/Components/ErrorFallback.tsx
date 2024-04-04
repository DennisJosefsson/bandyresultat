import { postError } from '../../../requests/errors'
import { useQuery } from 'react-query'
import Spinner from './Spinner'
import { FallbackProps } from 'react-error-boundary'

export interface FrontendError {
  name: string
  message: string
  backend: boolean
  origin: string
  date: string
  production: boolean
}

const ErrorFallback = ({ error }: FallbackProps) => {
  const origin = error.stack.split('\n')[1]
  const frontendError: FrontendError = {
    name: error.name,
    message: error.message,
    backend: false,
    origin: origin,
    date: new Date().toString(),
    production: import.meta.env.PROD,
  }

  const { isLoading } = useQuery(['errors', frontendError], () =>
    postError(frontendError),
  )

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mx-auto mt-10 flex items-center justify-center font-inter text-foreground">
      <div className="mx-2 max-w-3xl">
        <p className="mb-4 text-sm md:text-base">
          Om du ser det här så har något gått jättefel. Maila gärna
          dennis@bandyresultat.se och ta med det som står här nedanför i ditt
          meddelande, plus vilken sida du befinner dig på. Tack på förhand.
        </p>
        <p className="text-center text-sm md:text-base">{error.message}</p>
      </div>
    </div>
  )
}

export default ErrorFallback
