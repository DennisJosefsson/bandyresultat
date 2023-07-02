import { groupConstant } from '../utilitycomponents/constants'

const TableList = ({ tableArray }) => {
  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') && tableArray.length === 1 ? (
              <h2 className="text-bold text-xl">Kvalgrupp</h2>
            ) : (
              <h2 className="text-bold text-xl">
                {groupConstant[group.group]}
              </h2>
            )}
            <div>
              <table className="table-fixed w-[36rem]">
                <thead>
                  <tr>
                    <th scope="col" className="w-8 px-1 py-2 text-center">
                      Pos
                    </th>
                    <th scope="col" className="w-72 px-1 py-2 text-left">
                      Lag
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      M
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      V
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      O
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      F
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      GM
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      IM
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      MS
                    </th>
                    <th scope="col" className="w-8 px-1 py-2 text-right">
                      P
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.tables.map((team, index) => {
                    return (
                      <tr
                        key={team.teamId}
                        className="odd:bg-slate-300 rounded"
                      >
                        <td className="px-1 py-2 text-center">{index + 1}</td>
                        <td className="px-1 py-2">{team.lag.name}</td>
                        <td className="px-1 py-2 text-right">
                          {team.total_games}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_wins}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_draws}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_lost}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_goals_scored}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_goals_conceded}
                        </td>
                        <td className="px-1 py-2 text-right">
                          {team.total_goal_difference}
                        </td>
                        <td className="px-1 py-2 p text-right">
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
