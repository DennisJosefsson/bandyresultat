import { useQuery, useMutation } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { getSingleSeason } from '../../requests/seasons'
import { postGame } from '../../requests/games'
import { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'

import Spinner from '../utilitycomponents/spinner'
import GamesList from './GamesList'
import GameForm from './GameForm'

import { ButtonComponent } from '../utilitycomponents/ButtonComponents'
import { gameSortFunction } from '../utilitycomponents/sortFunction'

import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Games = ({ seasonId }) => {
  const { women } = useContext(GenderContext)
  const { user } = useContext(UserContext)

  const topRef = useRef(null)
  const bottomRef = useRef(null)

  const [teamFilter, setTeamFilter] = useState('')

  const [showAddGameModal, setShowAddGameModal] = useState(false)

  const [gameData, setGameData] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId),
  )

  const {
    data: season,
    isLoading: isSeasonLoading,
    error: seasonError,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))

  const postGameMutation = useMutation({
    mutationFn: postGame,
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  if (isLoading || isSeasonLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || seasonError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  if (!seasonId.toString().match('^[0-9]{4}$')) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
  }

  const games = data
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

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

  const genderSeason = season.filter((indSeason) => indSeason.women === women)

  const seriesInfo = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="w-full" ref={topRef}>
        <form>
          <input
            className="w-full border-[#011d29] focus:border-[#011d29]"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) =>
              setTeamFilter(
                event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ''),
              )
            }
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>

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
                    played
                  />
                )}
                {playedSemiGames.length > 0 && (
                  <GamesList
                    gamesArray={playedSemiGames}
                    title={'Semifinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    played
                  />
                )}
                {playedQuarterGames.length > 0 && (
                  <GamesList
                    gamesArray={playedQuarterGames}
                    title={'Kvartsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    played
                  />
                )}
                {playedEightGames.length > 0 && (
                  <GamesList
                    gamesArray={playedEightGames}
                    title={'Åttondelsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    played
                  />
                )}
                {playedRegularGames.length > 0 && (
                  <GamesList
                    gamesArray={playedRegularGames}
                    title={'Grundseriematcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    played
                  />
                )}

                {playedQualificationGames.length > 0 && (
                  <GamesList
                    gamesArray={playedQualificationGames}
                    title={'Kvalmatcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                    played
                  />
                )}
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
                  />
                )}
                {unplayedSemiGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedSemiGames}
                    title={'Semifinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                  />
                )}
                {unplayedQuarterGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedQuarterGames}
                    title={'Kvartsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                  />
                )}
                {unplayedEightGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedEightGames}
                    title={'Åttondelsfinaler'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                  />
                )}
                {unplayedRegularGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedRegularGames}
                    title={'Grundseriematcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                  />
                )}

                {unplayedQualificationGames.length > 0 && (
                  <GamesList
                    gamesArray={unplayedQualificationGames}
                    title={'Kvalmatcher'}
                    setShowModal={setShowAddGameModal}
                    setGameData={setGameData}
                    seriesInfo={seriesInfo}
                  />
                )}
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
        </div>
      )}
      {showAddGameModal ? (
        <>
          <GameForm
            women={women}
            season={genderSeason}
            mutation={postGameMutation}
            setShowModal={setShowAddGameModal}
            gameData={gameData}
            setGameData={setGameData}
          />
        </>
      ) : null}

      <div ref={bottomRef}></div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
        <div
          onClick={(event) => scrollTo(event, topRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla upp
        </div>
        <div
          onClick={(event) => scrollTo(event, bottomRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla ner
        </div>
      </div>
    </div>
  )
}

export default Games
