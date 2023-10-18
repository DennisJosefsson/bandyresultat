const ErrorFallback = ({ error }) => {
  return (
    <div className="mx-auto mt-10 flex items-center justify-center font-inter text-[#011d29]">
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
