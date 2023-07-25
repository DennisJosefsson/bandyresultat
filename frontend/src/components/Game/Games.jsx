import { useQuery, useMutation } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { getSingleSeason } from '../../requests/seasons'
import { postGame } from '../../requests/games'
import { useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GenderContext } from '../../contexts/contexts'
import Spinner from '../utilitycomponents/spinner'
import GamesList from './GamesList'
import GameForm from './GameForm'
import { gameSortFunction } from '../utilitycomponents/sortFunction'
import { LeftArrow, RightArrow } from '../utilitycomponents/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Games = () => {
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)

  const [teamFilter, setTeamFilter] = useState('')
  const [showAddGameModal, setShowAddGameModal] = useState(false)
  const [gameData, setGameData] = useState(null)

  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId)
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
    return <Spinner />
  }

  if (error || seasonError) {
    return <div>There was an error</div>
  }

  const games = data.games
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam.name.toLowerCase().includes(teamFilter.toLowerCase())
    )

  const unbeatenStreak = data.unbeatenStreak.filter(
    (table) => table.women === women
  )
  const winStreak = data.winStreak.filter((table) => table.women === women)
  const drawStreak = data.drawStreak.filter((table) => table.women === women)
  const noWinStreak = data.noWinStreak.filter((table) => table.women === women)
  const losingStreak = data.losingStreak.filter(
    (table) => table.women === women
  )

  const maxGoalsMen = data.maxGoalsMen
  const minGoalsMen = data.minGoalsMen
  const maxDiffMen = data.maxDiffMen
  const maxGoalsWomen = data.maxGoalsWomen
  const minGoalsWomen = data.minGoalsWomen
  const maxDiffWomen = data.maxDiffWomen

  const unsortedFinalGames = games.filter((game) => game.category === 'final')
  const unsortedSemiGames = games.filter((game) => game.category === 'semi')
  const unsortedQuarterGames = games.filter(
    (game) => game.category === 'quarter'
  )
  const unsortedEightGames = games.filter((game) => game.category === 'eight')
  const unsortedRegularGames = games.filter(
    (game) => game.category === 'regular'
  )
  const unsortedQualificationGames = games.filter(
    (game) => game.category === 'qualification'
  )

  const finalGames = gameSortFunction(unsortedFinalGames)
  const semiGames = gameSortFunction(unsortedSemiGames)
  const quarterGames = gameSortFunction(unsortedQuarterGames)
  const eightGames = gameSortFunction(unsortedEightGames)
  const regularGames = gameSortFunction(unsortedRegularGames)
  const qualificationGames = gameSortFunction(unsortedQualificationGames)

  const genderSeason = season.filter((indSeason) => indSeason.women === women)

  return (
    <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29] flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-evenly w-[72rem]">
          {seasonId - 1 === 1906 ? null : (
            <Link to={`/games/${seasonId - 1}`}>
              <LeftArrow />
            </Link>
          )}
          <h2 className="leading-4 text-center text-2xl font-bold mb-4">
            Säsong {season[0].year} {women ? 'Damer' : 'Herrar'}
          </h2>
          <Link to={`/games/${seasonId + 1}`}>
            <RightArrow />
          </Link>
        </div>
        <div>
          <div
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
          <div className="text-right mt-2 mb-4">
            <Link to={`/season/${seasonId}`}>[Tabeller]</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div>
          {finalGames.length > 0 && (
            <GamesList
              gamesArray={finalGames}
              title={'Final'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}
          {semiGames.length > 0 && (
            <GamesList
              gamesArray={semiGames}
              title={'Semifinaler'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}
          {quarterGames.length > 0 && (
            <GamesList
              gamesArray={quarterGames}
              title={'Kvartsfinaler'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}
          {eightGames.length > 0 && (
            <GamesList
              gamesArray={eightGames}
              title={'Åttondelsfinaler'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}
          {regularGames.length > 0 && (
            <GamesList
              gamesArray={regularGames}
              title={'Grundseriematcher'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}

          {qualificationGames.length > 0 && (
            <GamesList
              gamesArray={qualificationGames}
              title={'Kvalmatcher'}
              setShowModal={setShowAddGameModal}
              setGameData={setGameData}
            />
          )}
          <div>
            <p>
              <button onClick={() => setShowAddGameModal(true)}>
                Lägg till Match
              </button>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="mb-6 place-content-end">
            <form className="text-right">
              <input
                className="border-[#011d29] focus:border-[#011d29] w-64"
                type="text"
                placeholder="Filter"
                value={teamFilter}
                name="teamFilter"
                onChange={(event) => setTeamFilter(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </form>
          </div>
          <div className="text-right text-bold">
            <h4 className="text-xl mb-2">Kuriosa</h4>
          </div>
          <div className="flex flex-row justify-between gap-3 w-[40rem]">
            <div className="w-64">
              <h6 className="text-bold text-base mb-2">
                Match(er) med flest antal mål:
              </h6>
              {!women && (
                <div>
                  {maxGoalsMen.map((game) => {
                    return (
                      <p
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.sum_goals} mål mellan {game.home_name} och{' '}
                        {game.away_name} i en match som slutade {game.resultat}
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
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.sum_goals} mål mellan {game.home_name} och{' '}
                        {game.away_name}, slutresultat {game.resultat}
                      </p>
                    )
                  })}
                </div>
              )}
              <h6 className="text-bold text-base mb-2">
                Match(er) med minst antal mål:
              </h6>
              {!women && (
                <div>
                  {minGoalsMen.map((game) => {
                    return (
                      <p
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.sum_goals} mål mellan {game.home_name} och{' '}
                        {game.away_name}, slutesultat {game.resultat}
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
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.sum_goals} mål mellan {game.home_name} och{' '}
                        {game.away_name} i en match som slutade {game.resultat}
                      </p>
                    )
                  })}
                </div>
              )}
              <h6 className="text-bold text-base mb-2">
                Match(er) med störst målskillnad:
              </h6>
              {!women && (
                <div>
                  {maxDiffMen.map((game) => {
                    return (
                      <p
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.goal_difference} mål mellan {game.home_name} och{' '}
                        {game.away_name}, matchen slutade {game.resultat}.
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
                        key={`${game.datum}-${game.sum_goals}`}
                        className="text-sm mb-3"
                      >
                        {dayjs(game.datum).format('D MMMM YYYY')}:{' '}
                        {game.goal_difference} mål mellan {game.home_name} och{' '}
                        {game.away_name}, matchen slutade {game.resultat}.
                      </p>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="w-64">
              {unbeatenStreak.length > 0 && (
                <h6 className="text-bold text-base mb-2">
                  Matcher i rad utan förlust:
                </h6>
              )}
              {unbeatenStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    Mellan {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')} var{' '}
                    {team.casual_name} obesegrade i {team.game_count} matcher.
                  </p>
                )
              })}
              {winStreak.length > 0 && (
                <h6 className="text-bold text-base mb-2">
                  Matcher i rad med vinst:
                </h6>
              )}
              {winStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    Från {dayjs(team.start_date).format('D MMMM YYYY')} till{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')} vann{' '}
                    {team.casual_name} alla sin matcher, totalt{' '}
                    {team.game_count} stycken.
                  </p>
                )
              })}
              {drawStreak.length > 0 && (
                <h6 className="text-bold text-base mb-2">
                  Matcher i rad med oavgjort:
                </h6>
              )}
              {drawStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} spelade från{' '}
                    {dayjs(team.start_date).format('D MMMM YYYY')} till{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}{' '}
                    {team.game_count} matcher som alla slutade oavgjort.
                  </p>
                )
              })}
              {noWinStreak.length > 0 && (
                <h6 className="text-bold text-base mb-2">
                  Matcher i rad utan vinst:
                </h6>
              )}
              {noWinStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} spelade {team.game_count} matcher utan
                    att vinna mellan{' '}
                    {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}
                  </p>
                )
              })}
              {losingStreak.length > 0 && (
                <h6 className="text-bold text-base mb-2">
                  Matcher i rad med förlust:
                </h6>
              )}
              {losingStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} förlorade {team.game_count} raka matcher
                    mellan {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
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
    </div>
  )
}

export default Games
