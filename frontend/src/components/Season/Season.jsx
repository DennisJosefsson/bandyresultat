import { useParams, Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/logError'
import SeasonHelpModal from './SeasonHelpModal'
import SeasonTables from './SeasonTables'
import Games from '../Game/Games'
import Playoff from './SeasonPlayoff'
import SeasonStats from './SeasonStats'
import Animation from '../Game/Animation'
import Map from './Map'
import ErrorFallback from '../utilitycomponents/ErrorFallback'

import {
  LeftArrow,
  RightArrow,
  ListIcon,
  DevIcon,
  StatsIcon,
  TrophyIcon,
  CalendarIcon,
  ManIcon,
  WomanIcon,
  MapIcon,
} from '../utilitycomponents/icons'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'

const Season = () => {
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)
  const [tab, setTab] = useState('tables')
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
        <div className="flex flex-row justify-end">
          <div>
            <GenderButtonComponent
              women={women}
              clickFunctions={() => dispatch({ type: 'TOGGLE' })}
            />
          </div>
        </div>
        <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
          <p className="p-16 text-center">
            Första säsongen för damernas högsta serie var{' '}
            <Link to="/season/1973" className="font-bold">
              1972/73
            </Link>
            .
          </p>
        </div>
      </div>
    )
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
            <h2 className="text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
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
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div
          className={`${
            tab === 'games' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('games')}
        >
          Matcher
        </div>
        <div
          className={`${
            tab === 'tables' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('tables')}
        >
          Tabell
        </div>
        <div
          className={`${
            tab === 'playoff' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('playoff')}
        >
          Slutspel
        </div>
        <div
          className={`${
            tab === 'roundForRound' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('roundForRound')}
        >
          Utveckling
        </div>
        <div
          className={`${
            tab === 'stats' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('stats')}
        >
          Statistik
        </div>
        <div
          className={`${
            tab === 'map' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('map')}
        >
          Karta
        </div>
        <div
          className="cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200"
          onClick={() => dispatch({ type: 'TOGGLE' })}
        >
          {women ? 'Herrar' : 'Damer'}
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        <div
          className={`${
            tab === 'games' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('games')}
        >
          <CalendarIcon />
        </div>
        <div
          className={`${
            tab === 'tables' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('tables')}
        >
          <ListIcon />
        </div>
        <div
          className={`${
            tab === 'playoff' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('playoff')}
        >
          <TrophyIcon />
        </div>
        <div
          className={`${
            tab === 'roundForRound' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('roundForRound')}
        >
          <DevIcon />
        </div>
        <div
          className={`${
            tab === 'stats' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('stats')}
        >
          <StatsIcon />
        </div>
        <div
          className={`${
            tab === 'map' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('map')}
        >
          <MapIcon />
        </div>
        <div
          className="cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200"
          onClick={() => dispatch({ type: 'TOGGLE' })}
        >
          {women ? <ManIcon /> : <WomanIcon />}
        </div>
      </div>
      <div>
        {seasonId === 2025 && (
          <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
            <p>Inga resultat än.</p>
          </div>
        )}
        {women && seasonId < 1973 && (
          <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
            <p>
              Första säsongen för damernas högsta serie var{' '}
              <Link to="/season/1973" className="font-bold">
                1972/73
              </Link>
              .
            </p>
          </div>
        )}
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
        </ErrorBoundary>
      </div>

      {showHelpModal ? (
        <>
          <SeasonHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
    </div>
  )
}

export default Season
