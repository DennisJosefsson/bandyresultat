import { useQuery, useMutation } from 'react-query'
import { useState, useReducer, useContext, useEffect } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useLocation, useParams } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'

import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/spinner'
import TeamsList from './TeamsList'
import TeamForm from './TeamForm'
import FormStateComponent from './FormStateComponent'
import SearchSelection from './SearchSelectionModal'
import Map from './Map'
import Compare from '../Compare/Compare'
import Team from './Team'
import Help from './Help'

import {
  ListIcon,
  MapIcon,
  ManIcon,
  WomanIcon,
  SearchIcon,
  SelectionIcon,
  QuestionIcon,
} from '../utilitycomponents/icons'

const Teams = () => {
  const location = useLocation()
  const params = useParams()

  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const { user } = useContext(UserContext)

  const [tab, setTab] = useState('teams')
  const [teamId, setTeamId] = useState(null)
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)

  const [teamFilter, setTeamFilter] = useState('')
  const [valueError, setValueError] = useState({ error: false })
  const initState = location.state
    ? location.state.compObject
    : {
        teamArray: [],
        categoryArray: [
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ],
        startSeason: '',
        endSeason: '',
        women: women,
      }

  const [formState, compareDispatch] = useReducer(
    teamArrayFormReducer,
    initState,
  )

  const { data, isLoading, error } = useQuery(['teams'], getTeams)
  const {
    data: unFilteredSeasons,
    isLoading: isSeasonsLoading,
    error: seasonError,
  } = useQuery(['seasons'], getSeasons)

  const teamFormMutation = useMutation({
    mutationFn: postTeam,
  })

  useEffect(() => {
    if (location.state) {
      genderDispatch({
        type: 'SET',
        payload: location.state.compObject.women
          ? location.state.compObject.women
          : women,
      })
      setTab('compare')
    }
    if (params.teamId) {
      setTeamId(params.teamId)
      setTab('singleTeam')
    }
  }, [location.state, params.teamId, genderDispatch, women])

  if (isLoading || isSeasonsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || seasonError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formState.startSeason === '') {
      formState.startSeason = seasons.pop().seasonId
    }
    if (formState.endSeason === '') {
      formState.endSeason = seasons.shift().seasonId
    }
    if (formState.endSeason < formState.startSeason) {
      setValueError({
        error: true,
        message: 'Bortre säsongsval lägre än undre val.',
      })
    } else if (formState.categoryArray.length === 0) {
      setValueError({
        error: true,
        message: 'Måste ange minst en matchkategori.',
      })
    } else {
      setTab('compare')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleTeamArrayChange = (event, teamId) => {
    if (event.target.checked) {
      compareDispatch({
        type: 'ADD TEAM',
        payload: Number(teamId),
      })
    } else {
      compareDispatch({
        type: 'REMOVE TEAM',
        payload: Number(teamId),
      })
    }
  }

  const handleCategoryArrayChange = (event) => {
    if (event.target.checked) {
      compareDispatch({
        type: 'ADD CATEGORY',
        payload: event.target.value,
      })
    } else {
      compareDispatch({
        type: 'REMOVE CATEGORY',
        payload: event.target.value,
      })
    }
  }

  const handleStartSeasonChange = (event) => {
    compareDispatch({
      type: 'INPUT START',
      payload: event.value,
    })
  }

  const handleEndSeasonChange = (event) => {
    compareDispatch({
      type: 'INPUT END',
      payload: event.value,
    })
  }

  const teams = data
    .filter((team) => team.women === women)
    .filter((team) =>
      team.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

  const seasons = unFilteredSeasons.filter((season) => season.women === women)
  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const endOptions = seasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const unFilteredTeams = data

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0">
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'teams'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('teams')}
          >
            Laglista
          </div>

          <div
            className={`${
              tab === 'map'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('map')}
          >
            Lagkarta
          </div>
          {formState.teamArray.length > 1 && (
            <div
              className={`${
                tab === 'selection'
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
              onClick={() => setTab('selection')}
            >
              Sökval
            </div>
          )}
          {formState.teamArray.length > 1 && formState.teamArray.length < 5 && (
            <div
              className={`${
                tab === 'compare'
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
              onClick={handleSubmit}
            >
              Jämför
            </div>
          )}
        </div>
        <div className="flex flex-row xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'help'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('help')}
          >
            Hjälp/Info
          </div>
          <div
            className="cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors"
            onClick={() => {
              genderDispatch({ type: 'TOGGLE' })
              compareDispatch({ type: 'RESET' })
              setTab('teams')
            }}
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        <div className="flex flex-row justify-start xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'teams'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('teams')}
          >
            <ListIcon />
          </div>

          <div
            className={`${
              tab === 'map'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('map')}
          >
            <MapIcon />
          </div>
          {formState.teamArray.length > 1 && (
            <div
              className={`${
                tab === 'selection'
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
              onClick={() => setTab('selection')}
            >
              <SelectionIcon />
            </div>
          )}
          {formState.teamArray.length > 1 && formState.teamArray.length < 5 && (
            <div
              className={`${
                tab === 'compare'
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
              onClick={handleSubmit}
            >
              <SearchIcon />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'help'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('help')}
          >
            <QuestionIcon />
          </div>

          <div
            className="cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200"
            onClick={() => {
              genderDispatch({ type: 'TOGGLE' })
              compareDispatch({ type: 'RESET' })
              setTab('teams')
            }}
          >
            {women ? <ManIcon /> : <WomanIcon />}
          </div>
        </div>
      </div>
      {(tab === 'teams' || tab === 'map') && (
        <div className="mt-2 w-full">
          <form>
            <input
              className="w-full border-[#011d29] text-[#011d29] focus:border-[#011d29]"
              type="text"
              placeholder="Filter"
              value={teamFilter}
              name="teamFilter"
              onChange={(event) =>
                setTeamFilter(
                  event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ''),
                )
              }
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      )}

      <div>
        {user && (
          <p className="text-sm">
            <button onClick={() => setShowTeamFormModal(true)}>
              Lägg till lag
            </button>
          </p>
        )}
        {showTeamFormModal ? (
          <>
            <TeamForm
              mutation={teamFormMutation}
              setShowModal={setShowTeamFormModal}
            />
          </>
        ) : null}
        {(tab === 'teams' || tab === 'map' || tab === 'selection') && (
          <FormStateComponent
            valueError={valueError}
            setValueError={setValueError}
            formState={formState}
            unFilteredTeams={unFilteredTeams}
            dispatch={compareDispatch}
            setTab={setTab}
            tab={tab}
          />
        )}
        {tab === 'teams' && (
          <TeamsList
            teams={teams}
            handleTeamArrayChange={handleTeamArrayChange}
            formState={formState}
            setTab={setTab}
            setTeamId={setTeamId}
            valueError={valueError}
            setValueError={setValueError}
            unFilteredTeams={unFilteredTeams}
            dispatch={compareDispatch}
          />
        )}
        {tab === 'map' && (
          <Map
            teams={teams}
            handleTeamArrayChange={handleTeamArrayChange}
            formState={formState}
            setTab={setTab}
            setTeamId={setTeamId}
            valueError={valueError}
            setValueError={setValueError}
            unFilteredTeams={unFilteredTeams}
            dispatch={compareDispatch}
          />
        )}
        {tab === 'compare' && (
          <Compare compObject={formState} origin={location.state?.origin} />
        )}
        {tab === 'singleTeam' && <Team teamId={teamId} />}
        {tab === 'help' && <Help />}
        {tab === 'selection' && (
          <SearchSelection
            formState={formState}
            handleCategoryArrayChange={handleCategoryArrayChange}
            handleEndSeasonChange={handleEndSeasonChange}
            handleStartSeasonChange={handleStartSeasonChange}
            endOptions={endOptions}
            startOptions={startOptions}
            dispatch={compareDispatch}
            women={women}
            valueError={valueError}
            setValueError={setValueError}
            unFilteredTeams={unFilteredTeams}
          />
        )}
      </div>
    </div>
  )
}

export default Teams
