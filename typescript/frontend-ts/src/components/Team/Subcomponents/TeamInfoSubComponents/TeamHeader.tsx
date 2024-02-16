import { useContext } from 'react'
import { TeamPreferenceContext } from '../../../../contexts/contexts'
import {
  addToFavTeams,
  removeFromFavTeams,
} from '../../../../reducers/favteamsReducer'
import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

const TeamHeader = ({ teams, teamId }) => {
  const { favTeams, favTeamsDispatch } = useContext(TeamPreferenceContext)
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="mb-4 text-center text-base font-bold md:text-2xl">
          {teams.team.name}
        </h1>
      </div>
      <div>
        {favTeams.includes(teamId) && (
          <ButtonComponent
            clickFunctions={() => favTeamsDispatch(removeFromFavTeams(teamId))}
          >
            Ta bort favorit
          </ButtonComponent>
        )}
        {!favTeams.includes(teamId) && (
          <div>
            <ButtonComponent
              clickFunctions={() => favTeamsDispatch(addToFavTeams(teamId))}
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
