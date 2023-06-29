import { useQuery } from 'react-query'
import { getSeasonGames } from '../../requests/games'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '../utilitycomponents/spinner'
import { groupConstant } from '../utilitycomponents/constants'

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

  const finalGames = games.filter((game) => game.category === 'final')
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

  const dates = unsortedRegularGames.reduce((dates, game) => {
    if (!dates[game.date]) {
      dates[game.date] = []
    }
    dates[game.date].push(game)
    return dates
  }, {})

  const regularGames = Object.keys(dates).map((date) => {
    return {
      date,
      games: dates[date],
    }
  })

  const qualificationDates = unsortedQualificationGames.reduce(
    (dates, game) => {
      if (!dates[game.date]) {
        dates[game.date] = []
      }
      dates[game.date].push(game)
      return dates
    },
    {}
  )

  const qualificationGames = Object.keys(qualificationDates).map((date) => {
    return {
      date,
      games: qualificationDates[date],
    }
  })

  const semiGroups = unsortedSemiGames.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {})

  const semiGames = Object.keys(semiGroups).map((group) => {
    return {
      group,
      games: semiGroups[group],
    }
  })
  const quarterGroups = unsortedQuarterGames.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {})

  const quarterGames = Object.keys(quarterGroups).map((group) => {
    return {
      group,
      games: quarterGroups[group],
    }
  })
  const eightGroups = unsortedEightGames.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {})

  const eightGames = Object.keys(eightGroups).map((group) => {
    return {
      group,
      games: eightGroups[group],
    }
  })

  return (
    <div className="max-w-6xl mx-auto font-inter text-[#011d29] flex flex-row-reverse justify-between">
      <div>
        <form>
          <input
            className="rounded border-[#011d29] focus:border-[#011d29]"
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
          <div>
            <h1 className="font-inter text-2xl">Final</h1>
            <div>
              {finalGames.map((game) => {
                return (
                  <div
                    key={game.gameId}
                    className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                  >
                    <div className="w-52">{game.homeTeam.name}</div>
                    <div className="w-4"> - </div>
                    <div className="w-52">{game.awayTeam.name}</div>
                    <div className="w-4 text-right">{game.homeGoal}</div>
                    <div className="w-1">-</div>
                    <div className="w-4 text-justify">{game.awayGoal}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {semiGames.length > 0 && (
          <div>
            <h1 className="font-inter text-2xl">Semifinal</h1>
            <div>
              {semiGames.map((group) => {
                return (
                  <div key={group.group}>
                    <h3>{groupConstant[group.group]}</h3>
                    <div>
                      {group.games.map((game) => {
                        return (
                          <div
                            key={game.gameId}
                            className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                          >
                            <div className="w-52">{game.homeTeam.name}</div>
                            <div className="w-4"> - </div>
                            <div className="w-52">{game.awayTeam.name}</div>
                            <div className="w-4 text-right">
                              {game.homeGoal}
                            </div>
                            <div className="w-1">-</div>
                            <div className="w-4 text-justify">
                              {game.awayGoal}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {quarterGames.length > 0 && (
          <div>
            <h1 className="font-inter text-2xl">Kvartsfinal</h1>
            <div>
              {quarterGames.map((group) => {
                return (
                  <div key={group.group}>
                    <h3>{groupConstant[group.group]}</h3>
                    <div>
                      {group.games.map((game) => {
                        return (
                          <div
                            key={game.gameId}
                            className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                          >
                            <div className="w-52">{game.homeTeam.name}</div>
                            <div className="w-4"> - </div>
                            <div className="w-52">{game.awayTeam.name}</div>
                            <div className="w-4 text-right">
                              {game.homeGoal}
                            </div>
                            <div className="w-1">-</div>
                            <div className="w-4 text-justify">
                              {game.awayGoal}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {eightGames.length > 0 && (
          <div>
            <h1 className="font-inter text-2xl">Åttondelsfinal</h1>
            <div>
              {eightGames.map((group) => {
                return (
                  <div key={group.group}>
                    <h3>{groupConstant[group.group]}</h3>
                    <div>
                      {group.games.map((game) => {
                        return (
                          <div
                            key={game.gameId}
                            className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                          >
                            <div className="w-52">{game.homeTeam.name}</div>
                            <div className="w-4"> - </div>
                            <div className="w-52">{game.awayTeam.name}</div>
                            <div className="w-4 text-right">
                              {game.homeGoal}
                            </div>
                            <div className="w-1">-</div>
                            <div className="w-4 text-justify">
                              {game.awayGoal}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {regularGames.length > 0 && (
          <div>
            <h1 className="font-inter text-2xl">Grundserie</h1>
            <div>
              {regularGames.map((date) => {
                return (
                  <div key={date.date}>
                    <h3>{date.date}</h3>
                    <div>
                      {date.games.map((game) => {
                        return (
                          <div
                            key={game.gameId}
                            className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                          >
                            <div className="w-52">{game.homeTeam.name}</div>
                            <div className="w-4"> - </div>
                            <div className="w-52">{game.awayTeam.name}</div>
                            <div className="w-4 text-right">
                              {game.homeGoal}
                            </div>
                            <div className="w-1">-</div>
                            <div className="w-4 text-justify">
                              {game.awayGoal}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {qualificationGames.length > 0 && (
          <div>
            <h1 className="font-inter text-2xl">Kvalmatcher</h1>
            <div>
              {qualificationGames.map((date) => {
                return (
                  <div key={date.date}>
                    <h3>{date.date}</h3>
                    <div>
                      {date.games.map((game) => {
                        return (
                          <div
                            key={game.gameId}
                            className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] rounded flex flex-row justify-between"
                          >
                            <div className="w-52">{game.homeTeam.name}</div>
                            <div className="w-4"> - </div>
                            <div className="w-52">{game.awayTeam.name}</div>
                            <div className="w-4 text-right">
                              {game.homeGoal}
                            </div>
                            <div className="w-1">-</div>
                            <div className="w-4 text-justify">
                              {game.awayGoal}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Games
