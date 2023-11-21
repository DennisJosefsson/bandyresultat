import { useContext, useState } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import Table from './Subcomponents/Table'
import Record from './Subcomponents/Record'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback'

import MaratonHelp from './Subcomponents/MaratonHelp'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'

const Maraton = () => {
  const { dispatch } = useContext(GenderContext)
  const [tab, setTab] = useState('maraton')

  const maratonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    tabBarArray: [
      {
        name: 'Maratontabeller',
        tabName: 'maraton',
        clickFunctions: () => setTab('maraton'),
      },
      {
        name: 'Rekord',
        tabName: 'records',
        clickFunctions: () => setTab('records'),
      },
    ],
  }

  let pageContent
  switch (tab) {
    case 'maraton':
      pageContent = <Table />
      break
    case 'records':
      pageContent = <Record />
      break

    case 'help':
      pageContent = <MaratonHelp />
      break
    default:
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <TabBarDivided
        tabBarObject={maratonTabBarObject}
        tab={tab}
        setTab={setTab}
      />
      <div className="mt-2">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          {pageContent}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Maraton
