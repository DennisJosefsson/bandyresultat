const SeasonTablesButtonList = ({ setHomeAwayTitle, setSelectedTable }) => {
  return (
    <div className="mt-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
      <div
        onClick={() => {
          setSelectedTable('all')
          setHomeAwayTitle('')
        }}
      >
        <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
          Alla matcher
        </div>
      </div>
      <div
        onClick={() => {
          setSelectedTable('home')
          setHomeAwayTitle('Hemma')
        }}
      >
        <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
          Hemmatabell
        </div>
      </div>
      <div
        onClick={() => {
          setSelectedTable('away')
          setHomeAwayTitle('Borta')
        }}
      >
        <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
          Bortatabell
        </div>
      </div>
    </div>
  )
}

export default SeasonTablesButtonList
