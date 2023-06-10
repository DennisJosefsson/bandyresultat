import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import metadataFormReducer from '../../reducers/metadataFormReducer'

const initFunction = (seasonId, name) => {
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

const MetadataForm = ({ seasonId, name, teams, mutation, setShowModal }) => {
  const teamSelection = teams.map((team) => {
    return { value: team.name, label: team.name }
  })

  const teamNameIdObj = Object.fromEntries(
    teams.map((team) => [team.name, team.teamId])
  )

  const [formState, dispatch] = useReducer(
    metadataFormReducer,
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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Metadata</h3>
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
              <form onSubmit={handleSubmit} id="metadataForm">
                <div className="flex flex-col w-[540px] flex-auto p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="name"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Serienamn:</div>
                      <div>
                        <input
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="winnerName"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">SM-guld:</div>
                      <div>
                        <select
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          name="winnerName"
                          id="winnerName"
                          value={formState.winnerName}
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
                  <div className="flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="hostCity"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Finalstad:</div>
                        <div>
                          <input
                            className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="text"
                            name="hostCity"
                            value={formState.hostCity}
                            onChange={(event) => handleChange(event)}
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
                            className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="text"
                            name="finalDate"
                            value={formState.finalDate}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="p-1 m-1">
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
                            value={formState.final}
                            checked={formState.final}
                            onChange={() => dispatch({ type: 'TOGGLE FINAL' })}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="p-1 m-1">
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
                            value={formState.semi}
                            checked={formState.semi}
                            onChange={() => dispatch({ type: 'TOGGLE SEMI' })}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1 m-1">
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
                            value={formState.quarter}
                            checked={formState.quarter}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE QUARTER' })
                            }
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
                          value={formState.eight}
                          onChange={() => dispatch({ type: 'TOGGLE EIGHT' })}
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
                            value={formState.northSouth}
                            checked={formState.northSouth}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE NORTHSOUTH' })
                            }
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
                            value={formState.multipleGroupStages}
                            checked={formState.multipleGroupStages}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE MULTIPLEGROUPSTAGES' })
                            }
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="p-1">
                    <label
                      htmlFor="comment"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Kommentar:</div>
                      <input
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        rows="4"
                        type="textarea"
                        name="comment"
                        value={formState.comment}
                        onChange={(event) => handleChange(event)}
                      />
                    </label>
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
                form="metadataForm"
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

export default MetadataForm
