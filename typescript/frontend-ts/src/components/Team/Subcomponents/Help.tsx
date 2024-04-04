import { Button } from '@/src/@/components/ui/button'
import { useState } from 'react'
import TeamsListHelp from './TeamsListHelpModal'
import CompareHelp from '../../Compare/CompareHelpModal'

const Help = () => {
  const [help, setHelp] = useState('list')
  return (
    <div className="mt-2">
      <div className="flex flex-row justify-center gap-2">
        <Button
          onClick={() => setHelp('list')}
          variant={help === 'list' ? 'default' : 'outline'}
        >
          Lista/Karta
        </Button>
        <Button
          onClick={() => setHelp('compare')}
          variant={help === 'compare' ? 'default' : 'outline'}
        >
          Jämförelse
        </Button>
      </div>
      <div className="flex flex-row justify-center">
        {help == 'list' && <TeamsListHelp />}
        {help == 'compare' && <CompareHelp />}
      </div>
    </div>
  )
}

export default Help
