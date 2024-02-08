import { useParams, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.jsx'
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
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)
  const [tab, setTab] = useState('tables')

  const { state } = useLocation()

  useEffect(() => {
    if (state && state.tab === 'games') {
      setTab('games')
    }
  }, [state])

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
      <div className="font-inter mx-auto grid h-screen place-items-center text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const seasonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    tabBarArray: [
      {
        name: 'Matcher',
        tabName: 'games',
        clickFunctions: () => setTab('games'),
      },
      {
        name: 'Tabell',
        tabName: 'tables',
        clickFunctions: () => setTab('tables'),
      },
      {
        name: 'Slutspel',
        tabName: 'playoff',
        clickFunctions: () => setTab('playoff'),
      },
      {
        name: 'Utveckling',
        tabName: 'roundForRound',
        clickFunctions: () => setTab('roundForRound'),
      },
      {
        name: 'Statistik',
        tabName: 'stats',
        clickFunctions: () => setTab('stats'),
      },
      {
        name: 'Karta',
        tabName: 'map',
        clickFunctions: () => setTab('map'),
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
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }

  return (
    <div className="font-inter mx-auto mt-2 flex min-h-screen max-w-7xl flex-col text-[#011d29]">
      <SeasonHeader seasonId={seasonId} women={women} />

      <TabBarInline
        tabBarObject={seasonTabBarObject}
        tab={tab}
        setTab={setTab}
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
