import { AxiosError } from 'axios'
import Spinner from './Spinner'

export const Loading = () => {
  return (
    <div className="mx-auto grid place-items-center font-inter text-foreground">
      <Spinner />
    </div>
  )
}

export const DataError = ({ error }: { error: unknown }) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data.errors
    return (
      <div className="mx-auto grid place-items-center font-inter text-foreground">
        {message}
      </div>
    )
  } else {
    return (
      <div className="mx-auto grid place-items-center font-inter text-foreground">
        Något gick fel.
      </div>
    )
  }
}
