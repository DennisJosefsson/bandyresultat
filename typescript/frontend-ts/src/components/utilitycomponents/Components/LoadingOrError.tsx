import Spinner from './Spinner'

export const Loading = () => {
  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
      <Spinner />
    </div>
  )
}

export const DataError = () => {
  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
      Något gick fel.
    </div>
  )
}
