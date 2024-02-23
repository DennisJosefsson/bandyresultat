import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'
import SeasonHelp from './Subcomponents/SeasonHelpModal.jsx'
import SeasonTables from './Subcomponents/SeasonTables.jsx'
import Games from '../Game/Games.js'
import Playoff from './Subcomponents/SeasonPlayoff.jsx'
import SeasonStats from './Subcomponents/SeasonStats.jsx'
import Animation from '../Game/Subcomponents/Animation.js'
import Map from './Subcomponents/Map.jsx'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback.js'
import SeasonHeader from './Subcomponents/SeasonHeader.jsx'

import { TabBarInline } from '../utilitycomponents/Components/TabBar.js'
import useGenderContext from '../../hooks/contextHooks/useGenderContext.js'

const Season = () => {
  const unparsedSeasonId = useParams().seasonId

  const { women, dispatch } = useGenderContext()
  const [tab, setTab] = useState('tables')

  const { state } = useLocation()

  useEffect(() => {
    if (state && state.tab === 'games') {
      setTab('games')
    }
  }, [state])

  if (!unparsedSeasonId) throw new Error('Missing seasonId')

  if (
    !unparsedSeasonId.toString().match('^[0-9]{4}$') ||
    parseInt(unparsedSeasonId) > 2024
  ) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const seasonId = parseInt(unparsedSeasonId)

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
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
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
