import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getTable } from '../requests/requests'

const Table = () => {
  const tableId = useParams().tableId
  const gender = 'men'

  const { data, isLoading, error } = useQuery(['table', tableId, gender], () =>
    getTable(tableId, gender)
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
        {tableId}
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
