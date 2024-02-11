const NilFinalComponent = () => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center rounded bg-white p-2 shadow-md md:mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold">Final</h4>
        </div>
        <div className="mt-1 flex flex-row justify-between text-sm xl:text-lg">
          Ingen match än
        </div>
      </div>
    </div>
  )
}

export default NilFinalComponent
