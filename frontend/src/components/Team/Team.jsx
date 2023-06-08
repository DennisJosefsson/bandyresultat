import { useQuery } from 'react-query'
import { getTeams } from '../../requests/teams'

const Team = () => {
  const { data, isLoading, error } = useQuery('teams', getTeams)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const teams = data

  return (
    <>
      <div>
        <ul>
          {teams.map((team) => {
            return (
              <li key={team.teamId}>
                {team.name}: {team.city}{' '}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Team
