import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { compareTeams } from '../../requests/tables'
import { compareSortFunction } from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import Spinner from '../utilitycomponents/spinner'

const Compare = () => {
  const location = useLocation()
  const teamArray = location.state

  const { data, isLoading, error } = useQuery(['compareTeams', teamArray], () =>
    compareTeams(teamArray)
  )

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <div className="max-w-6xl mx-auto"> There was an error</div>
  }

  const compareData = compareSortFunction(data.data)

  return (
    <div className="max-w-7xl min-h-screen mx-auto">
      <div className="mb-6">
        {compareData.map((category, index) => {
          return (
            <div key={category.category} className="mb-6">
              <h2>{groupConstant[category.category]}</h2>
              <div>
                <table className="table-fixed w-[36rem]">
                  <thead>
                    <tr key={`head-${category.category}-${index}`}>
                      <th scope="col" className="w-56 px-1 py-2 text-left">
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
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        GM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        IM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        MS
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        P
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.teams.map((team, index) => {
                      return (
                        <tr
                          key={`${team.teamId}-${index}`}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-2">{team.lag.name}</td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_games}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_wins}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_draws}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_lost}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_scored}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_conceded}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goal_difference}
                          </td>
                          <td className="px-1 py-2 p text-right tabular-nums">
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
    </div>
  )
}

export default Compare
