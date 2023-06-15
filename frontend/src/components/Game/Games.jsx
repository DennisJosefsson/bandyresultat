import { useQuery, useMutation } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '../utilitycomponents/spinner'
import GameForm from './GameForm'
import { postGame } from '../../requests/games'

const Games = () => {
  const location = useLocation()
  const { teams, seasonId } = location.state
  const [showGameFormModal, setShowGameFormModal] = useState(false)
  const [gameData, setGameData] = useState({})
  const [teamFilter, setTeamFilter] = useState('')
  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId)
  )
  const postGameMutation = useMutation({
    mutationFn: postGame,
  })

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>There was an error</div>
  }

  const games = data

  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <h2 className="leading-4 text-center text-base font-bold mb-4">
          Matcher ({games.length})
        </h2>
      </div>
      <form>
        <input
          className="rounded"
          type="text"
          placeholder="Filter"
          value={teamFilter}
          name="teamFilter"
          onChange={(event) => setTeamFilter(event.target.value)}
        />
      </form>
      Slutspel:
      <ul>
        {games
          .filter(
            (game) =>
              game.homeTeam.name.includes(teamFilter) ||
              game.awayTeam.name.includes(teamFilter)
          )
          .map((game) => {
            if (game.playoff) {
              return (
                <li key={game.gameId}>
                  {game.homeTeam.name} - {game.awayTeam.name} {game.result} [
                  <button
                    onClick={() => {
                      setGameData(game)
                      setShowGameFormModal(true)
                    }}
                  >
                    Ändra
                  </button>
                  ]{' '}
                </li>
              )
            }
          })}
      </ul>
      Grundserie:
      <ul>
        {games
          .filter(
            (game) =>
              game.homeTeam.name.includes(teamFilter) ||
              game.awayTeam.name.includes(teamFilter)
          )
          .map((game) => {
            if (!game.playoff) {
              return (
                <li key={game.gameId}>
                  {game.homeTeam.name} - {game.awayTeam.name} {game.result} [
                  <button
                    onClick={() => {
                      setGameData(game)
                      setShowGameFormModal(true)
                    }}
                  >
                    Ändra
                  </button>
                  ]{' '}
                </li>
              )
            }
          })}
      </ul>
      {showGameFormModal ? (
        <>
          <GameForm
            teams={teams}
            gameData={gameData}
            seasonId={seasonId}
            mutation={postGameMutation}
            setShowModal={setShowGameFormModal}
          />
        </>
      ) : null}
    </div>
  )
}

export default Games
