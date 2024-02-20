import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'
import { SingleTeam } from '../../../types/teams/teams'
import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'

const TeamHeader = ({ team, teamId }: { team: SingleTeam; teamId: number }) => {
  const { favTeams, favTeamsDispatch } = useTeampreferenceContext()
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="mb-4 text-center text-base font-bold md:text-2xl">
          {team.team.name}
        </h1>
      </div>
      <div>
        {favTeams.includes(teamId) && (
          <ButtonComponent
            clickFunctions={() =>
              favTeamsDispatch({ type: 'ADD_TEAM', teamId: teamId })
            }
          >
            Ta bort favorit
          </ButtonComponent>
        )}
        {!favTeams.includes(teamId) && (
          <div>
            <ButtonComponent
              clickFunctions={() =>
                favTeamsDispatch({ type: 'REMOVE_TEAM', teamId: teamId })
              }
            >
              Favoritlag
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamHeader
