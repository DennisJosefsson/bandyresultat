import { useState, useEffect } from 'react'
import {
  sortTitles,
  sortFunctions,
} from '../../../utilitycomponents/Functions/tableSortFunctions'

const StaticTableList = ({ tableArray, teams, seriesInfo, serieName }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576
  const [sortColumn, setSortColumn] = useState('staticPointsDesc')

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const group = tableArray[0].group

  // const sortTitles = {
  //   pointsDesc: 'poäng fallande',
  //   pointsAsc: 'poäng stigande',
  //   scoredDesc: 'gjorda mål fallande',
  //   scoredAsc: 'gjorda mål stigande',
  //   concededDesc: 'insläppta mål fallande',
  //   concededAsc: 'insläppta mål stigande',
  //   goalDiffDesc: 'målskillnad fallande',
  //   goalDiffAsc: 'målskillnad stigande',
  //   gamesDesc: 'antal matcher fallande',
  //   gamesAsc: 'antal matcher stigande',
  //   winDesc: 'antal vinster fallande',
  //   winAsc: 'antal vinster stigande',
  //   drawDesc: 'antal oavgjorda fallande',
  //   drawAsc: 'antal oavgjorda stigande',
  //   lostDesc: 'antal förluster fallande',
  //   lostAsc: 'antal förluster stigande',
  // }

  // const sortFunctions = {
  //   pointsDesc: () => (teamA, teamB) => {
  //     if (teamA.points === teamB.points) {
  //       return teamB.goalDifference - teamA.goalDifference
  //     }
  //     return teamB.points - teamA.points
  //   },
  //   pointsAsc: () => (teamA, teamB) => {
  //     if (teamA.points === teamB.points) {
  //       return teamA.goalDifference - teamB.goalDifference
  //     }
  //     return teamA.points - teamB.points
  //   },
  //   staticScoredDesc: () => (teamA, teamB) => {
  //     return teamB.scoredGoals - teamA.scoredGoals
  //   },
  //   staticScoredAsc: () => (teamA, teamB) => {
  //     return teamA.scoredGoals - teamB.scoredGoals
  //   },

  //   staticConcededDesc: () => (teamA, teamB) => {
  //     return teamB.concededGoals - teamA.concededGoals
  //   },
  //   staticConcededAsc: () => (teamA, teamB) => {
  //     return teamA.concededGoals - teamB.concededGoals
  //   },
  //   staticGoalDiffDesc: () => (teamA, teamB) => {
  //     return teamB.goalDifference - teamA.goalDifference
  //   },
  //   staticGoalDiffAsc: () => (teamA, teamB) => {
  //     return teamA.goalDifference - teamB.goalDifference
  //   },
  //   staticWinDesc: () => (teamA, teamB) => {
  //     return teamB.won - teamA.won
  //   },
  //   staticWinAsc: () => (teamA, teamB) => {
  //     return teamA.won - teamB.won
  //   },
  //   staticDrawDesc: () => (teamA, teamB) => {
  //     return teamB.draw - teamA.draw
  //   },
  //   staticDrawAsc: () => (teamA, teamB) => {
  //     return teamA.draw - teamB.draw
  //   },
  //   staticLostDesc: () => (teamA, teamB) => {
  //     return teamB.lost - teamA.lost
  //   },
  //   staticLostAsc: () => (teamA, teamB) => {
  //     return teamA.lost - teamB.lost
  //   },
  //   staticGamesDesc: () => (teamA, teamB) => {
  //     return teamB.games - teamA.games
  //   },
  //   staticGamesAsc: () => (teamA, teamB) => {
  //     return teamA.games - teamB.games
  //   },
  // }

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {serieName}
        </h2>
        <p className="m-2 text-[8px] sm:text-xs xl:m-0">
          Sorteras efter {sortTitles[sortColumn]}
        </p>
        <div>
          <table className="w-full px-1 text-xs md:text-sm xl:text-base">
            <thead>
              <tr className="season">
                <th scope="col" className="pos">
                  Pos
                </th>
                <th scope="col" className="team">
                  Lag
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticgamesDesc'
                        ? 'staticgamesDesc'
                        : 'staticgamesAsc',
                    )
                  }
                >
                  M
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticWinDesc'
                        ? 'staticWinDesc'
                        : 'staticWinAsc',
                    )
                  }
                >
                  V
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticDrawDesc'
                        ? 'staticDrawDesc'
                        : 'staticDrawAsc',
                    )
                  }
                >
                  O
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticLostDesc'
                        ? 'staticLostDesc'
                        : 'staticLostAsc',
                    )
                  }
                >
                  F
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticScoredDesc'
                        ? 'staticScoredDesc'
                        : 'staticScoredAsc',
                    )
                  }
                >
                  GM
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticConcededDesc'
                        ? 'staticConcededDesc'
                        : 'staticConcededAsc',
                    )
                  }
                >
                  IM
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticGoalDiffDesc'
                        ? 'staticGoalDiffDesc'
                        : 'staticGoalDiffAsc',
                    )
                  }
                >
                  MS
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticPointsDesc'
                        ? 'staticPointsDesc'
                        : 'staticPointsAsc',
                    )
                  }
                >
                  P
                </th>
              </tr>
            </thead>
            <tbody>
              {tableArray
                .sort(sortFunctions[sortColumn]())
                .map((team, index) => {
                  return (
                    <tr
                      key={`${team.teamId}-${index}`}
                      className={`season ${
                        seriesInfo
                          .find((serie) => serie.serieGroupCode === group)
                          .serieStructure?.includes(index + 1)
                          ? 'border-b-2 border-black'
                          : null
                      } odd:bg-slate-300`}
                    >
                      <td className="pos">{index + 1}</td>
                      <td className="team">
                        {width < breakpoint
                          ? `${
                              teams.find((lag) => lag.teamId === team.teamId)
                                .shortName
                            }`
                          : `${
                              teams.find((lag) => lag.teamId === team.teamId)
                                .casualName
                            }`}
                      </td>

                      <td>{team.games}</td>
                      <td>{team.won}</td>
                      <td>{team.draw}</td>
                      <td>{team.lost}</td>
                      <td>{team.scoredGoals}</td>
                      <td>{team.concededGoals}</td>
                      <td>{team.goalDifference}</td>
                      <td>{team.points}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {seriesInfo.find((serie) => serie.serieGroupCode === group).comment !=
            null && (
            <p className="bg-white p-1 text-xs font-bold">
              {
                seriesInfo.find((serie) => serie.serieGroupCode === group)
                  .comment
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
