import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

const MaratonTableHeader = ({ setHomeAwayTitle, setSelectedTable }) => {
  return (
    <div className="mb-2 flex flex-row justify-center gap-4">
      <div>
        <ButtonComponent
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
