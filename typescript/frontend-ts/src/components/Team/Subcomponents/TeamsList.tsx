import { TeamAttributes } from '../../types/teams/teams'
import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'
import { FormField, FormItem, FormControl } from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'

import { useFormContext } from 'react-hook-form'
import { SetURLSearchParams } from 'react-router-dom'

interface TeamsListProps {
  teams: TeamAttributes[]
  setSearchParams: SetURLSearchParams
}

const TeamsList = ({ teams, setSearchParams }: TeamsListProps) => {
  const { favTeams } = useTeampreferenceContext()
  const methods = useFormContext()
  return (
    <div>
      <FormField
        control={methods.control}
        name="teamArray"
        render={() => (
          <FormItem>
            <div className="grid w-2/3 grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
              {teams.map((team) => {
                return (
                  <div key={team.teamId} className="">
                    <FormField
                      key={team.teamId}
                      control={methods.control}
                      name="teamArray"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={team.teamId}
                            className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-white p-2 text-sm md:text-base"
                          >
                            <span
                              className={
                                favTeams.includes(team.teamId)
                                  ? 'w-32 cursor-pointer font-bold md:text-base'
                                  : 'w-32 cursor-pointer md:text-base'
                              }
                              onClick={() => {
                                setSearchParams({
                                  teamId: team.teamId.toString(),
                                })
                              }}
                            >
                              {team.casualName}
                            </span>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(team.teamId)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        team.teamId,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: number) =>
                                            value !== team.teamId,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export default TeamsList
