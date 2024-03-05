import { Dispatch, SetStateAction, useState } from 'react'
import {
  useForm,
  Controller,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { postGame, deleteGame } from '../../../requests/games'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'
import {
  inputGameObject,
  InputGameObjectType,
  GameObjectType,
  GameFormObjectType,
} from '../../types/games/games'
import { SeasonObjectType } from '../../types/season/seasons'
import { zodResolver } from '@hookform/resolvers/zod'

type GameFormPropTypes = {
  season: SeasonObjectType[]
  gameData: GameObjectType | null
  setShowModal: Dispatch<SetStateAction<boolean>>
  setGameData: Dispatch<SetStateAction<GameObjectType | null>>
  women: boolean
}

const ErrorComponent = ({ errors }: { errors: FieldErrors }) => {
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

const initAdd = ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): InputGameObjectType => {
  return {
    seasonId: seasonId,
    homeTeamId: undefined,
    awayTeamId: undefined,
    result: '',
    halftimeResult: '',
    date: '',
    category: 'regular',
    group: 'elitserien',
    playoff: false,
    extraTime: false,
    penalties: false,
    women: women,
  }
}

const initEdit = (gameData: GameObjectType): InputGameObjectType => {
  if (!gameData.homeTeam || !gameData.awayTeam) {
    throw new Error('Missing game data')
  }
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
    date: gameData.date,
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
  setShowModal,
  gameData,
  setGameData,
  women,
}: GameFormPropTypes) => {
  const [newGameData, setNewGameData] = useState<GameFormObjectType | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)
  const [playoff, setPlayoff] = useState<boolean>(false)
  const [extraTime, setExtraTime] = useState<boolean>(false)
  const [penalties, setPenalties] = useState<boolean>(false)
  const client = useQueryClient()
  const { data } = useQuery({
    queryKey: ['game', newGameData],
    queryFn: () => postGame(newGameData),
    enabled: !!newGameData,
    onSuccess: () => onSuccessSubmit(),
  })

  const mutation = useMutation({
    mutationFn: ({ gameId }: { gameId: number }) => deleteGame(gameId),
    onSuccess: () => onSuccessDeleteMutation(),
    onError: (error: Error) => setError(error.message),
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

  const teamSelection = season[0].teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  teamSelection.push({ value: 176, label: 'Ej Bestämt' })

  const groupSelection = [
    { value: 'elitserien', label: 'Elitserien' },
    { value: 'allsvenskan', label: 'Allsvenskan' },
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
  } = useForm<InputGameObjectType>({
    defaultValues: gameData
      ? initEdit(gameData)
      : initAdd({ seasonId: season[0].seasonId, women }),
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(inputGameObject),
  })

  const onSubmit: SubmitHandler<InputGameObjectType> = (formData) => {
    if (
      !formData.homeTeamId ||
      !formData.homeTeamId.value ||
      !formData.awayTeamId ||
      !formData.awayTeamId.value
    ) {
      throw new Error('Missing teamId formData')
    }
    const gameData = {
      ...formData,
      homeTeamId: formData.homeTeamId.value,
      awayTeamId: formData.awayTeamId.value,
    }

    setNewGameData(gameData)
    setTimeout(() => {
      setShowModal(false)
    }, 3000)
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
                            {...register('result')}
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
                            {...register('halftimeResult')}
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
                            {...register('date')}
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
                  onClick={() =>
                    gameData.gameId !== undefined &&
                    mutation.mutate({ gameId: gameData.gameId })
                  }
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
