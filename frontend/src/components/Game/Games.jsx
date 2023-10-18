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
import { sortOrder, groupConstant } from '../utilitycomponents/constants'

import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Games = ({ seasonId }) => {
  const { women } = useContext(GenderContext)
  const { user } = useContext(UserContext)

  const categoryRefs = useRef({})

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
    window.scrollTo(0, categoryRefs.current[ref].offsetTop)
  }

  const games = data
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

  const unsortedFinalGames = games.filter((game) => game.category === 'final')
  const unsortedSemiGames = games.filter((game) => game.category === 'semi')
  const unsortedQuarterGames = games.filter(
    (game) => game.category === 'quarter',
  )
  const unsortedEightGames = games.filter((game) => game.category === 'eight')
  const unsortedRegularGames = games.filter(
    (game) => game.category === 'regular',
  )
  const unsortedQualificationGames = games.filter(
    (game) => game.category === 'qualification',
  )

  const categoryArray = [
    ...new Set(
      games
        .map((game) => game.category)
        .sort((a, b) => {
          if (sortOrder.indexOf(a) > sortOrder.indexOf(b)) {
            return 1
          }

          if (sortOrder.indexOf(a) < sortOrder.indexOf(b)) {
            return -1
          }
        }),
    ),
  ]

  const finalGames = gameSortFunction(unsortedFinalGames)
  const semiGames = gameSortFunction(unsortedSemiGames)
  const quarterGames = gameSortFunction(unsortedQuarterGames)
  const eightGames = gameSortFunction(unsortedEightGames)
  const regularGames = gameSortFunction(unsortedRegularGames)
  const qualificationGames = gameSortFunction(unsortedQualificationGames)

  const genderSeason = season.filter((indSeason) => indSeason.women === women)

  const seriesInfo = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
        <p className="p-16 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/games/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="w-full" ref={(el) => (categoryRefs.current['top'] = el)}>
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
            <p>Inga resultat än.</p>
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
        <div className="mx-1 flex flex-row justify-between xl:mx-0">
          <div className="w-full px-2 xl:px-0">
            {finalGames.length > 0 && (
              <GamesList
                gamesArray={finalGames}
                title={'Final'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['final'] = el)}
                seriesInfo={seriesInfo}
              />
            )}
            {semiGames.length > 0 && (
              <GamesList
                gamesArray={semiGames}
                title={'Semifinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['semi'] = el)}
                seriesInfo={seriesInfo}
              />
            )}
            {quarterGames.length > 0 && (
              <GamesList
                gamesArray={quarterGames}
                title={'Kvartsfinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['quarter'] = el)}
                seriesInfo={seriesInfo}
              />
            )}
            {eightGames.length > 0 && (
              <GamesList
                gamesArray={eightGames}
                title={'Åttondelsfinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['eight'] = el)}
                seriesInfo={seriesInfo}
              />
            )}
            {regularGames.length > 0 && (
              <GamesList
                gamesArray={regularGames}
                title={'Grundseriematcher'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['regular'] = el)}
                seriesInfo={seriesInfo}
              />
            )}

            {qualificationGames.length > 0 && (
              <GamesList
                gamesArray={qualificationGames}
                title={'Kvalmatcher'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['qualification'] = el)}
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

      <div ref={(el) => (categoryRefs.current['bottom'] = el)}></div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
        {categoryArray.map((cat) => {
          return (
            <div
              key={cat}
              onClick={(event) => scrollTo(event, cat)}
              className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
            >
              {groupConstant[cat]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Games
