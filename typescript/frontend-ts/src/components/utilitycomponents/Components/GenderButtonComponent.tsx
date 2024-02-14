type ButtonProps = {
  women: boolean
  clickFunctions: () => void
}

const GenderButtonComponent = ({ women, clickFunctions }: ButtonProps) => {
  return (
    <div
      className="mb-4 w-[72px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 xs:w-[84px] xs:text-sm lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-base"
      onClick={clickFunctions}
    >
      {women ? 'Herrar' : 'Damer'}
    </div>
  )
}

export default GenderButtonComponent
