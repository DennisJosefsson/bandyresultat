import { useQuery } from 'react-query'
import { getSingleSeasonTable } from '../../requests/tables'

const Table = () => {
  const seasonId = 108
  const { data, isLoading, error } = useQuery(['table', seasonId], () =>
    getSingleSeasonTable(seasonId)
  )

  if (isLoading) {
    return <div className="max-w-6xl mx-auto">Loading...</div>
  }

  if (error) {
    return <div className="max-w-6xl mx-auto">There was an error</div>
  }

  const table = data

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        {seasonId}
        <ul>
          {table.map((team) => {
            return (
              <li key={team.teamId}>
                {team.position}: {team.team.name} {team.points}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Table
