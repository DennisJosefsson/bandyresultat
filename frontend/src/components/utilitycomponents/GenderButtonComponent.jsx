const GenderButtonComponent = ({ women, clickFunctions }) => {
  return (
    <div
      className="mb-4 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white transition-all duration-150 ease-in-out hover:scale-105 lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
      onClick={clickFunctions}
    >
      {women ? 'Herrar' : 'Damer'}
    </div>
  )
}

export default GenderButtonComponent
