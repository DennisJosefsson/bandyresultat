import { ChangeEvent, SyntheticEvent, useReducer } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import metadataFormReducer from '../../reducers/metadataFormReducer'
import { TeamAttributes } from '../types/teams/teams'
import { postMetadata } from '../../requests/metadata'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { Label } from '@/src/@/components/ui/label'
import { Input } from '@/src/@/components/ui/input'

const initFunction = (seasonId: number, name: string) => {
  return {
    seasonId: seasonId,
    name: '',
    year: name,
    winnerId: null,
    winnerName: '',
    hostCity: '',
    finalDate: '',
    northSouth: false,
    multipleGroupStages: false,
    eight: false,
    quarter: true,
    semi: true,
    final: true,
    comment: '',
  }
}

type TeamSelection = {
  value: string
  label: string
}[]

type MetdataFormProps = {
  seasonId: number
  name: string
  teams: TeamAttributes[]
}

const MetadataForm = ({ seasonId, name, teams }: MetdataFormProps) => {
  const mutation = useMutation({
    mutationFn: postMetadata,
  })
  const teamSelection: TeamSelection = teams.map((team) => {
    return { value: team.name, label: team.name }
  })

  const teamNameIdObj = Object.fromEntries(
    teams.map((team) => [team.name, team.teamId]),
  )

  const [formState, dispatch] = useReducer(
    metadataFormReducer,
    initFunction(seasonId, name),
  )

  const queryClient = useQueryClient()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
  }

  const toggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'TOGGLE', field: event?.target.name })
  }

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (event.target.name === 'winnerName') {
      dispatch({
        type: 'INPUT',
        field: 'winnerId',
        payload: teamNameIdObj[event.target.value],
      })
      dispatch({
        type: 'INPUT',
        field: event.target.name,
        payload: event.target.value,
      })
    } else {
      dispatch({
        type: 'INPUT',
        field: event.target.name,
        payload: event.target.value,
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} id="metadataForm">
            <div className="flex w-[540px] flex-auto flex-col p-5 px-16">
              <div className="p-1">
                <Label htmlFor="name">Serienamn</Label>

                <div>
                  <Input
                    className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-1">
                <Label htmlFor="winnerName">SM-guld:</Label>
                <div>
                  <select
                    className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                    name="winnerName"
                    id="winnerName"
                    value={formState.winnerName}
                    onChange={handleChange}
                  >
                    {teamSelection.map((team, index) => {
                      return (
                        <option key={index} value={team.value}>
                          {team.label}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="flex-row">
                <div className="p-1">
                  <label
                    htmlFor="hostCity"
                    className="flex flex-row text-sm font-medium text-gray-900"
                  >
                    <div className="w-32">Finalstad:</div>
                    <div>
                      <input
                        className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                        type="text"
                        name="hostCity"
                        value={formState.hostCity}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                </div>
                <div className="p-1">
                  <label
                    htmlFor="finalDate"
                    className="flex flex-row text-sm font-medium text-gray-900"
                  >
                    <div className="w-32">Finaldatum:</div>
                    <div>
                      <input
                        className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                        type="text"
                        name="finalDate"
                        value={formState.finalDate}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="m-1 p-1">
                  <label
                    htmlFor="final"
                    className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                  >
                    <div>Final?</div>
                    <div>
                      <input
                        className="text-gray-900 focus:ring-gray-500"
                        type="checkbox"
                        name="final"
                        checked={formState.final}
                        onChange={toggleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="m-1 p-1">
                  <label
                    htmlFor="semi"
                    className="flex flex-row  space-x-2 text-sm font-medium text-gray-900"
                  >
                    <div>Semifinal?</div>
                    <div>
                      <input
                        className="text-gray-900 focus:ring-gray-500"
                        type="checkbox"
                        name="semi"
                        checked={formState.semi}
                        onChange={toggleChange}
                      />
                    </div>
                  </label>
                </div>
                <div className="m-1 p-1">
                  <label
                    htmlFor="quarter"
                    className="flex flex-row  space-x-2 text-sm font-medium text-gray-900"
                  >
                    <div>Kvartsfinal?</div>
                    <div>
                      <input
                        className="text-gray-900 focus:ring-gray-500"
                        type="checkbox"
                        name="quarter"
                        checked={formState.quarter}
                        onChange={toggleChange}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="p-1 ">
                <label
                  htmlFor="eight"
                  className="flex flex-row  space-x-2 text-sm font-medium text-gray-900"
                >
                  <div>Åttondelsfinal?</div>
                  <div>
                    <input
                      className="text-gray-900 focus:ring-gray-500"
                      type="checkbox"
                      name="eight"
                      checked={formState.eight}
                      onChange={toggleChange}
                    />
                  </div>
                </label>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="p-1">
                  <label
                    htmlFor="northSouth"
                    className="flex flex-row  space-x-2 text-sm font-medium text-gray-900"
                  >
                    <div>Norr- och södergrupp?</div>
                    <div>
                      <input
                        className="text-gray-900 focus:ring-gray-500"
                        type="checkbox"
                        name="northSouth"
                        checked={formState.northSouth}
                        onChange={toggleChange}
                      />
                    </div>
                  </label>
                </div>
                <div className="p-1">
                  <label
                    htmlFor="multipleGroupStages"
                    className="flex flex-row  space-x-2 text-sm font-medium text-gray-900"
                  >
                    <div>Dubbla gruppspel?</div>
                    <div>
                      <input
                        className="text-gray-900 focus:ring-gray-500"
                        type="checkbox"
                        name="multipleGroupStages"
                        checked={formState.multipleGroupStages}
                        onChange={toggleChange}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-1">
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  <div className="w-32">Kommentar:</div>
                  <textarea
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    rows={4}
                    name="comment"
                    value={formState.comment}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </form>
        </CardContent>
        {/*footer*/}
        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
          <input
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="submit"
            form="metadataForm"
            value="Spara"
          />
        </div>
      </Card>
    </>
  )
}

export default MetadataForm
