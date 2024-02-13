import Spinner from './Spinner'

const LoadingOrError = ({
  isLoading,
  error,
}: {
  isLoading: boolean
  error: unknown
}) => {
  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  } else if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  } else {
    return null
  }
}

export default LoadingOrError
