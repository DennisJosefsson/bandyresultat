import { useForm, Controller, FormProvider, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getTeams } from '../../requests/teams'
import { getSearch } from '../../requests/games'
import { getLinkData } from '../../requests/link'

import Spinner from '../utilitycomponents/Components/Spinner'
import Select from 'react-select'
import { selectStyles } from '../utilitycomponents/Components/selectStyles'
import { ButtonComponent } from '../utilitycomponents/Components/ButtonComponents'
import ResultFormComponent from './Subcomponents/ResultFormComponent'
import OrderFormComponent from './Subcomponents/OrderFormComponent'
import SeasonFormComponent from './Subcomponents/SeasonFormComponent'
import PreferenceFormComponent from './Subcomponents/PreferenceFormComponent'
import ResultComponent from './Subcomponents/ResultComponent'
import SearchHelp from './Subcomponents/SearchFormModal'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'
import { ChevronDown } from '../utilitycomponents/Components/icons'
import { handleCopyClick } from '../utilitycomponents/functions/copyLinkFunctions'
import { SearchParamsObject, searchParamsObject } from '../types/games/search'
import { zodResolver } from '@hookform/resolvers/zod'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
import useMenuContext from '../../hooks/contextHooks/useMenuContext'

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
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>Fel: {message}</p>
            ))
          }
        />
      ))}
    </div>
  )
}

type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

const Search = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsObject | null>(
    null,
  )
  const [showResultForm, setShowResultForm] = useState<boolean>(false)
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false)
  const [showSeasonForm, setShowSeasonForm] = useState<boolean>(false)
  const [showPreferenceForm, setShowPreferenceForm] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('search')
  const [linkDataParams, setLinkDataParams] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [linkDataLoaded, setLinkDataLoaded] = useState<boolean>(false)
  const [linkError, setLinkError] = useState<ErrorState>({ error: false })

  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const methods = useForm<SearchParamsObject>({
    defaultValues: {
      categoryArray: [
        'final',
        'semi',
        'quarter',
        'eight',
        'regular',
        'qualification',
      ],
      order: { value: 'desc', label: 'Fallande' },
      limit: { value: 10, label: 10 },
      gameResult: 'all',
      goalsScored: null,
      goalsScoredOperator: { value: 'gte', label: 'Lika eller större än' },
      goalsConceded: null,
      goalsConcededOperator: { value: 'gte', label: 'Lika eller större än' },
      goalDiff: null,
      goalDiffOperator: { value: 'gte', label: 'Lika eller större än' },
      startSeason: 1907,
      endSeason: 2024,
      team: null,
      opponent: null,
      women: null,
      inputDate: null,
      date: null,
      selectedGender: 'all',
      homeGame: 'both',
      orderVar: { value: 'date', label: 'Datum' },
    },
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(searchParamsObject),
  })

  const { women, dispatch } = useGenderContext()

  const { open } = useMenuContext()
  const linkName = useParams().linkName
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: isTeamsError,
  } = useQuery('teams', getTeams)

  const { data: searchResult } = useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => getSearch(searchParams),
    enabled: !!searchParams,
  })

  const { data: linkData } = useQuery({
    queryKey: ['linkData', linkDataParams],
    queryFn: () => getLinkData(linkDataParams),
    enabled: !!linkDataParams,
  })

  useEffect(() => {
    methods.setValue('women', Boolean(women).toString())

    if (searchResult && searchResult.status === 400) {
      methods.setError('inputDate', {
        type: 'manual',
        message: searchResult.message,
      })
    }
    if (searchResult && searchResult.status === 404) {
      methods.setError('root.random', {
        type: 'random',
        message: searchResult.message,
      })
    }

    if (linkData && !linkData?.success) {
      methods.setError('root.random', {
        type: 'random',
        message: linkData.message,
      })
    } else if (linkData?.success && linkData.origin === 'compare') {
      setLinkError({ error: true, message: 'Felaktig länk, fel LänkId.' })
      setTimeout(() => {
        setLinkError({ error: false })
      }, 5000)
    } else if (
      linkData?.success &&
      linkData.origin === 'search' &&
      !linkDataLoaded
    ) {
      setSearchParams(linkData.searchString)
      methods.reset(linkData.searchString)
      setLinkDataLoaded(true)
    }
  }, [women, searchResult, methods, linkData, linkDataLoaded])

  useEffect(() => {
    const regex = /link\d{7,}/gm

    if (linkName && !linkName.match(regex)) {
      setLinkError({ error: true, message: 'Felaktig länk' })
      setTimeout(() => {
        setLinkError({ error: false })
      }, 5000)
    } else if (linkName) {
      setLinkDataParams(linkName)
    }
  }, [linkName, methods])

  if (isTeamsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (isTeamsError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
  }

  const collapse = () => {
    setShowOrderForm(false)
    setShowPreferenceForm(false)
    setShowResultForm(false)
    setShowSeasonForm(false)
  }

  const filteredTeams = teams.filter((team) => team.women === women)
  const filteredOpponents = teams.filter((team) => team.women === women)

  const teamSelection = filteredTeams.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  const opponentSelection = filteredOpponents.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  const onSubmit = (data) => setSearchParams(data)

  const gameArray = searchResult?.searchResult
    ?.filter((game, index, array) => {
      const gameIndex = array.findIndex((b) => game.gameId === b.gameId)
      return index === gameIndex
    })
    .map((game) => {
      return {
        homeTeam: game.homeGame ? game.lag : game.opp,
        awayTeam: game.homeGame ? game.opp : game.lag,
        homeTeamId: game.homeGame ? game.team : game.opponent,
        awayTeamId: game.homeGame ? game.opponent : game.team,
        result: game.game.result,
        date: game.date,
        qualification: game.qualificationGame,
      }
    })

  const searchTabBarObject = {
    genderClickFunction: () => {
      dispatch({ type: 'TOGGLE' })
      methods.reset()
    },
    tabBarArray: [
      {
        name: 'Sök',
        tabName: 'search',
        clickFunctions: () => setTab('search'),
      },
    ],
  }
  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const searchLink = `${baseUrl}/search/${searchResult?.searchLink[0].linkName}`

  return (
    <div
      className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]"
      ref={topRef}
    >
      <TabBarDivided
        tabBarObject={searchTabBarObject}
        tab={tab}
        setTab={setTab}
      />
      {!open && tab === 'search' && (
        <div className="mx-1 xl:mx-0">
          <div className="flex flex-row-reverse justify-between">
            <div className="flex max-h-[160px] flex-col gap-4">
              <div>
                <input
                  type="submit"
                  value="Sök"
                  form="search-form"
                  className="w-[72px] cursor-pointer truncate rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out first:last:px-1 hover:bg-slate-600 xs:w-[84px] xs:text-sm lg:w-[128px] lg:px-2 lg:py-1 lg:text-base"
                  onClick={() => collapse()}
                />
              </div>
              <ButtonComponent clickFunctions={() => methods.reset()}>
                Nollställ
              </ButtonComponent>
              {searchResult && (
                <ButtonComponent
                  clickFunctions={(event) =>
                    handleCopyClick(event, searchLink, setIsCopied)
                  }
                >
                  {isCopied ? 'Kopierad!' : `Länk: ${searchLink}`}
                </ButtonComponent>
              )}
            </div>
            <div className="ml-2 w-[70%] max-w-[800px] lg:ml-0 lg:w-full">
              <div>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    id="search-form"
                  >
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:justify-between">
                      <div className="flex max-w-[18rem] flex-col text-sm md:text-base">
                        <div>Välj lag</div>
                        <div>
                          <Controller
                            name="team"
                            control={methods.control}
                            render={({ field }) => (
                              <Select
                                placeholder="Lag"
                                {...field}
                                options={teamSelection}
                                styles={selectStyles}
                                isClearable
                                noOptionsMessage={() => 'Inga val'}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex max-w-[18rem] flex-col text-sm md:text-base">
                        <div>Välj motståndare</div>
                        <div>
                          <Controller
                            name="opponent"
                            control={methods.control}
                            render={({ field }) => (
                              <Select
                                placeholder="Lag"
                                {...field}
                                options={opponentSelection}
                                styles={selectStyles}
                                isClearable
                                noOptionsMessage={() => 'Inga val'}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {!showResultForm && (
                      <div
                        className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                        onClick={() => setShowResultForm(true)}
                      >
                        <div className="text-sm md:text-base">
                          Visa resultatformulär
                        </div>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    )}
                    {showResultForm && (
                      <ResultFormComponent
                        showResultForm={showResultForm}
                        setShowResultForm={setShowResultForm}
                      />
                    )}
                    {!showOrderForm && (
                      <div
                        className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                        onClick={() => setShowOrderForm(true)}
                      >
                        <div className="text-sm md:text-base">
                          Visa sorteringsval
                        </div>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    )}
                    {showOrderForm && (
                      <OrderFormComponent
                        showOrderForm={showOrderForm}
                        setShowOrderForm={setShowOrderForm}
                      />
                    )}
                    {!showSeasonForm && (
                      <div
                        className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                        onClick={() => setShowSeasonForm(true)}
                      >
                        <div className="text-sm md:text-base">
                          Visa säsongsinställningar
                        </div>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    )}
                    {showSeasonForm && (
                      <SeasonFormComponent
                        showSeasonForm={showSeasonForm}
                        setShowSeasonForm={setShowSeasonForm}
                      />
                    )}
                    {!showPreferenceForm && (
                      <div
                        className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                        onClick={() => setShowPreferenceForm(true)}
                      >
                        <div className="text-sm md:text-base">
                          Visa matchinställningar
                        </div>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    )}
                    {showPreferenceForm && (
                      <PreferenceFormComponent
                        setShowPreferenceForm={setShowPreferenceForm}
                        showPreferenceForm={showPreferenceForm}
                      />
                    )}
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
          <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
            <ErrorComponent errors={methods.formState.errors} />
            {linkError.error && (
              <div className="mb-2 rounded border-red-700 bg-white p-2 text-sm font-semibold text-red-700 md:text-base">
                {linkError.message}
              </div>
            )}
            {searchResult && searchResult.hits === 0 && (
              <div className="rounded bg-white p-2">
                <p className="">Din sökning gav inga träffar.</p>
              </div>
            )}
            {searchResult && <ResultComponent gameArray={gameArray} />}
          </div>
          <div ref={bottomRef}></div>
          {searchResult && (
            <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
              <div
                onClick={(event) => scrollTo(event, topRef)}
                className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
              >
                Scrolla upp
              </div>
              <div
                onClick={(event) => scrollTo(event, bottomRef)}
                className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
              >
                Scrolla ner
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'help' && <SearchHelp />}
    </div>
  )
}

export default Search
