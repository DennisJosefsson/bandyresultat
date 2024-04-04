import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import ScrollRefComponent from '../utilitycomponents/Components/ScrollRefComponent'
import GameForm from './Subcomponents/GameForm'
import {
  Loading,
  DataError,
} from '../utilitycomponents/Components/LoadingOrError'
import { ButtonComponent } from '../utilitycomponents/Components/ButtonComponents'

import FilterComponent from './Subcomponents/FilterComponent'
import { GameObjectType } from '../types/games/games'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
import useUserContext from '../../hooks/contextHooks/useUserContext'
import useSeasonContext from '../../hooks/contextHooks/useSeasonContext'
import useScrollTo from '../../hooks/domHooks/useScrollTo'
import { useSingleSeasonGames } from '../../hooks/dataHooks/seasonHooks/gameHooks/useSingleSeasonGames'
import PlayedGames from './Subcomponents/PlayedGames'
import UnplayedGames from './Subcomponents/UnplayedGames'
import { useGamesSingleSeason } from '../../hooks/dataHooks/seasonHooks/gameHooks/useGamesSingleSeason'
import { useGamesSeason } from '../../hooks/dataHooks/seasonHooks/gameHooks/useGamesSeason'
import { useGetFirstAndLastSeason } from '../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'

const Games = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()

  const { user } = useUserContext()

  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [teamFilter, setTeamFilter] = useState<string>('')

  const [showAddGameModal, setShowAddGameModal] = useState<boolean>(false)

  const [gameData, setGameData] = useState<GameObjectType | null>(null)

  const { playedGamesLength, unplayedGamesLength, isLoading, error } =
    useSingleSeasonGames(seasonId, teamFilter)
  const {
    genderSeason,
    isLoading: isSeasonLoading,
    error: seasonError,
  } = useGamesSingleSeason(seasonId)

  const { isLoading: isAllSeasonsLoading, error: allSeasonsError } =
    useGamesSeason()

  const { lastSeason } = useGetFirstAndLastSeason()

  useScrollTo()

  useEffect(() => {
    setTeamFilter('')
  }, [seasonId])

  if (error || seasonError || allSeasonsError) return <DataError />

  if (isLoading || isSeasonLoading || isAllSeasonsLoading) return <Loading />

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div
      className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-foreground"
      ref={topRef}
    >
      <FilterComponent setTeamFilter={setTeamFilter} teamFilter={teamFilter} />

      {seasonId <= lastSeason && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0">
          {playedGamesLength > 0 && (
            <PlayedGames
              teamFilter={teamFilter}
              setGameData={setGameData}
              setShowAddGameModal={setShowAddGameModal}
            />
          )}
          {unplayedGamesLength > 0 && (
            <UnplayedGames
              teamFilter={teamFilter}
              setGameData={setGameData}
              setShowAddGameModal={setShowAddGameModal}
            />
          )}
          <div>
            {user && (
              <div>
                <ButtonComponent
                  clickFunctions={() => setShowAddGameModal(true)}
                >
                  Lägg till Match
                </ButtonComponent>
              </div>
            )}
          </div>
        </div>
      )}
      {showAddGameModal ? (
        <>
          <GameForm
            women={women}
            season={genderSeason}
            setShowModal={setShowAddGameModal}
            gameData={gameData}
            setGameData={setGameData}
          />
        </>
      ) : null}

      <div ref={bottomRef}></div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Games
