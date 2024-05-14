import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useGetTeams } from '@/src/hooks/dataHooks/teamHooks/useGetTeams'
import {
  DataError,
  Loading,
} from '../../utilitycomponents/Components/LoadingAndError/LoadingOrError'
import { Input } from '@/src/@/components/ui/input'
import { Button } from '@/src/@/components/ui/button'
import { TeamSeasonAttributes } from '../../types/teams/teams'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/src/@/components/ui/form'
import { Switch } from '@/src/@/components/ui/switch'

import { FormContent } from '../../Dashboard/Subcomponents/SeasonsList'
import { useAddTeamSeasonMutation } from '@/src/hooks/dataHooks/teamHooks/useAddTeamSeasonMutation'
import {
  useAddTeamSeasonForm,
  initialData,
  TeamSeason,
} from '@/src/hooks/dataHooks/teamHooks/useAddTeamSeasonForm'

type TeamSeasonFormProps = {
  seasonId: number
  women: boolean
  teamSeasonData: TeamSeasonAttributes[] | null
  setTeamSeasonData: Dispatch<SetStateAction<TeamSeasonAttributes[] | null>>
  setTab: Dispatch<SetStateAction<string>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
}

const TeamSeasonForm = ({
  seasonId,
  women,
  teamSeasonData,
  setTeamSeasonData,
  setTab,
  setFormContent,
}: TeamSeasonFormProps) => {
  const [teamSeasons, setTeamSeasons] = useState<TeamSeason[]>(() =>
    !teamSeasonData || (teamSeasonData && teamSeasonData.length === 0)
      ? initialData
      : teamSeasonData,
  )
  const { data, isLoading, error } = useGetTeams()
  const mutation = useAddTeamSeasonMutation(
    setTab,
    setFormContent,
    setTeamSeasonData,
  )

  const { form, handleSubmit, fields, replace, remove, append } =
    useAddTeamSeasonForm(teamSeasons)

  useEffect(() => {
    if (teamSeasonData) {
      setTeamSeasons(teamSeasonData)
      replace(teamSeasonData)
    }
  }, [teamSeasonData])

  const [teamFilter, setTeamFilter] = useState('')

  const teamSelection = data
    ? data
        .filter((team) => team.women === women)
        .map((team) => {
          return {
            value: team.teamId,
            label: team.name,
          }
        })
    : []

  const onSubmit = ({ teamSeasons }: { teamSeasons: TeamSeason[] }) => {
    mutation.mutate({ teamSeasons })
  }

  const onClickTeamButton = (teamId: number) => {
    append({
      seasonId: seasonId,
      teamId: teamId,
      women: women,
      qualification: false,
      negQualification: false,
      promoted: false,
      relegated: false,
      position: null,
      points: null,
      playoff: false,
      eight: false,
      quarter: false,
      semi: false,
      final: false,
      gold: false,
    })
  }

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex items-start justify-between p-5">
        <h3 className="text-lg font-semibold">Lägg till lag</h3>
        <div className="flex items-center justify-end gap-2 p-6">
          <Button type="submit" form="teamSeasonForm">
            Spara
          </Button>
          <form>
            <Input
              className="rounded"
              type="text"
              placeholder="Filter"
              value={teamFilter}
              name="teamFilter"
              onChange={(event) => setTeamFilter(event.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {teamSelection
            .filter((team) => team.label.includes(teamFilter))
            .map((team) => {
              return (
                <div
                  key={team.value}
                  className="flex flex-row items-center bg-background text-xs font-medium text-foreground"
                >
                  <Button
                    className="w-48"
                    onClick={() => onClickTeamButton(team.value)}
                  >
                    {team.label}
                  </Button>
                </div>
              )
            })}
        </div>
        <div className="col-span-4 flex flex-col gap-2">
          <div>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} id="teamSeasonForm">
                {fields.map((fieldItem, index) => {
                  const teamName = teamSelection.find(
                    (team) => team.value === fieldItem.teamId,
                  )?.label
                  return (
                    <div key={fieldItem.id} className="mb-2 grid grid-cols-5">
                      <div className="col-span-5 flex flex-col">
                        <div className="mb-2 flex flex-row items-center gap-4">
                          <div className="w-48 text-sm font-bold">
                            {teamName}
                          </div>
                          <Button onClick={() => remove(index)}>Ta bort</Button>
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.position`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center gap-2">
                                <FormLabel>Position</FormLabel>

                                <FormControl>
                                  <Input
                                    value={
                                      field.value === null ? '' : field.value
                                    }
                                    onChange={field.onChange}
                                    className="w-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.points`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center gap-2">
                                <FormLabel>Poäng</FormLabel>

                                <FormControl>
                                  <Input
                                    value={
                                      field.value === null ? '' : field.value
                                    }
                                    onChange={field.onChange}
                                    className="w-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.qualification`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Kval</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.negQualification`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Neg. Kval</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.promoted`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Uppflyttad</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.relegated`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Nedflyttad</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.eight`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Åttondel</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.quarter`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Kvart</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.semi`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Semi</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.final`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Final</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`teamSeasons.${index}.gold`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-center gap-1">
                                <FormLabel>Guld</FormLabel>

                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamSeasonForm
