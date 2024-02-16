import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { postGame, deleteGame } from '../../../requests/games'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'

const ErrorComponent = ({ errors }) => {
  if (Object.keys(errors).length === 0) {
    return null
  }
  return (
    <div className="mb-2 rounded border-red-700 bg-white p-2 text-sm font-semibold text-red-700 md:text-base">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  )
}

const initAdd = (initData) => {
  return {
    seasonId: initData.seasonId,
    homeTeamId: '',
    awayTeamId: '',
    result: '',
    halftimeResult: '',
    homeGoal: '',
    awayGoal: '',
    halftimeHomeGoal: '',
    halftimeAwayGoal: '',
    date: '',
    category: 'regular',
    group: 'elitserien',
    playoff: false,
    extraTime: false,
    penalties: false,
    women: initData.women,
  }
}

const initEdit = (gameData) => {
  return {
    gameId: gameData.gameId,
    seasonId: gameData.seasonId,
    homeTeamId: {
      value: gameData.homeTeam.teamId,
      label: gameData.homeTeam.casualName,
    },
    awayTeamId: {
      value: gameData.awayTeam.teamId,
      label: gameData.awayTeam.casualName,
    },
    result: gameData.result,
    halftimeResult: gameData.halftimeResult,
    homeGoal: gameData.homeGoal,
    awayGoal: gameData.awayGoal,
    halftimeHomeGoal: gameData.halftimeHomeGoal,
    halftimeAwayGoal: gameData.halftimeAwayGoal,
    date: gameData.date,
    category: gameData.category,
    group: gameData.group,
    playoff: gameData.playoff,
    extraTime: gameData.extraTime,
    penalties: gameData.penalties,
    women: gameData.women,
  }
}

const GameForm = ({ season, setShowModal, gameData, setGameData, women }) => {
  const [error, setError] = useState(null)
  const [newGameData, setNewGameData] = useState(null)
  const [playoff, setPlayoff] = useState(false)
  const [extraTime, setExtraTime] = useState(false)
  const [penalties, setPenalties] = useState(false)
  const client = useQueryClient()
  const { data } = useQuery({
    queryKey: ['game', newGameData],
    queryFn: () => postGame(newGameData),
    enabled: !!newGameData,
    onSuccess: () => onSuccessSubmit(),
    onError: (error) => setError(error.message),
  })

  const mutation = useMutation({
    mutationFn: ({ gameId }) => deleteGame(gameId),
    onSuccess: () => onSuccessDeleteMutation(),
    onError: (error) => setError(error.message),
  })

  const teamSelection = season[0].teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  teamSelection.push({ value: 176, label: 'Ej Bestämt' })

  const groupSelection = [
    { value: 'elitserien', label: 'Elitserien' },
    { value: 'KvalA', label: 'Kvalgrupp A' },
    { value: 'KvalB', label: 'Kvalgrupp B' },
    { value: 'E1', label: 'Åttondel 1' },
    { value: 'E2', label: 'Åttondel 2' },
    { value: 'Q1', label: 'Kvartsfinal 1' },
    { value: 'Q2', label: 'Kvartsfinal 2' },
    { value: 'Q3', label: 'Kvartsfinal 3' },
    { value: 'Q4', label: 'Kvartsfinal 4' },
    { value: 'S1', label: 'Semifinal 1' },
    { value: 'S2', label: 'Semifinal 2' },
    { value: 'final', label: 'Final' },
  ]

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: gameData
      ? initEdit(gameData)
      : initAdd({ seasonId: season[0].seasonId, women }),
    criteriaMode: 'all',
    mode: 'onBlur',
  })

  const onSuccessDeleteMutation = () => {
    client.invalidateQueries({ queryKey: ['singleSeasonGames'] })
    setTimeout(() => {
      setGameData(null)
      setShowModal(false)
    }, 500)
  }

  const onSuccessSubmit = () => {
    client.invalidateQueries({ queryKey: ['singleSeasonGames'] })
    setTimeout(() => {
      setGameData(null)
      setShowModal(false)
    }, 750)
  }

  const onSubmit = (formData) => {
    setNewGameData(formData)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2 mx-auto my-6 w-auto max-w-3xl overflow-y-auto">
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
              <form onSubmit={handleSubmit(onSubmit)} id="GameForm">
                <div className="flex w-[640px] flex-auto flex-col justify-start p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="homeTeamId"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Hemmalag:</div>
                      <div>
                        <Controller
                          name="homeTeamId"
                          control={control}
                          rules={{ required: 'Måste ange hemmalag' }}
                          render={({ field }) => (
                            <Select
                              options={teamSelection}
                              {...field}
                              styles={selectStyles}
                            />
                          )}
                        />
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
                        <Controller
                          name="awayTeamId"
                          control={control}
                          rules={{ required: 'Måste ange bortalag' }}
                          render={({ field }) => (
                            <Select
                              options={teamSelection}
                              {...field}
                              styles={selectStyles}
                            />
                          )}
                        />
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
                            {...register('result', {
                              minLength: {
                                value: 3,
                                message: 'Fel format på resultat',
                              },
                              maxLength: {
                                value: 5,
                                message: 'Fel format på resultat',
                              },
                              pattern: {
                                value: '/[0-9]{1,2}-[0-9]{1,2}',
                                message:
                                  'Resultatet måste vara i formatet n-n, t.ex. 2-1.',
                              },
                            })}
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
                            {...register('halftimeResult', {
                              minLength: {
                                value: 3,
                                message: 'Fel format på halvtidsresultat',
                              },
                              maxLength: {
                                value: 5,
                                message: 'Fel format på halvtidsresultat',
                              },
                              pattern: {
                                value: '/[0-9]{1,2}-[0-9]{1,2}',
                                message:
                                  'Halvtidsresultatet måste vara i formatet n-n, t.ex. 2-1.',
                              },
                            })}
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
                            {...register('date', {
                              minLength: {
                                value: 10,
                                message: 'Fel format på datumet',
                              },
                              maxLength: {
                                value: 10,
                                message: 'Fel format på datumet',
                              },
                              pattern: {
                                value: '/[0-9]{4}-[0-9]{2}-[0-9]{2}',
                                message:
                                  'Datumet måste vara i formatet ÅÅÅÅ-MM-DD, t.ex. 1978-03-16.',
                              },
                            })}
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
                        <fieldset className="mb-2 grid grid-cols-2 self-start">
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="final"
                              {...register('category')}
                            />
                            <label htmlFor="final" className="pl-2">
                              Final
                            </label>
                          </div>
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="semi"
                              {...register('category')}
                            />
                            <label htmlFor="semi" className="pl-2">
                              Semifinal
                            </label>
                          </div>
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="quarter"
                              {...register('category')}
                            />
                            <label htmlFor="quarter" className="pl-2">
                              Kvartsfinal
                            </label>
                          </div>
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="eight"
                              {...register('category')}
                            />
                            <label htmlFor="eight" className="pl-2">
                              Åttondelsfinal
                            </label>
                          </div>
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="regular"
                              {...register('category')}
                            />
                            <label htmlFor="regular" className="pl-2">
                              Grundserie
                            </label>
                          </div>
                          <div className="mb-1 mr-2 flex items-center">
                            <input
                              className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                              type="radio"
                              value="qualification"
                              {...register('category')}
                            />
                            <label htmlFor="qualification" className="pl-2">
                              Kvalmatch
                            </label>
                          </div>
                        </fieldset>
                      </label>
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="group"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Grupp:</div>
                        <fieldset className="mb-2 grid grid-cols-2 self-start">
                          {groupSelection.map((group) => {
                            return (
                              <div
                                key={group.value}
                                className="mb-1 mr-2 flex items-center"
                              >
                                <input
                                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                                  type="radio"
                                  value={group.value}
                                  {...register('group')}
                                />
                                <label htmlFor={group.value} className="pl-2">
                                  {group.label}
                                </label>
                              </div>
                            )
                          })}
                        </fieldset>
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
                            {...register('playoff')}
                            checked={playoff}
                            onChange={(event) => {
                              setValue(
                                'playoff',
                                event.target.checked ? true : false,
                              )
                              setPlayoff(!playoff)
                            }}
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
                            {...register('extraTime')}
                            checked={extraTime}
                            onChange={(event) => {
                              setValue(
                                'extraTime',
                                event.target.checked ? true : false,
                              )
                              setExtraTime(!extraTime)
                            }}
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
                            {...register('penalties')}
                            checked={penalties}
                            onChange={(event) => {
                              setValue(
                                'penalties',
                                event.target.checked ? true : false,
                              )
                              setPenalties(!penalties)
                            }}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <ErrorComponent errors={errors} />
              {error && <div className="p-2">{error}</div>}
              {data && (
                <div className="p-2">
                  Ny match: {data.game.date} {data.game.result}
                </div>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              {gameData && gameData.gameId && (
                <button
                  className="mb-1 mr-1 rounded bg-red-500 px-6 py-2 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                  type="button"
                  onClick={() => mutation.mutate({ gameId: gameData.gameId })}
                >
                  Ta bort
                </button>
              )}
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
