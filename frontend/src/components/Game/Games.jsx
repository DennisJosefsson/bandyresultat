import { useQuery, useMutation } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { getSingleSeason } from '../../requests/seasons'
import { postGame } from '../../requests/games'
import { useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GenderContext } from '../../contexts/genderContext'
import Spinner from '../utilitycomponents/spinner'
import GamesList from './GamesList'
import GameForm from './GameForm'
import { gameSortFunction } from '../utilitycomponents/sortFunction'
import { LeftArrow, RightArrow } from '../utilitycomponents/icons'

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

  if (isLoading || isSeasonLoading) {
    return <Spinner />
  }

  if (error || seasonError) {
    return <div>There was an error</div>
  }

  const games = data
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam.name.toLowerCase().includes(teamFilter.toLowerCase())
    )

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
    <div className="max-w-6xl mx-auto font-inter text-[#011d29] flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-evenly w-[52rem]">
          {seasonId - 1 === 1906 ? null : (
            <Link to={`/games/${seasonId - 1}`}>
              <LeftArrow />
            </Link>
          )}
          <h2 className="leading-4 text-center text-2xl font-bold mb-4">
            Säsong {games[0].season.year} {women ? 'Damer' : 'Herrar'}
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
        <div>
          <form>
            <input
              className="border-[#011d29] focus:border-[#011d29]"
              type="text"
              placeholder="Filter"
              value={teamFilter}
              name="teamFilter"
              onChange={(event) => setTeamFilter(event.target.value)}
            />
          </form>
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
