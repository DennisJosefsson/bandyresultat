import { useContext } from 'react'
import { TeamPreferenceContext } from '../../../contexts/contexts'

const TeamsList = ({
  formState,
  teams,
  handleTeamArrayChange,
  setSearchParams,
}) => {
  const { favTeams } = useContext(TeamPreferenceContext)
  return (
    <div>
      <div className="grid w-2/3 grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
        {teams.map((team) => {
          return (
            <div
              key={team.teamId}
              className="flex flex-row items-center justify-between bg-white px-2 py-1 text-base text-[#011d29]"
            >
              <div
                className={
                  favTeams.includes(team.teamId)
                    ? 'w-32 cursor-pointer font-bold'
                    : 'w-32 cursor-pointer'
                }
                onClick={() => {
                  setSearchParams({ teamId: team.teamId })
                }}
              >
                {team.casualName}
              </div>

              <div className="w-6 pl-4 pr-4">
                <input
                  type="checkbox"
                  id={team.teamId}
                  checked={formState.teamArray.includes(team.teamId)}
                  onChange={(event) =>
                    handleTeamArrayChange(event, team.teamId)
                  }
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamsList
