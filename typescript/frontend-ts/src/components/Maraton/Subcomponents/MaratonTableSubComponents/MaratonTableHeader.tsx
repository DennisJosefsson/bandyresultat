import { Dispatch, SetStateAction } from 'react'
import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

type MaratonTableHeaderProps = {
  setHomeAwayTitle: Dispatch<SetStateAction<string>>
  setSelectedTable: Dispatch<SetStateAction<string>>
  table: string
}

const MaratonTableHeader = ({
  setHomeAwayTitle,
  setSelectedTable,
  table,
}: MaratonTableHeaderProps) => {
  return (
    <div className="mb-2 flex flex-row justify-center gap-4">
      <div>
        <ButtonComponent
          active={`${
            table === 'home' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => {
            setSelectedTable('home')
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
            setSelectedTable('away')
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
            setSelectedTable('all')
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
