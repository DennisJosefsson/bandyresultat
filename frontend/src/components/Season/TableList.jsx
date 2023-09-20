import { useState, useEffect, useContext } from 'react'
import { TeamPreferenceContext } from '../../contexts/contexts'

const TableList = ({ tableArray, seriesInfo, bonusPoints }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const { favTeams } = useContext(TeamPreferenceContext)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const calculateBonusPoints = (group, teamId) => {
    const bonus = bonusPoints.find((points) => points.group === group)
    if (bonus.bonusPoints === null) {
      return 0
    }
    const points = bonus.bonusPoints[Number(teamId)]

    if (points === null) {
      return 0
    } else {
      return Number(points)
    }
  }

  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') && tableArray.length === 1 ? (
              <h2 className="text-[0.75rem] font-bold lg:text-[1rem] xl:text-xl">
                Kvalgrupp
              </h2>
            ) : (
              <h2 className="text-sm font-bold lg:text-base xl:text-xl">
                {
                  seriesInfo.find(
                    (serie) => serie.serieGroupCode === group.group,
                  ).serieName
                }
              </h2>
            )}
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
                    <th scope="col">M</th>
                    <th scope="col">V</th>
                    <th scope="col">O</th>
                    <th scope="col">F</th>
                    <th scope="col" className="twelve">
                      GM
                    </th>
                    <th scope="col" className="twelve">
                      IM
                    </th>
                    <th scope="col" className="twelve">
                      MS
                    </th>
                    <th scope="col">P</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tables
                    .sort((teamA, teamB) => {
                      if (
                        Number(teamA.total_points) +
                          Number(
                            calculateBonusPoints(group.group, teamA.team),
                          ) ===
                        Number(teamB.total_points) +
                          Number(calculateBonusPoints(group.group, teamB.team))
                      ) {
                        return (
                          teamB.total_goal_difference -
                          teamA.total_goal_difference
                        )
                      }
                      return (
                        Number(teamB.total_points) +
                        Number(calculateBonusPoints(group.group, teamB.team)) -
                        (Number(teamA.total_points) +
                          Number(calculateBonusPoints(group.group, teamA.team)))
                      )
                    })
                    .map((team, index) => {
                      return (
                        <tr
                          key={`${team.team}-${index}`}
                          className={`season ${
                            seriesInfo
                              .find(
                                (serie) => serie.serieGroupCode === group.group,
                              )
                              .serieStructure?.includes(index + 1)
                              ? 'border-b-2 border-black'
                              : null
                          } ${
                            favTeams.includes(team.team) ? 'font-bold' : null
                          } odd:bg-slate-300`}
                        >
                          <td className="pos">{index + 1}</td>
                          <td className="team">
                            {width < breakpoint
                              ? `${team.lag.shortName}`
                              : `${team.lag.name}`}
                          </td>

                          <td>
                            {parseInt(team.total_wins) +
                              parseInt(team.total_draws) +
                              parseInt(team.total_lost)}
                          </td>
                          <td>{team.total_wins}</td>
                          <td>{team.total_draws}</td>
                          <td>{team.total_lost}</td>
                          <td>{team.total_goals_scored}</td>
                          <td>{team.total_goals_conceded}</td>
                          <td>{team.total_goal_difference}</td>
                          <td>
                            {Number(team.total_points) +
                              Number(
                                calculateBonusPoints(group.group, team.team),
                              )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {seriesInfo.find((serie) => serie.serieGroupCode === group.group)
                .comment && (
                <p className="bg-white p-1 text-xs font-bold">
                  {
                    seriesInfo.find(
                      (serie) => serie.serieGroupCode === group.group,
                    ).comment
                  }
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
