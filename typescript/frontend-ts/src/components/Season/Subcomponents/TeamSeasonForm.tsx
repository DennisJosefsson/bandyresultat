import { Reducer, SyntheticEvent, useReducer, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Plus, Minus } from 'lucide-react'
import { postTeamSeason } from '../../../requests/seasons'

import teamseasonReducer, {
  TeamSeasonActionType,
  TeamSeasonStateType,
} from '../../../reducers/teamseasonReducer'
import { useGetTeams } from '@/src/hooks/dataHooks/teamHooks/useGetTeams'
import {
  DataError,
  Loading,
} from '../../utilitycomponents/Components/LoadingOrError'
import { Input } from '@/src/@/components/ui/input'
import { Button } from '@/src/@/components/ui/button'

type TeamSeasonFormProps = {
  seasonId: number
  women: boolean
}

const TeamSeasonForm = ({ seasonId, women }: TeamSeasonFormProps) => {
  const { data, isLoading, error } = useGetTeams()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const [teamFilter, setTeamFilter] = useState('')
  const [formState, dispatch] = useReducer<
    Reducer<TeamSeasonStateType, TeamSeasonActionType>
  >(teamseasonReducer, { teamArray: [] })
  const queryClient = useQueryClient()

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

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    mutation.mutate({ formState, seasonId, women })
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
  }

  const addTeam = (teamId: number) => {
    dispatch({
      type: 'ADD TEAM',
      payload: teamId,
    })
  }
  const removeTeam = (teamId: number) => {
    dispatch({
      type: 'REMOVE TEAM',
      payload: teamId,
    })
  }
  const clearTeams = () => {
    dispatch({
      type: 'CLEAR TEAMS',
    })
  }

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  return (
    <>
      <div className="flex items-start justify-between p-5">
        <h3 className="text-lg font-semibold">Lägg till lag</h3>
        <div className="flex items-center justify-end gap-2 p-6">
          <Button onClick={handleSubmit}>Spara</Button>
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

      <div className="">
        <div className="w-[1024px] flex-auto flex-col justify-start p-5 px-16 backdrop:flex">
          <div className="flex flex-row justify-between p-1">
            <div className="grid grid-cols-3 gap-2">
              {teamSelection
                .filter((team) => team.label.includes(teamFilter))
                .map((team) => {
                  return (
                    <div
                      key={team.value}
                      className="flex flex-row items-center bg-background text-xs font-medium text-foreground"
                    >
                      <div className="w-32">{team.label}</div>
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => addTeam(team.value)}
                        >
                          <Plus />
                        </Button>{' '}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => removeTeam(team.value)}
                        >
                          <Minus />
                        </Button>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                Rensa listan
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => clearTeams()}
                >
                  <Minus />
                </Button>
              </div>
              <div>
                {formState.teamArray.map((teamId) => {
                  return (
                    <div key={teamId}>
                      {
                        teamSelection.find((team) => team.value === teamId)
                          ?.label
                      }
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamSeasonForm
