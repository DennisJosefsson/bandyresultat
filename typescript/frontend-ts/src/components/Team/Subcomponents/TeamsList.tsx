import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'
import { FormField, FormItem, FormControl } from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'

import { SetURLSearchParams } from 'react-router-dom'
import { useGetTeamsList } from '@/src/hooks/dataHooks/teamHooks/useGetTeamsList'

import { useFormContext } from 'react-hook-form'

interface TeamsListProps {
  teamFilter: string
  setSearchParams: SetURLSearchParams
}

const TeamsList = ({ teamFilter, setSearchParams }: TeamsListProps) => {
  const { favTeams } = useTeampreferenceContext()
  const methods = useFormContext()

  const { teams } = useGetTeamsList(teamFilter)

  return (
    <div>
      <FormField
        control={methods.control}
        name="teamArray"
        render={() => (
          <FormItem>
            <div className="grid w-2/3 grid-cols-1 gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
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
                            id={team.teamId.toString()}
                            key={team.teamId}
                            className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-muted p-2 text-sm has-[:checked]:bg-primary has-[:checked]:text-white dark:bg-muted/50 md:text-base"
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
                                name={field.name}
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
                                className="bg-muted data-[state=checked]:border-white data-[state=checked]:bg-primary data-[state=checked]:text-white dark:bg-muted/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-primary dark:data-[state=checked]:text-white"
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
