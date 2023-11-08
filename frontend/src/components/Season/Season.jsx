import { useParams, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
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

import { LeftArrow, RightArrow } from '../utilitycomponents/Components/icons'

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
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
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

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="flex flex-row justify-center">
        <div className="mx-auto mb-4 flex w-full flex-1 flex-row items-center justify-center">
          <div className={seasonId - 1 === 1906 ? 'invisible' : null}>
            <Link to={`/season/${seasonId - 1}`} state={{ resetRound: true }}>
              <div className="flex flex-row items-center gap-1">
                <LeftArrow />
              </div>
            </Link>
          </div>
          <div className="mx-16">
            <h2 className="text-center text-[12px] font-bold sm:text-xl lg:text-2xl">
              Säsong{' '}
              {seasonId < 1964 ? `${seasonId}` : `${seasonId - 1}/${seasonId}`}{' '}
              {women ? 'Damer' : 'Herrar'}
            </h2>
          </div>
          <div className={seasonId + 1 === 2025 ? 'invisible' : null}>
            <Link to={`/season/${seasonId + 1}`} state={{ resetRound: true }}>
              <div className="flex flex-row items-center gap-1">
                <RightArrow />
              </div>
            </Link>
          </div>
        </div>
      </div>

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
          {tab === 'tables' && seasonId < 2025 && (
            <SeasonTables seasonId={seasonId} />
          )}
          {tab === 'games' && seasonId < 2025 && <Games seasonId={seasonId} />}
          {tab === 'playoff' && seasonId < 2025 && (
            <Playoff seasonId={seasonId} />
          )}
          {tab === 'roundForRound' && seasonId < 2025 && (
            <Animation seasonId={seasonId} />
          )}
          {tab === 'stats' && seasonId < 2025 && (
            <SeasonStats seasonId={seasonId} />
          )}
          {tab === 'map' && seasonId < 2025 && <Map seasonId={seasonId} />}
          {tab === 'help' && <SeasonHelp />}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Season
