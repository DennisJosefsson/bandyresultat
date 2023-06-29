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
    return (
      <div className="max-w-6xl mx-auto">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <div className="max-w-6xl mx-auto"> There was an error</div>
  }

  const teams = data
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <h2>Herrar</h2>
        {teams.map((team) => {
          if (!team.women) {
            return <div key={team.teamId}>{team.name}</div>
          }
        })}
      </div>
      <div>
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
