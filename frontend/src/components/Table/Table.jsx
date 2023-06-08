import { useQuery } from 'react-query'
import { getSingleSeasonTable } from '../../requests/tables'

const Table = () => {
  const seasonId = 108
  const { data, isLoading, error } = useQuery(['table', seasonId], () =>
    getSingleSeasonTable(seasonId)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>There was an error</div>
  }

  const table = data

  return (
    <>
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
    </>
  )
}

export default Table
