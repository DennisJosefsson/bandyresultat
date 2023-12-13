import { useQuery } from 'react-query'
import { useState, useReducer, useContext, useEffect } from 'react'
import { getTeams } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useLocation, useParams } from 'react-router-dom'
import { GenderContext } from '../../contexts/contexts'

import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/Components/spinner'
import TeamsList from './Subcomponents/TeamsList'

import FormStateComponent from './Subcomponents/FormStateComponent'
import SearchSelection from './Subcomponents/SearchSelectionModal'
import Map from './Subcomponents/Map'
import Compare from '../Compare/Compare'
import Team from './Team'
import Help from './Subcomponents/Help'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'

const Teams = () => {
  const location = useLocation()
  const params = useParams()

  const { women, dispatch: genderDispatch } = useContext(GenderContext)

  const [tab, setTab] = useState('teams')
  const [teamId, setTeamId] = useState(null)

  const [stateNull, setStateNull] = useState(false)

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
      setTeamId(params.teamId)
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

  const teamsTabBarObject = {
    genderClickFunction: () => {
      genderDispatch({ type: 'TOGGLE' })
      compareDispatch({ type: 'RESET' })
      tab !== 'map' && setTab('teams')
    },
    helpClickFunction: () => setTab('help'),
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
        clickFunctions: (event) => handleSubmit(event),
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
          valueError={valueError}
          setValueError={setValueError}
          unFilteredTeams={unFilteredTeams}
          dispatch={compareDispatch}
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
          valueError={valueError}
          setValueError={setValueError}
          unFilteredTeams={unFilteredTeams}
          dispatch={compareDispatch}
        />
      )
      break
    case 'compare':
      pageContent = (
        <Compare compObject={formState} origin={location.state?.origin} />
      )
      break
    case 'singleTeam':
      pageContent = <Team teamId={teamId} />
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
          valueError={valueError}
          setValueError={setValueError}
          unFilteredTeams={unFilteredTeams}
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
