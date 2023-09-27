const GenderButtonComponent = ({ women, clickFunctions }) => {
  return (
    <div
      className="mb-4 cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 min-[360px]:w-[84px] min-[360px]:text-sm lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
      onClick={clickFunctions}
    >
      {women ? 'Herrar' : 'Damer'}
    </div>
  )
}

export default GenderButtonComponent
