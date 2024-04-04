export type TabBarObject = {
  help?: JSX.Element
  gender: JSX.Element
  tabBarArray: {
    tab: JSX.Element
    tabName: string
    conditional?: string | boolean
  }[]
}

export const TabBarInline = ({
  tabBarObject,
}: {
  tabBarObject: TabBarObject
}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between xs:mb-2 xs:gap-1 md:gap-2">
        {tabBarObject.tabBarArray.map((currTab) => {
          return <div key={currTab.tabName}>{currTab.tab}</div>
        })}
        {tabBarObject.help ? tabBarObject.help : null}
        {tabBarObject.gender}
      </div>
    </div>
  )
}

export const TabBarDivided = ({
  tabBarObject,
  onlyDesktop,
}: {
  tabBarObject: TabBarObject
  onlyDesktop?: boolean
}) => {
  return (
    <div>
      <div className="hidden items-center xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row xs:gap-1 md:gap-2">
          {tabBarObject.tabBarArray.map((currTab) => {
            return <div key={currTab.tabName}>{currTab.tab}</div>
          })}
        </div>
        <div className="flex flex-row xs:gap-1 md:gap-2">
          {tabBarObject.help ? tabBarObject.help : null}
          {tabBarObject.gender}
        </div>
      </div>
      {!onlyDesktop && (
        <div className="flex flex-row justify-between gap-1  xs:mb-2 xs:hidden md:gap-2 md:text-lg">
          <div className="flex flex-row xs:gap-1 md:gap-2">
            {tabBarObject.tabBarArray.map((currTab) => {
              return <div key={currTab.tabName}>{currTab.tab}</div>
            })}
          </div>
          <div className="flex flex-row xs:gap-1 md:gap-2">
            {tabBarObject.help ? tabBarObject.help : null}
            {tabBarObject.gender}
          </div>
        </div>
      )}
    </div>
  )
}
