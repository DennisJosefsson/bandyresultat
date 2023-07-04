import { useQuery } from 'react-query'
import { maratonTabell } from '../../requests/tables'

const Table = () => {
  const { data, isLoading, error } = useQuery('maratonTabell', maratonTabell)

  if (isLoading) {
    return <div className="max-w-6xl mx-auto">Loading...</div>
  }

  if (error) {
    return <div className="max-w-6xl mx-auto">There was an error</div>
  }

  const tabell = data

  return (
    <div className="max-w-6xl mx-auto font-inter text-[#011d29]">
      <table className="table-auto w-[52rem]">
        <thead>
          <tr key={'header'}>
            <th scope="col" className="px-1 py-2 text-center">
              Pos
            </th>
            <th scope="col" className="px-1 py-2 text-left">
              Lag
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              M
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              V
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              O
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              F
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              GM
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              IM
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              MS
            </th>
            <th scope="col" className="px-1 py-2 text-center">
              Poä
            </th>
          </tr>
        </thead>
        <tbody>
          {tabell.map((team, index) => {
            return (
              <tr key={team.teamId} className="odd:bg-slate-300 rounded">
                <td className="px-1 py-2 text-center">{index + 1}</td>
                <td className="px-1 py-2 ">{team.lag.name}</td>
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
  )
}

export default Table
