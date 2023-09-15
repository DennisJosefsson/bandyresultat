import { useForm, Controller, FormProvider } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useQuery } from 'react-query'
import { useState, useContext, useEffect, useRef } from 'react'
import { getTeams } from '../../requests/teams'
import { getSearch } from '../../requests/games'
import { GenderContext } from '../../contexts/contexts'
import Spinner from '../utilitycomponents/spinner'
import Select from 'react-select'
import { selectStyles } from '../utilitycomponents/selectStyles'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'
import { ButtonComponent } from '../utilitycomponents/ButtonComponents'
import ResultFormComponent from './ResultFormComponent'
import OrderFormComponent from './OrderFormComponent'
import SeasonFormComponent from './SeasonFormComponent'
import PreferenceFormComponent from './PreferenceFormComponent'
import SearchFormModal from './SearchFormModal'
import { ChevronDown } from '../utilitycomponents/icons'

import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

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

const Search = () => {
  const [searchParams, setSearchParams] = useState(null)
  const [showResultForm, setShowResultForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showSeasonForm, setShowSeasonForm] = useState(false)
  const [showPreferenceForm, setShowPreferenceForm] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const topRef = useRef()
  const bottomRef = useRef()
  const methods = useForm({
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
      startSeason: '1907',
      endSeason: '2024',
      operator: { value: 'gte', label: 'Lika eller större än' },
      team: '',
      opponent: '',
      women: '',
      inputDate: '',
      date: '',
      selectedGender: 'all',
      homeGame: 'both',
      orderVar: { value: 'date', label: 'Datum' },
    },
    criteriaMode: 'all',
    mode: 'onBlur',
  })

  const { women, dispatch } = useContext(GenderContext)

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

  useEffect(() => {
    methods.setValue('women', women)

    if (searchResult && searchResult.status === 400) {
      methods.setError('inputDate', {
        type: 'manual',
        message: searchResult.message,
      })
    }
  }, [women, searchResult, methods])

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
        result: game.game.result,
        date: game.date,
        qualification: game.qualificationGame,
      }
    })

  return (
    <div
      className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="flex flex-row-reverse justify-between">
        <div>
          <GenderButtonComponent
            women={women}
            clickFunctions={() => {
              methods.setValue('team', '')
              methods.setValue('opponent', '')

              dispatch({ type: 'TOGGLE' })
            }}
          />
          <ButtonComponent clickFunctions={() => setShowHelpModal(true)}>
            Hjälp/Info
          </ButtonComponent>
          <div>
            <input
              type="submit"
              value="Sök"
              form="search-form"
              className="mb-4 mt-2 w-[84px] cursor-pointer truncate rounded-md bg-[#011d29] py-0.5 text-center text-sm text-white transition-all duration-150 ease-in-out first:last:px-1 hover:bg-slate-600 lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
            />
          </div>
        </div>
        <div className="ml-2 w-[70%] max-w-[800px] lg:ml-0 lg:w-full">
          <div>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} id="search-form">
                <div className="grid grid-cols-1 gap-2 p-1 lg:grid-cols-3 lg:justify-between">
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
      <div className="ml-2 w-[22rem] max-w-[800px] md:w-full lg:ml-0">
        <ErrorComponent errors={methods.formState.errors} />

        {searchResult && searchResult.hits === 0 && (
          <div className="rounded bg-white">
            <p className="ml-5">Din sökning gav inga träffar.</p>
          </div>
        )}
        {searchResult && (
          <div>
            {gameArray?.map((game, index) => {
              return (
                <div className="recordCard" key={`${game.date}-${index}`}>
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">
                        {game.homeTeam.casualName}-{game.awayTeam.casualName}
                      </div>
                      <div className="count">{game.result}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">
                        {game.date && (
                          <span className="mr-1">
                            {dayjs(game.date).format('D MMMM YYYY')}
                          </span>
                        )}
                        {game.qualification && <span>(K)</span>}
                        {!game.date && (
                          <span className="invisible">Gömt datum </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
      {showHelpModal ? (
        <>
          <SearchFormModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
    </div>
  )
}

export default Search
