import { useState } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'
import Table from './Subcomponents/Table.jsx'
import Record from './Subcomponents/Record.jsx'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback.js'

import MaratonHelp from './Subcomponents/MaratonHelp.jsx'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar.js'
import useGenderContext from '../../hooks/contextHooks/useGenderContext.js'

const Maraton = () => {
  const [tab, setTab] = useState<string>('maraton')

  const { women, dispatch } = useGenderContext()

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
      pageContent = <Table women={women} />
      break
    case 'records':
      pageContent = <Record women={women} />
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
