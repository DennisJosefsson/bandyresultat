import { useQuery, useMutation } from 'react-query'
import { useState, useReducer, useContext, useRef } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'

import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/spinner'
import TeamForm from './TeamForm'
import TeamsListHelpModal from './TeamsListHelpModal'
import SearchSelectionModal from './SearchSelectionModal'

const Teams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const topRef = useRef()
  const bottomRef = useRef()
  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const { user } = useContext(UserContext)
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showSearchSelectionModal, setShowSearchSelectionModal] =
    useState(false)
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

  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
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
    <div
      ref={topRef}
      className="max-w-7xl min-h-screen px-1 lg:px-0 mb-2 mx-auto font-inter text-[#011d29]"
    >
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
      <div className="w-full flex flex-row justify-start items-center pt-2 text-xs lg:text-xl h-10 my-2">
        <div>
          {formState.teamArray.length < 5 && !valueError.error && (
            <h3 className="font-bold mx-2">Valda lag:</h3>
          )}
        </div>
        {formState.teamArray.length < 5 && !valueError.error && (
          <div className="flex flex-row justify-start items-center text-xs lg:text-xl">
            {formState.teamArray.map((teamId) => {
              return (
                <div
                  key={teamId}
                  className="bg-slate-300 rounded-md lg:rounded-0 px-1 py-0.5 text-center mr-3 lg:px-2 lg:py-1"
                >
                  {
                    unFilteredTeams.find((team) => team.teamId === teamId)
                      .shortName
                  }
                </div>
              )
            })}
          </div>
        )}

        {formState.teamArray.length > 4 &&
          formState.categoryArray.length > 0 && (
            <div
              className="w-1/3 mb-1 rounded-lg bg-[#FED7AA] px-1 py-0.5 lg:px-2 lg:py-1 font-bold text-xs lg:text-xl text-warning-800  text-center mr-2"
              role="alert"
            >
              Välj max 4 lag.
            </div>
          )}

        {valueError.error && (
          <div
            className="flex flex-row justify-between items-center mb-1 rounded-lg bg-[#FED7AA] px-1 py-0.5 lg:px-2 lg:py-1 font-bold text-xs lg:text-xl text-warning-800 text-center mr-2"
            role="alert"
          >
            <div>{valueError.message}</div>
            <div>
              <button
                type="button"
                className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-alert-dismiss
                aria-label="Close"
                onClick={() => setValueError(false)}
              >
                <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" flex flex-row-reverse justify-between mb-6">
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
                compareDispatch={compareDispatch}
                women={women}
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
      <div ref={bottomRef}></div>
      <div className="sticky bottom-0 flex flex-row gap-2 justify-center bg-[#f4f5f5] z-20 items-center">
        <div
          onClick={(event) => scrollTo(event, topRef)}
          className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#93B8C1] text-[10px] lg:text-sm text-[#011d29] text-center my-2 select-none"
        >
          Scrolla upp
        </div>
        <div
          onClick={(event) => scrollTo(event, bottomRef)}
          className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#93B8C1] text-[10px] lg:text-sm text-[#011d29] text-center my-2 select-none"
        >
          Scrolla ner
        </div>
      </div>
    </div>
  )
}

export default Teams
