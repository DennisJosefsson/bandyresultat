import { useContext } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { useSearchParams, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import Table from './Subcomponents/Table'
import Record from './Subcomponents/Record'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback'

import MaratonHelp from './Subcomponents/MaratonHelp'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'

const Maraton = () => {
  const location = useLocation
  const { dispatch } = useContext(GenderContext)
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const tab = searchParams.get('tab')

  const maratonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    helpClickFunction: () => setSearchParams({ tab: 'help' }),
    tabBarArray: [
      {
        name: 'Maratontabeller',
        tabName: 'maraton',
        clickFunctions: () => setSearchParams({ tab: 'maraton', table: 'all' }),
      },
      {
        name: 'Rekord',
        tabName: 'records',
        clickFunctions: () =>
          setSearchParams({ tab: 'records', record: 'general' }),
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
      pageContent = <Table />
      break
  }

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <TabBarDivided
        tabBarObject={maratonTabBarObject}
        tab={tab}
        setSearchParams={setSearchParams}
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
