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
              <h2 className="font-bold text-[0.75rem] lg:text-[1rem] xl:text-xl">
                Kvalgrupp
              </h2>
            ) : (
              <h2 className="font-bold text-sm lg:text-base xl:text-xl">
                {groupConstant[group.group]}
              </h2>
            )}
            <div>
              <table className="w-full text-xs md:text-sm xl:text-base px-1">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="xl:w-8 px-0.5 py-1 xl:px-1 xl:py-2 text-center"
                    >
                      Pos
                    </th>
                    <th
                      scope="col"
                      className="px-0.5 py-1 xl:w-56 xl:px-1 xl:py-2 text-left"
                    >
                      Lag
                    </th>
                    <th
                      scope="col"
                      className="xl:w-8 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      M
                    </th>
                    <th
                      scope="col"
                      className="xl:w-8 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      V
                    </th>
                    <th
                      scope="col"
                      className="xl:w-8 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      O
                    </th>
                    <th
                      scope="col"
                      className="xl:w-8 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      F
                    </th>
                    <th
                      scope="col"
                      className="xl:w-12 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      GM
                    </th>
                    <th
                      scope="col"
                      className="xl:w-12 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      IM
                    </th>
                    <th
                      scope="col"
                      className="xl:w-12 px-0.5 py-1 xl:px-1 xl:py-2 text-right"
                    >
                      MS
                    </th>
                    <th
                      scope="col"
                      className="xl:w-8 py-1 px-1 xl:py-2 text-right"
                    >
                      P
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.tables.map((team, index) => {
                    return (
                      <tr
                        key={`${team.teamId}-${index}`}
                        className="odd:bg-slate-300 rounded"
                      >
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="px-1 py-2">
                          {width < breakpoint
                            ? `${team.lag.shortName}`
                            : `${team.lag.name}`}
                        </td>

                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_games}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_wins}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_draws}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_lost}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_goals_scored}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_goals_conceded}
                        </td>
                        <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                          {team.total_goal_difference}
                        </td>
                        <td className="py-1 px-1 xl:py-2 p text-right tabular-nums">
                          {team.total_points}
                        </td>
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
