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

const MetadataForm = ({ seasonId, name, teams, mutation }) => {
  const teamSelection = teams.map((team) => {
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

  const handleSubmit = (event) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
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
      <div>
        {/*header*/}
        <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
          <h3 className="text-lg font-semibold">Metadata</h3>
        </div>
        {/*body*/}
        <div>
          <form onSubmit={handleSubmit} id="metadataForm">
            <div className="flex w-[540px] flex-auto flex-col p-5 px-16">
              <div className="p-1">
                <label
                  htmlFor="name"
                  className="flex flex-row text-sm font-medium text-gray-900"
                >
                  <div className="w-32">Serienamn:</div>
                  <div>
                    <input
                      className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                      className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                        className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                        className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                        value={formState.final}
                        checked={formState.final}
                        onChange={() => dispatch({ type: 'TOGGLE FINAL' })}
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
                        value={formState.semi}
                        checked={formState.semi}
                        onChange={() => dispatch({ type: 'TOGGLE SEMI' })}
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
                        value={formState.quarter}
                        checked={formState.quarter}
                        onChange={() => dispatch({ type: 'TOGGLE QUARTER' })}
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
                        onChange={() => dispatch({ type: 'TOGGLE NORTHSOUTH' })}
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  <div className="w-32">Kommentar:</div>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
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
        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
          <input
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="submit"
            form="metadataForm"
            value="Spara"
          />
        </div>
      </div>
    </>
  )
}

export default MetadataForm
