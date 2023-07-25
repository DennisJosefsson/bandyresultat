import { useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'

import { Plus, Minus } from '../utilitycomponents/icons'

const TeamSeasonForm = ({ season, mutation, setShowModal, teams }) => {
  const initState = []
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

    mutation.mutate({ formState, season })
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
      <div className="justify-center items-center flex overflow-x-hidden fixed overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
        <div className="relative h-[540px] w-[1024px] my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Lägg till lag</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
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
              <div className="backdrop:flex flex-col w-[1024px] flex-auto p-5 px-16 justify-start">
                <div className="p-1 flex flex-row">
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
                    {formState.map((teamId) => {
                      return (
                        <div key={teamId}>
                          {
                            teamSelection.find((team) => team.value === teamId)
                              .label
                          }
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
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleSubmit}
              >
                Spara
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default TeamSeasonForm
