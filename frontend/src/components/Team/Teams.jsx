import { useQuery, useMutation } from 'react-query'
import { useState, useReducer, useContext } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import { getSeasons } from '../../requests/seasons'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { GenderContext, UserContext } from '../../contexts/contexts'
import Select from 'react-select'
import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/spinner'
import TeamForm from './TeamForm'
import TeamsListHelpModal from './TeamsListHelpModal'
import ErrorToast from '../utilitycomponents/ErrorToast'

const selectStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? '#fff' : '#011d29',
    backgroundColor: state.isSelected ? '#011d29' : '#fff',
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: '#fff',
    color: '#011d29',
    padding: '2px',
    border: 'solid 1px',
    borderColor: '#011d29',
    borderRadius: 'none',
    boxShadow: 'none',
    width: '16rem',
    outline: 'none',
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    'input:focus': {
      boxShadow: 'none',
      borderColor: '#011d29',
    },
  }),
  container: (defaultStyles) => ({ ...defaultStyles, marginBottom: '6px' }),
}

const Teams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const { user } = useContext(UserContext)
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
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
    <div className="max-w-7xl min-h-screen mx-auto flex flex-row-reverse justify-between font-inter text-[#011d29]">
      <div className="w-64">
        <div>
          <div
            onClick={() => {
              compareDispatch({ type: 'CLEAR TEAMS' })
              genderDispatch({ type: 'TOGGLE' })
            }}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center mb-6"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
        <div>
          <div
            onClick={() => setShowHelpModal(true)}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center mb-6"
          >
            Hjälp/Info
          </div>
        </div>
        <form className="mb-6">
          <input
            className="border-[#011d29] focus:border-[#011d29] w-[16rem] text-[#011d29]"
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

        <div>
          {formState.teamArray.length > 0 && (
            <fieldset className="mb-2 flex flex-col  self-start">
              <legend className="font-bold underline underline-offset-2 mb-2">
                Matchkategorier
              </legend>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0 content-center"
                  type="checkbox"
                  id="final"
                  name="final"
                  value="final"
                  checked={formState.categoryArray.indexOf('final') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="final" className="pl-2">
                  Final
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="semi"
                  name="semi"
                  value="semi"
                  checked={formState.categoryArray.indexOf('semi') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="semi" className="pl-2">
                  Semifinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="quarter"
                  name="quarter"
                  value="quarter"
                  checked={formState.categoryArray.indexOf('quarter') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="quarter" className="pl-2">
                  Kvartsfinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="eight"
                  name="eight"
                  value="eight"
                  checked={formState.categoryArray.indexOf('eight') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="eight" className="pl-2">
                  Åttondelsfinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="regular"
                  name="regular"
                  value="regular"
                  checked={formState.categoryArray.indexOf('regular') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="regular" className="pl-2">
                  Grundserie
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="qualification"
                  name="qualification"
                  value="qualification"
                  checked={
                    formState.categoryArray.indexOf('qualification') > -1
                  }
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="qualification" className="pl-2">
                  Kval
                </label>
              </div>
            </fieldset>
          )}
          {formState.teamArray.length > 0 && (
            <Select
              placeholder={`Från ${startOptions[0].label}...`}
              value={startOptions.find(
                (season) => season.value === formState.startSeason
              )}
              options={startOptions}
              onChange={handleStartSeasonChange}
              styles={selectStyles}
              noOptionsMessage={() => 'Inga val'}
            />
          )}
          {formState.teamArray.length > 0 && (
            <Select
              placeholder={`...till ${endOptions[0].label}.`}
              value={endOptions.find(
                (season) => season.value === formState.endSeason
              )}
              options={endOptions}
              onChange={handleEndSeasonChange}
              styles={selectStyles}
              noOptionsMessage={() => 'Inga val'}
            />
          )}
          {formState.teamArray.length > 0 && (
            <h3 className="font-bold underline underline-offset-2">
              Valda lag
            </h3>
          )}
          {formState.teamArray.map((teamId) => {
            return (
              <div key={teamId} className="text-base">
                {
                  unFilteredTeams.find((team) => team.teamId === teamId)
                    .casualName
                }
              </div>
            )
          })}
          {formState.teamArray.length > 1 && formState.teamArray.length < 5 && (
            <button
              onClick={handleSubmit}
              className="bg-[#011d29] text-white px-4 py-1 rounded mt-6"
            >
              Jämför
            </button>
          )}
          {formState.teamArray.length > 4 && (
            <ErrorToast errortext="Välj max 4 lag" />
          )}
          {valueError.error && <ErrorToast errortext={valueError.message} />}
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
      </div>
      <div className="flex flex-row justify-between w-[50rem]">
        <div className="w-[48rem]">
          <h2 className="text-center font-bold text-2xl mb-6">
            {women ? 'Damer' : 'Herrar'}
          </h2>
          <div className="grid grid-cols-4 gap-8 text-[14px]">
            {teams.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="w-44 flex flex-row items-center rounded border-2 shadow px-2 py-1"
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
    </div>
  )
}

export default Teams
