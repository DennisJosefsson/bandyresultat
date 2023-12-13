import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

const MaratonTableHeader = ({ setHomeAwayTitle, setSearchParams, table }) => {
  return (
    <div className="mb-2 flex flex-row justify-center gap-4">
      <div>
        <ButtonComponent
          active={`${
            table === 'home' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => {
            setSearchParams({ tab: 'maraton', table: 'home' })
            setHomeAwayTitle('Hemma')
          }}
        >
          Hemma
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent
          active={`${
            table === 'away' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => {
            setSearchParams({ tab: 'maraton', table: 'away' })
            setHomeAwayTitle('Borta')
          }}
        >
          Borta
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent
          active={`${
            table === 'all' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => {
            setSearchParams({ tab: 'maraton', table: 'all' })
            setHomeAwayTitle('')
          }}
        >
          Alla
        </ButtonComponent>
      </div>
    </div>
  )
}

export default MaratonTableHeader
