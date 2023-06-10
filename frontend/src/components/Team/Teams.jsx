import { useQuery, useMutation } from 'react-query'
import { useState } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import Spinner from '../utilitycomponents/spinner'
import TeamForm from './TeamForm'

const Teams = () => {
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)

  const { data, isLoading, error } = useQuery(['teams'], getTeams)

  const teamFormMutation = useMutation({
    mutationFn: postTeam,
  })

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>There was an error</div>
  }

  const teams = data
  return (
    <div className="flex flex-row">
      <div className="w-48 p-5">
        <h2>Herrar</h2>
        {teams.map((team) => {
          if (!team.women) {
            return <div key={team.teamId}>{team.name}</div>
          }
        })}
      </div>
      <div className="w-48 p-5">
        <h2>Damer</h2>
        {teams.map((team) => {
          if (team.women) {
            return <div key={team.teamId}>{team.name}</div>
          }
        })}
      </div>
      <p>
        <button onClick={() => setShowTeamFormModal(true)}>
          Lägg till lag
        </button>
      </p>
      {showTeamFormModal ? (
        <>
          <TeamForm
            mutation={teamFormMutation}
            setShowModal={setShowTeamFormModal}
          />
        </>
      ) : null}
    </div>
  )
}

export default Teams
