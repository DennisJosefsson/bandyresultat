import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import SeasonHelp from './Subcomponents/SeasonHelpModal'
import SeasonTables from './Subcomponents/SeasonTables'
import Games from '../Game/Games'
import Playoff from './Subcomponents/SeasonPlayoff'
import SeasonStats from './Subcomponents/SeasonStats'
import Animation from '../Game/Subcomponents/Animation'
import Map from './Subcomponents/Map'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback'
import SeasonHeader from './Subcomponents/SeasonHeader'

import { TabBarInline } from '../utilitycomponents/Components/TabBar'

const Season = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const tab = searchParams.get('tab')
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)

  useEffect(() => {
    if (seasonId.toString().match('^[0-9]{4}$'))
      document.title =
        seasonId < 1964
          ? `Bandyresultat - ${seasonId}`
          : `Bandyresultat - ${seasonId - 1}/${seasonId}`
    return () => (document.title = 'Bandyresultat')
  }, [seasonId])

  if (!seasonId.toString().match('^[0-9]{4}$') || seasonId > 2024) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const seasonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    helpClickFunction: () => setSearchParams({ tab: 'help' }),
    tabBarArray: [
      {
        name: 'Matcher',
        tabName: 'games',
        clickFunctions: () => setSearchParams({ tab: 'games' }),
      },
      {
        name: 'Tabell',
        tabName: 'tables',
        clickFunctions: () => setSearchParams({ tab: 'tables' }),
      },
      {
        name: 'Slutspel',
        tabName: 'playoff',
        clickFunctions: () => setSearchParams({ tab: 'playoff' }),
      },
      {
        name: 'Utveckling',
        tabName: 'roundForRound',
        clickFunctions: () => setSearchParams({ tab: 'roundForRound' }),
      },
      {
        name: 'Statistik',
        tabName: 'stats',
        clickFunctions: () => setSearchParams({ tab: 'stats' }),
      },
      {
        name: 'Karta',
        tabName: 'map',
        clickFunctions: () => setSearchParams({ tab: 'map' }),
      },
    ],
  }

  let pageContent
  switch (tab) {
    case 'tables':
      pageContent = <SeasonTables seasonId={seasonId} />
      break
    case 'games':
      pageContent = <Games seasonId={seasonId} />
      break
    case 'playoff':
      pageContent = <Playoff seasonId={seasonId} />
      break
    case 'roundForRound':
      pageContent = <Animation seasonId={seasonId} />
      break
    case 'stats':
      pageContent = <SeasonStats seasonId={seasonId} />
      break
    case 'map':
      pageContent = <Map seasonId={seasonId} />
      break
    case 'help':
      pageContent = <SeasonHelp />
      break
    default:
      pageContent = <SeasonTables seasonId={seasonId} />
      break
  }

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <SeasonHeader seasonId={seasonId} women={women} tab={tab} />

      <TabBarInline
        tabBarObject={seasonTabBarObject}
        tab={tab}
        setSearchParams={setSearchParams}
      />
      <div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          {seasonId < 2025 && pageContent}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Season
