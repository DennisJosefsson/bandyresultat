import { useReducer } from 'react'

import gameFormReducer from '../../reducers/gameFormReducer'

const initAdd = (seasonId) => {
  return {
    seasonId: seasonId,
    homeTeamId: '',
    awayTeamId: '',
    result: '',
    halftimeResult: null,
    homeGoal: null,
    awayGoal: null,
    halftimeHomeGoal: null,
    halftimeAwayGoal: null,
    date: null,
    round: null,
    category: 'regular',
    group: 'elitserien',
    playoff: false,
    extraTime: false,
    penalties: false,
    women: false,
  }
}

const initEdit = (gameData, seasonId) => {
  return {
    gameId: gameData.gameId,
    seasonId: seasonId,
    homeTeamId: gameData.homeTeam.teamId,
    awayTeamId: gameData.awayTeam.teamId,
    result: gameData.result,
    halftimeResult: gameData.halftimeResult,
    homeGoal: gameData.homeGoal,
    awayGoal: gameData.awayGoal,
    halftimeHomeGoal: gameData.halftimeHomeGoal,
    halftimeAwayGoal: gameData.halftimeAwayGoal,
    date: gameData.date,
    round: gameData.round,
    category: gameData.category,
    group: gameData.group,
    playoff: gameData.playoff,
    extraTime: gameData.extraTime,
    penalties: gameData.penalties,
    women: gameData.women,
  }
}

const GameForm = ({ seasonId, teams, mutation, setShowModal, gameData }) => {
  console.log('Gamedata:', gameData)
  const teamSelection = teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  const groupSelection = [
    // { value: 'elitserien', label: 'Elitserien' },
    // { value: 'allsvenskan', label: 'Allsvenskan' },
    // { value: 'norr', label: 'Norr' },
    // { value: 'syd', label: 'Syd' },
    // { value: 'KvalA', label: 'Kvalgrupp A' },
    // { value: 'KvalB', label: 'Kvalgrupp B' },
    // { value: 'E1', label: 'Åttondel 1' },
    // { value: 'E2', label: 'Åttondel 2' },
    { value: 'Q1', label: 'Kvartsfinal 1' },
    { value: 'Q2', label: 'Kvartsfinal 2' },
    { value: 'Q3', label: 'Kvartsfinal 3' },
    { value: 'Q4', label: 'Kvartsfinal 4' },
    { value: 'S1', label: 'Semifinal 1' },
    { value: 'S2', label: 'Semifinal 2' },
    { value: 'final', label: 'Final' },
    // { value: 'sexlagsserie', label: 'Sexlagsserie' },
    { value: 'Div1Norr', label: 'Division 1 Norr' },
    // { value: 'Div1Central', label: 'Division 1 Central' },
    { value: 'Div1Syd', label: 'Division 1 Syd' },
    // { value: 'Div1SydA', label: 'Division 1 SydA' },
    // { value: 'Div1SydB', label: 'Division 1 SydB' },
    // { value: 'Div1NorrA', label: 'Division 1 NorrA' },
    // { value: 'Div1NorrB', label: 'Division 1 NorrB' },
    // { value: 'NedflyttningNorr', label: 'Nedflyttning Norr' },
    // { value: 'NedflyttningSyd', label: 'Nedflyttning Syd' },
    // { value: 'AvdA', label: 'Avdelning A' },
    // { value: 'AvdB', label: 'Avdelning B' },
    // { value: 'AvdC', label: 'Avdelning C' },
    // { value: 'AvdD', label: 'Avdelning D' },
  ]

  const categorySelection = [
    { value: 'regular', label: 'Grundserie' },
    { value: 'qualification', label: 'Kvalmatch' },
    { value: 'eight', label: 'Åttondelsfinal' },
    { value: 'quarter', label: 'Kvartsfinal' },
    { value: 'semi', label: 'Semifinal' },
    { value: 'final', label: 'Final' },
  ]

  const [formState, dispatch] = useReducer(
    gameFormReducer,
    gameData ? initEdit(gameData, seasonId) : initAdd(seasonId)
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    formState.homeGoal = formState.result.split('-')[0]
    formState.awayGoal = formState.result.split('-')[1]
    if (formState.halftimeResult) {
      formState.halftimeHomeGoal = formState.halftimeResult.split('-')[0]
      formState.halftimeAwayGoal = formState.halftimeResult.split('-')[1]
    }
    mutation.mutate({ formState })

    setShowModal(false)
  }

  const handleChange = (event) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  console.log(formState)

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Matchformulär</h3>
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
              <form onSubmit={handleSubmit} id="GameForm">
                <div className="flex flex-col w-[540px] flex-auto p-5 px-16 justify-start">
                  <div className="p-1">
                    <label
                      htmlFor="homeTeamId"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Hemmalag:</div>
                      <div>
                        <select
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          name="homeTeamId"
                          id="homeTeamId"
                          value={formState.homeTeamId}
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
                  <div className="p-1">
                    <label
                      htmlFor="awayTeamId"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Bortalag:</div>
                      <div>
                        <select
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          name="awayTeamId"
                          id="awayTeamId"
                          value={formState.awayTeamId}
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
                  <div className="flex flex-col py-2">
                    <div className="p-1">
                      <label
                        htmlFor="result"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Slutresultat:</div>
                        <div>
                          <input
                            className="w-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="text"
                            name="result"
                            value={formState.result}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="halftimeResult"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Halvtidsresultat:</div>
                        <div>
                          <input
                            className="w-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="text"
                            name="halftimeResult"
                            value={formState.halftimeResult}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="date"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Datum:</div>
                        <div>
                          <input
                            className="w-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="text"
                            name="date"
                            value={formState.date}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="round"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Omgång:</div>
                        <div>
                          <input
                            className="w-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            type="number"
                            name="round"
                            value={formState.round}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="category"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Kategori:</div>
                        <div>
                          <select
                            className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            name="category"
                            id="category"
                            value={formState.category}
                            onChange={(event) => handleChange(event)}
                          >
                            {categorySelection.map((category, index) => {
                              return (
                                <option key={index} value={category.value}>
                                  {category.label}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="group"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Grupp:</div>
                        <div>
                          <select
                            className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            name="group"
                            id="group"
                            value={formState.group}
                            onChange={(event) => handleChange(event)}
                          >
                            {groupSelection.map((group, index) => {
                              return (
                                <option key={index} value={group.value}>
                                  {group.label}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="playoff"
                        className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                      >
                        <div className="w-32">Slutspel?</div>
                        <div>
                          <input
                            className="text-gray-900 focus:ring-gray-500"
                            type="checkbox"
                            name="playoff"
                            value={formState.playoff}
                            checked={formState.playoff}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE PLAYOFF' })
                            }
                          />
                        </div>
                      </label>
                    </div>

                    <div className="p-1">
                      <label
                        htmlFor="extraTime"
                        className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                      >
                        <div className="w-32">Övertid?</div>
                        <div>
                          <input
                            className="text-gray-900 focus:ring-gray-500"
                            type="checkbox"
                            name="extraTime"
                            value={formState.extraTime}
                            checked={formState.extraTime}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE EXTRATIME' })
                            }
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="penalties"
                        className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                      >
                        <div className="w-32">Straffar?</div>
                        <div>
                          <input
                            className="text-gray-900 focus:ring-gray-500"
                            type="checkbox"
                            name="penalties"
                            value={formState.penalties}
                            checked={formState.penalties}
                            onChange={() =>
                              dispatch({ type: 'TOGGLE PENALTIES' })
                            }
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="women"
                        className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                      >
                        <div className="w-32">Damlag?</div>
                        <div>
                          <input
                            className="text-gray-900 focus:ring-gray-500"
                            type="checkbox"
                            name="women"
                            value={formState.women}
                            checked={formState.women}
                            onChange={() => dispatch({ type: 'TOGGLE WOMEN' })}
                          />
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
                form="GameForm"
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

export default GameForm
