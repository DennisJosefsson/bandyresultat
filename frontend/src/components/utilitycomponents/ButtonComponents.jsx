export const ButtonComponent = ({ children, clickFunctions }) => {
  return (
    <div
      onClick={clickFunctions}
      className="xxs:w-[72px] xs:w-[84px] xs:text-sm mb-4 cursor-pointer truncate rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out first:last:px-1 hover:bg-slate-600 lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
    >
      {children}
    </div>
  )
}
export const HiddenButtonComponent = ({ children, clickFunctions }) => {
  return (
    <div
      onClick={clickFunctions}
      className="xxs:w-[72px] xs:w-[84px] xs:text-sm mb-4 cursor-pointer truncate rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg xl:hidden"
    >
      {children}
    </div>
  )
}
