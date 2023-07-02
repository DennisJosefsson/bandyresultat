import { useQuery } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '../utilitycomponents/spinner'
import GamesList from './GamesList'
import { gameSortFunction } from '../utilitycomponents/sortFunction'

const Games = () => {
  const location = useLocation()
  const { seasonId } = location.state
  const [teamFilter, setTeamFilter] = useState('')
  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId)
  )

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>There was an error</div>
  }

  const games = data.filter(
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

  return (
    <div className="max-w-6xl mx-auto font-inter text-[#011d29] flex flex-row-reverse justify-between">
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
      <div>
        {finalGames.length > 0 && (
          <GamesList gamesArray={finalGames} title={'Final'} />
        )}
        {semiGames.length > 0 && (
          <GamesList gamesArray={semiGames} title={'Semifinaler'} />
        )}
        {quarterGames.length > 0 && (
          <GamesList gamesArray={quarterGames} title={'Kvartsfinaler'} />
        )}
        {eightGames.length > 0 && (
          <GamesList gamesArray={eightGames} title={'Åttondelsfinaler'} />
        )}
        {regularGames.length > 0 && (
          <GamesList gamesArray={regularGames} title={'Grundseriematcher'} />
        )}

        {qualificationGames.length > 0 && (
          <GamesList gamesArray={qualificationGames} title={'Kvalmatcher'} />
        )}
      </div>
    </div>
  )
}

export default Games
