import { useQuery } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { getSingleSeason, getSeasons } from '../../requests/seasons'

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import ScrollRefComponent from '../utilitycomponents/Components/ScrollRefComponent'
import GamesList from './Subcomponents/GamesList'
import GameForm from './Subcomponents/GameForm'
import LoadingOrError from '../utilitycomponents/Components/LoadingOrError'
import { ButtonComponent } from '../utilitycomponents/Components/ButtonComponents'
import { gameSortFunction } from '../utilitycomponents/functions/sortFunction'

import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import FilterComponent from './Subcomponents/FilterComponent'
import { GameObjectType } from '../types/games/games'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
import useUserContext from '../../hooks/contextHooks/useUserContext'

dayjs.locale('sv')

const Games = ({ seasonId }: { seasonId: number }) => {
  const { women } = useGenderContext()

  const { user } = useUserContext()

  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [teamFilter, setTeamFilter] = useState<string>('')

  const [showAddGameModal, setShowAddGameModal] = useState<boolean>(false)

  const [gameData, setGameData] = useState<GameObjectType | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    setTeamFilter('')
  }, [seasonId])

  const { data, isLoading, error, isSuccess } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId),
  )

  const {
    data: season,
    isLoading: isSeasonLoading,
    error: seasonError,
    isSuccess: isSeasonSuccess,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))

  const {
    data: unFilteredSeasons,
    isLoading: isAllSeasonsLoading,
    error: allSeasonsError,
    isSuccess: isAllSeasonSuccess,
  } = useQuery(['seasons'], getSeasons)

  // const postGameMutation = useMutation({
  //   mutationFn: postGame,
  // })

  if (
    isLoading ||
    isSeasonLoading ||
    isAllSeasonsLoading ||
    error ||
    seasonError ||
    allSeasonsError
  )
    return (
      <LoadingOrError
        isLoading={isLoading || isSeasonLoading || isAllSeasonsLoading}
        error={error || seasonError || allSeasonsError}
      />
    )

  if (!seasonId.toString().match('^[0-9]{4}$')) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const allSeasons = isAllSeasonSuccess
    ? unFilteredSeasons.filter((season) => season.women === women)
    : []

  const startSeasonObject = allSeasons.pop()
  const endSeasonObject = allSeasons.shift()

  const startSeason = startSeasonObject ? startSeasonObject.seasonId : null
  const endSeason = endSeasonObject ? endSeasonObject.seasonId : null

  const singleSeason = isSeasonSuccess ? season : []

  const games = isSuccess
    ? data
        .filter((table) => table.women === women)
        .filter(
          (game) =>
            game.homeTeam?.name
              .toLowerCase()
              .includes(teamFilter.toLowerCase()) ||
            game.awayTeam?.name
              .toLowerCase()
              .includes(teamFilter.toLowerCase()),
        )
    : []

  const unsortedPlayedFinalGames = games
    .filter((game) => game.category === 'final')
    .filter((game) => game.played === true)
  const unsortedPlayedSemiGames = games
    .filter((game) => game.category === 'semi')
    .filter((game) => game.played === true)
  const unsortedPlayedQuarterGames = games
    .filter((game) => game.category === 'quarter')
    .filter((game) => game.played === true)
  const unsortedPlayedEightGames = games
    .filter((game) => game.category === 'eight')
    .filter((game) => game.played === true)
  const unsortedPlayedRegularGames = games
    .filter((game) => game.category === 'regular')
    .filter((game) => game.played === true)
  const unsortedPlayedQualificationGames = games
    .filter((game) => game.category === 'qualification')
    .filter((game) => game.played === true)
  const unsortedUnplayedFinalGames = games
    .filter((game) => game.category === 'final')
    .filter((game) => game.played === false)
  const unsortedUnplayedSemiGames = games
    .filter((game) => game.category === 'semi')
    .filter((game) => game.played === false)
  const unsortedUnplayedQuarterGames = games
    .filter((game) => game.category === 'quarter')
    .filter((game) => game.played === false)
  const unsortedUnplayedEightGames = games
    .filter((game) => game.category === 'eight')
    .filter((game) => game.played === false)
  const unsortedUnplayedRegularGames = games
    .filter((game) => game.category === 'regular')
    .filter((game) => game.played === false)
  const unsortedUnplayedQualificationGames = games
    .filter((game) => game.category === 'qualification')
    .filter((game) => game.played === false)

  const playedFinalGames = gameSortFunction(unsortedPlayedFinalGames, true)
  const playedSemiGames = gameSortFunction(unsortedPlayedSemiGames, true)
  const playedQuarterGames = gameSortFunction(unsortedPlayedQuarterGames, true)
  const playedEightGames = gameSortFunction(unsortedPlayedEightGames, true)
  const playedRegularGames = gameSortFunction(unsortedPlayedRegularGames, true)
  const playedQualificationGames = gameSortFunction(
    unsortedPlayedQualificationGames,
    true,
  )
  const unplayedFinalGames = gameSortFunction(unsortedUnplayedFinalGames)
  const unplayedSemiGames = gameSortFunction(unsortedUnplayedSemiGames)
  const unplayedQuarterGames = gameSortFunction(unsortedUnplayedQuarterGames)
  const unplayedEightGames = gameSortFunction(unsortedUnplayedEightGames)
  const unplayedRegularGames = gameSortFunction(unsortedUnplayedRegularGames)
  const unplayedQualificationGames = gameSortFunction(
    unsortedUnplayedQualificationGames,
  )

  const genderSeason = singleSeason.filter(
    (indSeason) => indSeason.women === women,
  )

  const genderSeasonObject = singleSeason.find(
    (season) => season.women === women,
  )
  const seriesInfo = genderSeasonObject ? genderSeasonObject.series : []

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
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
      className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]"
      ref={topRef}
    >
      <FilterComponent setTeamFilter={setTeamFilter} teamFilter={teamFilter} />

      {seasonId === 2025 && (
        <div>
          <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
            <p>Inga matcher än.</p>
          </div>
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
      {seasonId < 2025 && (
        <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0">
          {games.filter((game) => game.played === true).length > 0 && (
            <div>
              <h1 className="text-[1rem] font-bold md:text-[1.25rem]">
                Spelade
              </h1>
              <div className="w-full px-2 xl:px-0">
                {playedFinalGames.length > 0 && (
                  <GamesList
                    gamesArray={playedFinalGames}
                    title={'Final'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {playedSemiGames.length > 0 && (
                  <GamesList
                    gamesArray={playedSemiGames}
                    title={'Semifinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {playedQuarterGames.length > 0 && (
                  <GamesList
                    gamesArray={playedQuarterGames}
                    title={'Kvartsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {playedEightGames.length > 0 && (
                  <GamesList
                    gamesArray={playedEightGames}
                    title={'Åttondelsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {playedRegularGames.length > 0 && (
                  <GamesList
                    gamesArray={playedRegularGames}
                    title={'Grundseriematcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}

                {playedQualificationGames.length > 0 && (
                  <GamesList
                    gamesArray={playedQualificationGames}
                    title={'Kvalmatcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
              </div>
            </div>
          )}
          {games.filter((game) => game.played === false).length > 0 && (
            <div>
              <h1 className="text-[1rem] font-bold md:text-[1.25rem]">
                Kommande
              </h1>
              <div className="w-full px-2 xl:px-0">
                {unplayedFinalGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedFinalGames}
                    title={'Final'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {unplayedSemiGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedSemiGames}
                    title={'Semifinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {unplayedQuarterGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedQuarterGames}
                    title={'Kvartsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {unplayedEightGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedEightGames}
                    title={'Åttondelsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
                {unplayedRegularGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedRegularGames}
                    title={'Grundseriematcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}

                {unplayedQualificationGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedQualificationGames}
                    title={'Kvalmatcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    startSeason={startSeason}
                    endSeason={endSeason}
                  />
                )}
              </div>
            </div>
          )}
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
