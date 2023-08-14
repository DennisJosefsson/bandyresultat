import { useQuery, useMutation } from 'react-query'
import { useState, useReducer, useContext } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'

import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/spinner'
import TeamForm from './TeamForm'
import TeamsListHelpModal from './TeamsListHelpModal'
import SearchSelectionModal from './SearchSelectionModal'
import ErrorToast from '../utilitycomponents/ErrorToast'

const Teams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const { user } = useContext(UserContext)
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showSearchSelectionModal, setShowSearchSelectionModal] =
    useState(false)
  const [teamFilter, setTeamFilter] = useState('')
  const [valueError, setValueError] = useState('')
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
      }

  const [formState, compareDispatch] = useReducer(
    teamArrayFormReducer,
    initState
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

  if (isLoading || isSeasonsLoading) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || seasonError) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
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
      navigate('/compare', { state: { compObject: formState } })
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
      team.name.toLowerCase().includes(teamFilter.toLowerCase())
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
    <div className="max-w-7xl min-h-screen px-1 lg:px-0 mb-2 mx-auto font-inter text-[#011d29]">
      <div className="w-full">
        <form>
          <input
            className="w-full border-[#011d29] focus:border-[#011d29] text-[#011d29]"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) =>
              setTeamFilter(
                event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, '')
              )
            }
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
      <div className="w-full flex flex-row justify-start items-center pt-2 text-xs lg:text-xl">
        {formState.teamArray.length > 0 && (
          <h3 className="font-bold mx-2">Valda lag:</h3>
        )}
        {formState.teamArray.map((teamId) => {
          return (
            <div
              key={teamId}
              className="bg-slate-300 rounded-md lg:rounded-0 px-1 py-0.5 text-center mr-3 lg:px-2 lg:py-1"
            >
              {unFilteredTeams.find((team) => team.teamId === teamId).shortName}
            </div>
          )
        })}
      </div>
      <div className=" flex flex-row-reverse justify-between">
        <div className="w-1/4 pt-2 mr-1 flex flex-col md:flex-row-reverse">
          <div className="flex flex-col items-end w-full lg:w-3/4 pr-0.5 lg:p-0 float-right">
            <div
              onClick={() => {
                compareDispatch({ type: 'CLEAR TEAMS' })
                genderDispatch({ type: 'TOGGLE' })
              }}
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6"
            >
              {women ? 'Herrar' : 'Damer'}
            </div>
            <div
              onClick={() => setShowHelpModal(true)}
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6"
            >
              Hjälp/Info
            </div>
            <div>
              {formState.teamArray.length > 1 && (
                <div
                  onClick={() => setShowSearchSelectionModal(true)}
                  className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6"
                >
                  Sökval
                </div>
              )}
            </div>
            {formState.teamArray.length > 1 &&
              formState.teamArray.length < 5 && (
                <div
                  onClick={handleSubmit}
                  className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6"
                >
                  Jämför
                </div>
              )}
          </div>

          {formState.teamArray.length > 4 && (
            <ErrorToast errortext="Välj max 4 lag" />
          )}
          {valueError.error && <ErrorToast errortext={valueError.message} />}
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
          {showHelpModal ? (
            <>
              <TeamsListHelpModal setShowModal={setShowHelpModal} />
            </>
          ) : null}
          {showSearchSelectionModal ? (
            <>
              <SearchSelectionModal
                setShowModal={setShowSearchSelectionModal}
                formState={formState}
                handleCategoryArrayChange={handleCategoryArrayChange}
                handleEndSeasonChange={handleEndSeasonChange}
                handleStartSeasonChange={handleStartSeasonChange}
                endOptions={endOptions}
                startOptions={startOptions}
              />
            </>
          ) : null}
        </div>
        <div className="w-2/3 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2 justify-between pt-2">
          {teams.map((team) => {
            return (
              <div
                key={team.teamId}
                className="flex flex-row justify-between items-center text-[1.125rem] bg-white px-2 py-1"
              >
                <Link to={`/teams/${team.teamId}`}>
                  <div className="w-32">{team.casualName}</div>
                </Link>
                <div className="w-6 pl-4 pr-4">
                  <input
                    type="checkbox"
                    id={team.teamId}
                    checked={formState.teamArray.includes(team.teamId)}
                    onChange={(event) =>
                      handleTeamArrayChange(event, team.teamId)
                    }
                    className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Teams
