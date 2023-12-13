import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

const SeasonTablesButtonList = ({
  setHomeAwayTitle,
  setSelectedTable,
  table,
}) => {
  return (
    <div className="mt-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
      <ButtonComponent
        active={`${table === 'all' ? 'ring-2 ring-cyan-600 ring-inset' : null}`}
        clickFunctions={() => {
          setSelectedTable('all')
          setHomeAwayTitle('')
        }}
      >
        Alla matcher
      </ButtonComponent>
      <ButtonComponent
        active={`${
          table === 'home' ? 'ring-2 ring-cyan-600 ring-inset' : null
        }`}
        clickFunctions={() => {
          setSelectedTable('home')
          setHomeAwayTitle('Hemma')
        }}
      >
        Hemmatabell
      </ButtonComponent>
      <ButtonComponent
        active={`${
          table === 'away' ? 'ring-2 ring-cyan-600 ring-inset' : null
        }`}
        clickFunctions={() => {
          setSelectedTable('away')
          setHomeAwayTitle('Borta')
        }}
      >
        Bortatabell
      </ButtonComponent>
    </div>
  )
}

export default SeasonTablesButtonList
