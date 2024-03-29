import { useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import teamArrayFormReducer from '../../../reducers/teamSeasonFormReducer'

import { Plus, Minus } from '../../utilitycomponents/Components/icons'

const TeamSeasonForm = ({ seasonId, mutation, setShowModal, teams, women }) => {
  const initState = { teamArray: [] }
  const [teamFilter, setTeamFilter] = useState('')
  const [formState, dispatch] = useReducer(teamArrayFormReducer, initState)
  const queryClient = useQueryClient()

  const teamSelection = teams.map((team) => {
    return {
      value: team.teamId,
      label: team.women ? `${team.name} - D` : team.name,
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    mutation.mutate({ formState, seasonId, women })
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
    setShowModal(false)
  }

  const addTeam = (teamId) => {
    dispatch({
      type: 'ADD TEAM',
      payload: teamId,
    })
  }
  const removeTeam = (teamId) => {
    dispatch({
      type: 'REMOVE TEAM',
      payload: teamId,
    })
  }
  const clearTeams = () => {
    dispatch({
      type: 'CLEAR',
    })
  }

  return (
    <>
      <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Lägg till lag</h3>

        <form>
          <input
            className="rounded"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) => setTeamFilter(event.target.value)}
          />
        </form>
      </div>
      {/*body*/}
      <div className="">
        <div className="w-[1024px] flex-auto flex-col justify-start p-5 px-16 backdrop:flex">
          <div className="flex flex-row p-1">
            <div className="w-3/4">
              <div className="grid grid-cols-3 gap-2">
                {teamSelection
                  .filter((team) => team.label.includes(teamFilter))
                  .map((team) => {
                    return (
                      <div
                        key={team.value}
                        className="flex flex-row text-xs font-medium text-gray-900"
                      >
                        <div className="w-32">{team.label}</div>
                        <div>
                          <button onClick={() => addTeam(team.value)}>
                            <Plus />
                          </button>{' '}
                          <button onClick={() => removeTeam(team.value)}>
                            <Minus />
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div>
              {formState.teamArray.map((teamId) => {
                return (
                  <div key={teamId}>
                    {teamSelection.find((team) => team.value === teamId).label}
                  </div>
                )
              })}
              Rensa listan
              <button onClick={() => clearTeams()}>
                <Minus />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*footer*/}
      <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
        <button
          className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
          onClick={handleSubmit}
        >
          Spara
        </button>
      </div>
    </>
  )
}

export default TeamSeasonForm
