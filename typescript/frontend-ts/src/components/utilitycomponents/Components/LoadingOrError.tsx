import Spinner from './Spinner'

export const Loading = () => {
  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
      <Spinner />
    </div>
  )
}

export const DataError = () => {
  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
      Något gick fel.
    </div>
  )
}
