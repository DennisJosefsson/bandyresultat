import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import { TeamAttributes } from '../../types/teams/teams'
import { CompareFormState } from '../../types/teams/teams'
import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'

type TeamsListProps = {
  teams: TeamAttributes[]
  formState: CompareFormState
  handleTeamArrayChange: (
    event: ChangeEvent<HTMLInputElement>,
    teamId: number,
  ) => void
  setTab: Dispatch<SetStateAction<string>>
  setTeamId: Dispatch<SetStateAction<number | null>>
}

const TeamsList = ({
  formState,
  teams,
  handleTeamArrayChange,
  setTeamId,
  setTab,
}: TeamsListProps) => {
  const { favTeams } = useTeampreferenceContext()
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
                  setTeamId(team.teamId)
                  setTab('singleTeam')
                }}
              >
                {team.casualName}
              </div>

              <div className="w-6 pl-4 pr-4">
                <input
                  type="checkbox"
                  id={team.teamId.toString()}
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
