import { useQuery } from 'react-query'
import {
  useState,
  useReducer,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
} from 'react'
import { getTeams } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useLocation, useParams } from 'react-router-dom'

import teamArrayFormReducer from '../../reducers/compareReducer'
import Spinner from '../utilitycomponents/Components/Spinner'
import TeamsList from './Subcomponents/TeamsList'

import FormStateComponent from './Subcomponents/FormStateComponent'
import SearchSelection from './Subcomponents/SearchSelectionModal'
import Map from './Subcomponents/Map'
import Compare from '../Compare/Compare'
import Team from './Team'
import Help from './Subcomponents/Help'
import {
  TabBarDivided,
  TabBarObject,
} from '../utilitycomponents/Components/TabBar'
import { compareTeamsSeasonId, teamIdFromParams } from '../types/teams/teams'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'

type ValueErrorType = { error: false } | { error: true; message: string }

const Teams = () => {
  const location = useLocation()
  const params = useParams()

  const { women, dispatch: genderDispatch } = useGenderContext()

  const [tab, setTab] = useState<string>('teams')
  const [teamId, setTeamId] = useState<number | null>(null)

  const [stateNull, setStateNull] = useState<boolean>(false)

  const [teamFilter, setTeamFilter] = useState<string>('')
  const [valueError, setValueError] = useState<ValueErrorType>({ error: false })
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
        startSeason: null,
        endSeason: null,
        women: women,
      }

  const [formState, compareDispatch] = useReducer(
    teamArrayFormReducer,
    initState,
  )

  const {
    data,
    isLoading,
    error,
    isSuccess: isTeamsSuccess,
  } = useQuery(['teams'], getTeams)
  const {
    data: unFilteredSeasons,
    isLoading: isSeasonsLoading,
    error: seasonError,
    isSuccess: isSeasonSuccess,
  } = useQuery(['seasons'], getSeasons)

  useEffect(() => {
    if (location.state && !stateNull) {
      genderDispatch({
        type: 'SET',
        payload: location.state.compObject.women
          ? location.state.compObject.women
          : women,
      })
      setStateNull(true)
      setTab('compare')
    }
    if (params.teamId) {
      const teamId = teamIdFromParams.safeParse(params.teamId)
      if (!teamId.success) {
        throw new Error(teamId.error.message)
      }
      setTeamId(teamId.data)
      setTab('singleTeam')
    }
  }, [location.state, params.teamId, genderDispatch, women, stateNull])

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

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (formState.startSeason === null) {
      const seasonObject = seasons.pop()
      if (seasonObject && seasonObject.seasonId)
        formState.startSeason = seasonObject.seasonId
    }
    if (formState.endSeason === null) {
      const seasonObject = seasons.shift()

      if (seasonObject && seasonObject.seasonId)
        formState.endSeason = seasonObject.seasonId
    }
    if (
      formState.endSeason &&
      formState.startSeason &&
      formState.endSeason < formState.startSeason
    ) {
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleTeamArrayChange = (
    event: ChangeEvent<HTMLInputElement>,
    teamId: number,
  ) => {
    if (event.target.checked) {
      compareDispatch({
        type: 'ADD TEAM',
        payload: teamId,
      })
    } else {
      compareDispatch({
        type: 'REMOVE TEAM',
        payload: teamId,
      })
    }
  }

  const handleCategoryArrayChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleStartSeasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const seasonId = compareTeamsSeasonId.safeParse(event.target.value)
    if (!seasonId.success) {
      throw new Error(seasonId.error.message)
    }
    compareDispatch({
      type: 'INPUT START',
      payload: seasonId.data,
    })
  }

  const handleEndSeasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const seasonId = compareTeamsSeasonId.safeParse(event.target.value)
    if (!seasonId.success) {
      throw new Error(seasonId.error.message)
    }
    compareDispatch({
      type: 'INPUT END',
      payload: seasonId.data,
    })
  }

  const teams = isTeamsSuccess
    ? data
        .filter((team) => team.teamId !== 176)
        .filter((team) => team.women === women)
        .filter((team) =>
          team.name.toLowerCase().includes(teamFilter.toLowerCase()),
        )
    : []

  const seasons = isSeasonSuccess
    ? unFilteredSeasons.filter((season) => season.women === women)
    : []
  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const endOptions = seasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const unFilteredTeams = data

  const teamsTabBarObject: TabBarObject = {
    genderClickFunction: () => {
      genderDispatch({ type: 'TOGGLE' })
      compareDispatch({ type: 'RESET', payload: !women })
      tab !== 'map' && setTab('teams')
    },
    tabBarArray: [
      {
        name: 'Laglista',
        tabName: 'teams',
        clickFunctions: () => setTab('teams'),
        conditional: true,
      },
      {
        name: 'Lagkarta',
        tabName: 'map',
        clickFunctions: () => setTab('map'),
        conditional: true,
      },
      {
        name: 'Sökval',
        tabName: 'selection',
        clickFunctions: () => setTab('selection'),
        conditional: 'formStateSimple',
      },
      {
        name: 'Jämför',
        tabName: 'compare',
        clickFunctions: handleSubmit,
        conditional: 'formStateComplex',
      },
    ]
      .filter((item) => {
        if (formState.teamArray.length < 2) {
          if (item.conditional !== 'formStateSimple') return item
        } else {
          return item
        }
      })
      .filter((item) => {
        if (formState.teamArray.length < 2 || formState.teamArray.length > 4) {
          if (item.conditional !== 'formStateComplex') return item
        } else {
          return item
        }
      }),
  }

  let pageContent
  switch (tab) {
    case 'teams':
      pageContent = (
        <TeamsList
          teams={teams}
          handleTeamArrayChange={handleTeamArrayChange}
          formState={formState}
          setTab={setTab}
          setTeamId={setTeamId}
        />
      )
      break
    case 'map':
      pageContent = (
        <Map
          teams={teams}
          handleTeamArrayChange={handleTeamArrayChange}
          formState={formState}
          setTab={setTab}
          setTeamId={setTeamId}
        />
      )
      break
    case 'compare':
      pageContent = (
        <Compare compObject={formState} origin={location.state?.origin} />
      )
      break
    case 'singleTeam':
      if (teamId) pageContent = <Team teamId={teamId} />
      else pageContent = <div>Något gick fel, tom sida</div>
      break
    case 'help':
      pageContent = <Help />
      break
    case 'selection':
      pageContent = (
        <SearchSelection
          formState={formState}
          handleCategoryArrayChange={handleCategoryArrayChange}
          handleEndSeasonChange={handleEndSeasonChange}
          handleStartSeasonChange={handleStartSeasonChange}
          endOptions={endOptions}
          startOptions={startOptions}
          dispatch={compareDispatch}
          women={women}
        />
      )
      break
    default:
      pageContent = <div>Något gick fel, tom sida</div>
  }

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0">
      <TabBarDivided
        tabBarObject={teamsTabBarObject}
        tab={tab}
        setTab={setTab}
      />
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
        {pageContent}
      </div>
    </div>
  )
}

export default Teams
