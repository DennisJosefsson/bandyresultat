import { useQuery, useMutation } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { getSingleSeason } from '../../requests/seasons'
import { postGame } from '../../requests/games'
import { useState, useContext, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'
import Spinner from '../utilitycomponents/spinner'
import GamesList from './GamesList'
import GameForm from './GameForm'
import GamesHelpModal from './GamesHelpModal'
import CuriositiesModal from './CuriositiesModal'
import StatsModal from './StatsModal'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'
import {
  ButtonComponent,
  HiddenButtonComponent,
} from '../utilitycomponents/ButtonComponents'
import { gameSortFunction } from '../utilitycomponents/sortFunction'
import { sortOrder, groupConstant } from '../utilitycomponents/constants'
import { LeftArrow, RightArrow } from '../utilitycomponents/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Games = () => {
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)
  const { user } = useContext(UserContext)
  const categoryRefs = useRef({})

  const [teamFilter, setTeamFilter] = useState('')
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showAddGameModal, setShowAddGameModal] = useState(false)
  const [showCuriositiesModal, setShowCuriositiesModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
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

  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, categoryRefs.current[ref].offsetTop)
  }

  const games = data.games
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

  const unbeatenStreak = data.unbeatenStreak.filter(
    (table) => table.women === women,
  )
  const winStreak = data.winStreak.filter((table) => table.women === women)
  const drawStreak = data.drawStreak.filter((table) => table.women === women)
  const noWinStreak = data.noWinStreak.filter((table) => table.women === women)
  const losingStreak = data.losingStreak.filter(
    (table) => table.women === women,
  )

  const maxGoalsMen = data.maxGoalsMen
  const minGoalsMen = data.minGoalsMen
  const maxDiffMen = data.maxDiffMen
  const maxGoalsWomen = data.maxGoalsWomen
  const minGoalsWomen = data.minGoalsWomen
  const maxDiffWomen = data.maxDiffWomen

  const streakDataLength =
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length +
    noWinStreak.length +
    losingStreak.length

  const statsLength =
    maxGoalsMen.length +
    minGoalsMen.length +
    maxDiffMen.length +
    maxGoalsWomen.length +
    minGoalsWomen.length +
    maxDiffWomen.length

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

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
        <div className="flex flex-row justify-end">
          <div>
            <GenderButtonComponent
              women={women}
              clickFunctions={() => {
                setTeamFilter('')
                dispatch({ type: 'TOGGLE' })
              }}
            />
          </div>
        </div>
        <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
          <p className="p-16 text-center">
            Första säsongen för damernas högsta serie var{' '}
            <Link to="/games/1973" className="font-bold">
              1972/73
            </Link>
            .
          </p>
        </div>
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
      <div className="flex flex-row justify-between pt-4">
        <div className="mb-4 flex w-full flex-row items-center justify-evenly">
          {seasonId - 1 === 1906 ? null : (
            <Link to={`/games/${seasonId - 1}`}>
              <LeftArrow />
            </Link>
          )}
          <h2 className="text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
            Säsong {season[0].year} {women ? 'Damer' : 'Herrar'}
          </h2>
          {seasonId + 1 === 2025 ? null : (
            <Link to={`/games/${seasonId + 1}`}>
              <RightArrow />
            </Link>
          )}
        </div>
      </div>
      {seasonId === 2024 && (
        <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
          <p>Inga resultat än.</p>
        </div>
      )}
      {seasonId < 2024 && (
        <div className="mx-1 flex flex-row justify-between xl:mx-0">
          <div className="w-full px-2 xl:px-0">
            {finalGames.length > 0 && (
              <GamesList
                gamesArray={finalGames}
                title={'Final'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['final'] = el)}
              />
            )}
            {semiGames.length > 0 && (
              <GamesList
                gamesArray={semiGames}
                title={'Semifinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['semi'] = el)}
              />
            )}
            {quarterGames.length > 0 && (
              <GamesList
                gamesArray={quarterGames}
                title={'Kvartsfinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['quarter'] = el)}
              />
            )}
            {eightGames.length > 0 && (
              <GamesList
                gamesArray={eightGames}
                title={'Åttondelsfinaler'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['eight'] = el)}
              />
            )}
            {regularGames.length > 0 && (
              <GamesList
                gamesArray={regularGames}
                title={'Grundseriematcher'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['regular'] = el)}
              />
            )}

            {qualificationGames.length > 0 && (
              <GamesList
                gamesArray={qualificationGames}
                title={'Kvalmatcher'}
                setShowModal={setShowAddGameModal}
                setGameData={setGameData}
                ref={(el) => (categoryRefs.current['qualification'] = el)}
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
          <div className="flex flex-col justify-start">
            <div className="mb-2 flex flex-col-reverse justify-start xl:mb-6 xl:flex-row xl:justify-end xl:gap-2">
              <Link to={`/season/${seasonId}`}>
                <ButtonComponent clickFunctions={() => {}}>
                  Tabeller
                </ButtonComponent>
              </Link>

              {streakDataLength > 0 && (
                <HiddenButtonComponent
                  clickFunctions={() => setShowCuriositiesModal(true)}
                >
                  Kuriosa
                </HiddenButtonComponent>
              )}
              {statsLength > 0 && (
                <HiddenButtonComponent
                  clickFunctions={() => setShowStatsModal(true)}
                >
                  Statistik
                </HiddenButtonComponent>
              )}
              <ButtonComponent clickFunctions={() => setShowHelpModal(true)}>
                Hjälp/Info
              </ButtonComponent>
              <GenderButtonComponent
                clickFunctions={() => {
                  setTeamFilter('')
                  dispatch({ type: 'TOGGLE' })
                }}
                women={women}
              />
            </div>
            {(streakDataLength > 0 || statsLength > 0) && (
              <div className="hidden xl:contents">
                <div>
                  <h4 className="mb-2 text-right text-xl font-bold">Kuriosa</h4>
                </div>
                <div className="flex w-[40rem] flex-row justify-between gap-3">
                  {statsLength > 0 && (
                    <div className="w-64">
                      <h6 className="mb-2 text-base font-bold">
                        Match(er) med flest antal mål:
                      </h6>
                      {!women && (
                        <div>
                          {maxGoalsMen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.sum_goals} mål mellan {game.home_name} och{' '}
                                {game.away_name} i en match som slutade{' '}
                                {game.resultat}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      {women && (
                        <div>
                          {maxGoalsWomen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.sum_goals} mål mellan {game.home_name} och{' '}
                                {game.away_name}, slutresultat {game.resultat}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      <h6 className="mb-2 text-base font-bold">
                        Match(er) med minst antal mål:
                      </h6>
                      {!women && (
                        <div>
                          {minGoalsMen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.sum_goals} mål mellan {game.home_name} och{' '}
                                {game.away_name}, slutresultat {game.resultat}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      {women && (
                        <div>
                          {minGoalsWomen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.sum_goals} mål mellan {game.home_name} och{' '}
                                {game.away_name} i en match som slutade{' '}
                                {game.resultat}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      <h6 className="mb-2 text-base font-bold">
                        Match(er) med störst målskillnad:
                      </h6>
                      {!women && (
                        <div>
                          {maxDiffMen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.goal_difference} mål mellan{' '}
                                {game.home_name} och {game.away_name}, matchen
                                slutade {game.resultat}.
                              </p>
                            )
                          })}
                        </div>
                      )}
                      {women && (
                        <div>
                          {maxDiffWomen.map((game) => {
                            return (
                              <p
                                key={`${game.datum}-${Math.random()}`}
                                className="mb-3 text-sm"
                              >
                                {game.datum && (
                                  <span>
                                    {dayjs(game.datum).format('D MMMM YYYY')}:
                                  </span>
                                )}{' '}
                                {game.goal_difference} mål mellan{' '}
                                {game.home_name} och {game.away_name}, matchen
                                slutade {game.resultat}.
                              </p>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {streakDataLength > 0 && (
                    <div className="w-64">
                      {unbeatenStreak.length > 0 && (
                        <h6 className="mb-2 text-base font-bold">
                          Matcher i rad utan förlust:
                        </h6>
                      )}
                      {unbeatenStreak?.map((team) => {
                        return (
                          <p
                            key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                            className="mb-3 text-sm"
                          >
                            Mellan{' '}
                            {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                            {dayjs(team.end_date).format('D MMMM YYYY')} var{' '}
                            {team.casual_name} obesegrade i {team.game_count}{' '}
                            matcher.
                          </p>
                        )
                      })}
                      {winStreak.length > 0 && (
                        <h6 className="mb-2 text-base font-bold">
                          Matcher i rad med vinst:
                        </h6>
                      )}
                      {winStreak?.map((team) => {
                        return (
                          <p
                            key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                            className="mb-3 text-sm"
                          >
                            Från {dayjs(team.start_date).format('D MMMM YYYY')}{' '}
                            till {dayjs(team.end_date).format('D MMMM YYYY')}{' '}
                            vann {team.casual_name} alla sin matcher, totalt{' '}
                            {team.game_count} stycken.
                          </p>
                        )
                      })}
                      {drawStreak.length > 0 && (
                        <h6 className="mb-2 text-base font-bold">
                          Matcher i rad med oavgjort:
                        </h6>
                      )}
                      {drawStreak?.map((team) => {
                        return (
                          <p
                            key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                            className="mb-3 text-sm"
                          >
                            {team.casual_name} spelade från{' '}
                            {dayjs(team.start_date).format('D MMMM YYYY')} till{' '}
                            {dayjs(team.end_date).format('D MMMM YYYY')}{' '}
                            {team.game_count} matcher som alla slutade oavgjort.
                          </p>
                        )
                      })}
                      {noWinStreak.length > 0 && (
                        <h6 className="mb-2 text-base font-bold">
                          Matcher i rad utan vinst:
                        </h6>
                      )}
                      {noWinStreak?.map((team) => {
                        return (
                          <p
                            key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                            className="mb-3 text-sm"
                          >
                            {team.casual_name} spelade {team.game_count} matcher
                            utan att vinna mellan{' '}
                            {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                            {dayjs(team.end_date).format('D MMMM YYYY')}
                          </p>
                        )
                      })}
                      {losingStreak.length > 0 && (
                        <h6 className="mb-2 text-base font-bold">
                          Matcher i rad med förlust:
                        </h6>
                      )}
                      {losingStreak?.map((team) => {
                        return (
                          <p
                            key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                            className="mb-3 text-sm"
                          >
                            {team.casual_name} förlorade {team.game_count} raka
                            matcher mellan{' '}
                            {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                            {dayjs(team.end_date).format('D MMMM YYYY')}
                          </p>
                        )
                      })}
                    </div>
                  )}
                </div>
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
      {showHelpModal ? (
        <>
          <GamesHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
      {showStatsModal ? (
        <>
          <StatsModal
            women={women}
            maxGoalsMen={maxGoalsMen}
            minGoalsMen={minGoalsMen}
            maxGoalsWomen={maxGoalsWomen}
            minGoalsWomen={minGoalsWomen}
            maxDiffMen={maxDiffMen}
            maxDiffWomen={maxDiffWomen}
            setShowModal={setShowStatsModal}
          />
        </>
      ) : null}
      {showCuriositiesModal ? (
        <>
          <CuriositiesModal
            winStreak={winStreak}
            noWinStreak={noWinStreak}
            losingStreak={losingStreak}
            unbeatenStreak={unbeatenStreak}
            drawStreak={drawStreak}
            setShowModal={setShowCuriositiesModal}
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
