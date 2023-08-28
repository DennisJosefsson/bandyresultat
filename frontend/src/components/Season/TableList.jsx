import { groupConstant } from '../utilitycomponents/constants'
import { useState, useEffect } from 'react'

const TableList = ({ tableArray }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

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
                {groupConstant[group.group]}
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
                  {group.tables.map((team, index) => {
                    return (
                      <tr
                        key={`${team.teamId}-${index}`}
                        className="season rounded odd:bg-slate-300"
                      >
                        <td className="pos">{index + 1}</td>
                        <td className="team">
                          {width < breakpoint
                            ? `${team.lag.shortName}`
                            : `${team.lag.name}`}
                        </td>

                        <td>{team.total_games}</td>
                        <td>{team.total_wins}</td>
                        <td>{team.total_draws}</td>
                        <td>{team.total_lost}</td>
                        <td>{team.total_goals_scored}</td>
                        <td>{team.total_goals_conceded}</td>
                        <td>{team.total_goal_difference}</td>
                        <td>{team.total_points}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
