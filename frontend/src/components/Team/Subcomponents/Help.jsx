import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
import { useState } from 'react'
import TeamsListHelp from './TeamsListHelpModal'
import CompareHelp from '../../Compare/CompareHelpModal'

const Help = () => {
  const [help, setHelp] = useState('list')
  return (
    <div className="mt-2">
      <div className="flex flex-row justify-center gap-2">
        <ButtonComponent
          active={`${
            help === 'list' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => setHelp('list')}
        >
          Lista/Karta
        </ButtonComponent>
        <ButtonComponent
          active={`${
            help === 'compare' ? 'ring-2 ring-cyan-600 ring-inset' : null
          }`}
          clickFunctions={() => setHelp('compare')}
        >
          Jämförelse
        </ButtonComponent>
      </div>
      <div>
        {help == 'list' && <TeamsListHelp />}
        {help == 'compare' && <CompareHelp />}
      </div>
    </div>
  )
}

export default Help
