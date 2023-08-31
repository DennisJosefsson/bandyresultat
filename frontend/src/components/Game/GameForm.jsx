import { useReducer } from 'react'

import gameFormReducer from '../../reducers/gameFormReducer'

const initAdd = (seasonId, women) => {
  return {
    seasonId: seasonId,
    homeTeamId: '',
    awayTeamId: '',
    result: '',
    halftimeResult: '',
    homeGoal: '',
    awayGoal: '',
    halftimeHomeGoal: '',
    halftimeAwayGoal: '',
    date: '',
    round: '',
    category: 'regular',
    group: 'elitserien',
    playoff: false,
    extraTime: false,
    penalties: false,
    women: women,
  }
}

const initEdit = (gameData) => {
  return {
    gameId: gameData.gameId,
    seasonId: gameData.seasonId,
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

const GameForm = ({
  season,
  mutation,
  setShowModal,
  gameData,
  setGameData,
  women
}) => {
  const teamSelection = season[0].teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  const groupSelection = [
    // { value: 'elitserien', label: 'Elitserien' },
    // { value: 'allsvenskan', label: 'Allsvenskan' },
    // { value: 'norr', label: 'Norr' },
    // { value: 'syd', label: 'Syd' },
    { value: 'KvalA', label: 'Kvalgrupp A' },
    { value: 'KvalB', label: 'Kvalgrupp B' },
    //{ value: 'E1', label: 'Åttondel 1' },
    //{ value: 'E2', label: 'Åttondel 2' },
    //{ value: 'Q1', label: 'Kvartsfinal 1' },
    //{ value: 'Q2', label: 'Kvartsfinal 2' },
    //{ value: 'Q3', label: 'Kvartsfinal 3' },
    { value: 'Q4', label: 'Kvartsfinal 4' },
    { value: 'S1', label: 'Semifinal 1' },
    { value: 'S2', label: 'Semifinal 2' },
    { value: 'final', label: 'Final' },
    // { value: 'sexlagsserie', label: 'Sexlagsserie' },
    //{ value: 'Div1Norr', label: 'Division 1 Norr' },
    // { value: 'Div1Central', label: 'Division 1 Central' },
    //{ value: 'Div1Syd', label: 'Division 1 Syd' },
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
    // { value: 'SlutspelA', label: 'Slutspelsgrupp A' },
    // { value: 'SlutspelB', label: 'Slutspelsgrupp B' },
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
    gameData ? initEdit(gameData) : initAdd(season.seasonId, women),
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
    setGameData(null)
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Matchformulär</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <form onSubmit={handleSubmit} id="GameForm">
                <div className="flex w-[540px] flex-auto flex-col justify-start p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="homeTeamId"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Hemmalag:</div>
                      <div>
                        <select
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                            className="w-24 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                            className="w-24 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                            className="w-32 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                        htmlFor="category"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Kategori:</div>
                        <div>
                          <select
                            className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
                            className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
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
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => {
                  setGameData(null)
                  setShowModal(false)
                }}
              >
                Stäng
              </button>
              <input
                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="submit"
                form="GameForm"
                value="Spara"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default GameForm
