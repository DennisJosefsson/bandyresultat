import { useQuery, useMutation } from 'react-query'
import { useState, useReducer, useContext } from 'react'
import { getTeams, postTeam } from '../../requests/teams'
import { useNavigate, Link } from 'react-router-dom'
import { GenderContext } from '../../contexts/contexts'
import teamArrayFormReducer from '../../reducers/teamSeasonFormReducer'
import Spinner from '../utilitycomponents/spinner'
import TeamForm from './TeamForm'

const Teams = () => {
  const navigate = useNavigate()
  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const [showTeamFormModal, setShowTeamFormModal] = useState(false)
  const [teamFilter, setTeamFilter] = useState('')
  const initState = []

  const [formState, teamDispatch] = useReducer(teamArrayFormReducer, initState)

  const { data, isLoading, error } = useQuery(['teams'], getTeams)

  const teamFormMutation = useMutation({
    mutationFn: postTeam,
  })

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <div className="max-w-6xl mx-auto"> There was an error</div>
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/compare', { state: { teamArray: formState } })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleChange = (event, teamId) => {
    if (event.target.checked) {
      teamDispatch({
        type: 'ADD TEAM',
        payload: Number(teamId),
      })
    } else {
      teamDispatch({
        type: 'REMOVE TEAM',
        payload: Number(teamId),
      })
    }
  }

  const teams = data
    .filter((team) => team.women === women)
    .filter((team) =>
      team.name.toLowerCase().includes(teamFilter.toLowerCase())
    )
  return (
    <div className="max-w-7xl min-h-screen mx-auto flex flex-row-reverse justify-between font-inter text-[#011d29]">
      <div className="w-64">
        <div>
          <div
            onClick={() => {
              teamDispatch({ type: 'CLEAR' })
              genderDispatch({ type: 'TOGGLE' })
            }}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
        <form className="mb-6">
          <input
            className="border-[#011d29] focus:border-[#011d29]"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) => setTeamFilter(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
        <div className="text-left">
          <p className="text-sm mb-4">
            Filtrera antal lag genom att skriva i textfältet.
          </p>
          <p className="text-sm mb-4">
            Klicka på lagnamn för att se information om det laget.
          </p>
          <p className="text-sm mb-4">
            Klicka i rutan för att välja ut lag att jämföra.
          </p>
        </div>
        <div>
          {formState.length > 0 && <h3 className="underline">Valda lag</h3>}

          {formState.map((teamId) => {
            return (
              <div key={teamId} className="text-base">
                {teams.find((team) => team.teamId === teamId).casualName}
              </div>
            )
          })}
          {formState.length > 1 && formState.length < 5 && (
            <button
              onClick={handleSubmit}
              className="bg-slate-600 text-white px-4 py-1 rounded mt-6"
            >
              Jämför
            </button>
          )}
          {formState.length > 4 ? (
            <h4 className="text-red-600 mt-6">Välj max 4 lag</h4>
          ) : (
            ''
          )}
        </div>
        <p className="text-sm">
          <button onClick={() => setShowTeamFormModal(true)}>
            Lägg till lag
          </button>
        </p>
        {showTeamFormModal ? (
          <>
            <TeamForm
              mutation={teamFormMutation}
              setShowModal={setShowTeamFormModal}
            />
          </>
        ) : null}
      </div>
      <div className="flex flex-row justify-between w-[50rem]">
        <div className="w-[48rem]">
          <h2 className="text-center font-bold text-xl mb-6">
            {women ? 'Damer' : 'Herrar'}
          </h2>
          <div className="grid grid-cols-4 gap-2 text-[14px]">
            {teams.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="w-48 flex flex-row items-center"
                >
                  <div className="w-36">
                    <Link to={`/teams/${team.teamId}`}>{team.casualName}</Link>
                  </div>
                  <div className="w-12 pl-4">
                    <input
                      type="checkbox"
                      id={team.teamId}
                      onChange={(event) => handleChange(event, team.teamId)}
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
