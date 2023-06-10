import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import tableFormReducer from '../../reducers/tableFormReducer'

const initFunction = (seasonId, name) => {
  return {
    seasonId: seasonId,
    teamId: null,
    year: name,
    position: null,
    games: null,
    won: null,
    lost: null,
    draw: null,
    scoredGoals: null,
    concededGoals: null,
    goalDifference: null,
    points: null,
    qualification: false,
    group: 'elitserien',
  }
}

const TableForm = ({ seasonId, name, teams, mutation, setShowModal }) => {
  const teamSelection = teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  const groupSelection = [
    { value: 'elitserien', label: 'Elitserien' },
    { value: 'allsvenskan', label: 'Allsvenskan' },
    { value: 'norr', label: 'Norr' },
    { value: 'syd', label: 'Syd' },
    { value: 'KvalA', label: 'Kvalgrupp A' },
    { value: 'KvalB', label: 'Kvalgrupp B' },
  ]

  const [formState, dispatch] = useReducer(
    tableFormReducer,
    initFunction(seasonId, name)
  )

  const queryClient = useQueryClient()

  const handleSubmit = (event) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
    setShowModal(false)
  }

  const handleChange = (event) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Tabellformulär</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <form onSubmit={handleSubmit} id="tableForm">
                <div className="flex flex-col w-[540px] flex-auto p-5 px-16 justify-start">
                  <div className="p-1">
                    <label
                      htmlFor="teamId"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-20">Lag:</div>
                      <div>
                        <select
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          name="teamId"
                          id="teamId"
                          value={formState.teamId}
                          onChange={(event) => handleChange(event)}
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
                    </label>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="p-1">
                      <label
                        htmlFor="position"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Position:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="position"
                            value={formState.position}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="games"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Matcher:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="games"
                            value={formState.games}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="won"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Vinster:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="won"
                            value={formState.won}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="draw"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Oavgjorda:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="draw"
                            value={formState.draw}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="lost"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Förlorade:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="lost"
                            value={formState.lost}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="scoredGoals"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Gjorda mål:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="scoredGoals"
                            value={formState.scoredGoals}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="concededGoals"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Insläppta:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="concededGoals"
                            value={formState.concededGoals}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="goalDifference"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Målskilnad:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="goalDifference"
                            value={formState.goalDifference}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="points"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Poäng:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="points"
                            value={formState.points}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="p-1">
                      <label
                        htmlFor="qualification"
                        className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                      >
                        <div className="w-20">Kval?</div>
                        <div>
                          <input
                            className="text-gray-900 focus:ring-gray-500"
                            type="checkbox"
                            name="qualification"
                            value={formState.qualification}
                            checked={formState.qualification}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE QUALIFICATION' })
                            }
                          />
                        </div>
                      </label>
                    </div>

                    <div className="p-1">
                      <label
                        htmlFor="group"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-20">Grupp:</div>
                        <div>
                          <select
                            className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            name="group"
                            id="group"
                            value={formState.group}
                            onChange={(event) => handleChange(event)}
                          >
                            {groupSelection.map((team, index) => {
                              return (
                                <option key={index} value={team.value}>
                                  {team.label}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
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
              <input
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                form="tableForm"
                value="Spara"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default TableForm
