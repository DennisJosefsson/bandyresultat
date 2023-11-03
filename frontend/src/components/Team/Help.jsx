import { ButtonComponent } from '../utilitycomponents/ButtonComponents'
import { useState } from 'react'
import TeamsListHelp from './TeamsListHelpModal'
import CompareHelp from '../Compare/CompareHelpModal'

const Help = () => {
  const [help, setHelp] = useState('list')
  return (
    <div className="mt-2">
      <div className="flex flex-row justify-center gap-2">
        <ButtonComponent clickFunctions={() => setHelp('list')}>
          Lista/Karta
        </ButtonComponent>
        <ButtonComponent clickFunctions={() => setHelp('compare')}>
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
