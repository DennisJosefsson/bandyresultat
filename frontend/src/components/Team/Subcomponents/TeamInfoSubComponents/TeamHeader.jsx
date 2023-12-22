import { useContext, useState } from 'react'
import { TeamPreferenceContext } from '../../../../contexts/contexts'
import {
  addToFavTeams,
  removeFromFavTeams,
} from '../../../../reducers/favteamsReducer'
import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'
import { handleCopyClick } from '../../../utilitycomponents/Functions/copyLinkFunctions'

const TeamHeader = ({ teams, teamId }) => {
  const { favTeams, favTeamsDispatch } = useContext(TeamPreferenceContext)
  const [isCopied, setIsCopied] = useState(false)
  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const searchLink = `${baseUrl}/teams?teamId=${teamId}`
  return (
    <div className="mb-2 flex flex-row">
      <div className="flex-1">
        <h1 className="mb-4 text-center text-base font-bold md:text-2xl">
          {teams.team.name}
        </h1>
      </div>
      <div className="m b-2 mr-2 flex flex-col gap-2 xl:mr-0">
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
        <div>
          <ButtonComponent
            clickFunctions={(event) =>
              handleCopyClick(event, searchLink, setIsCopied)
            }
          >
            {isCopied ? 'Kopierad!' : 'Länk'}
          </ButtonComponent>
        </div>
      </div>
    </div>
  )
}

export default TeamHeader
