import { useReducer } from 'react'
import metadataFormReducer from '../../reducers/metadataFormReducer'

const initFunction = (seasonId, name) => {
  return {
    seasonId: seasonId,
    name: '',
    year: name,
    winnerId: null,
    winnerName: '',
    hostCity: '',
    finalDate: '',
    northSouth: false,
    multipleGroupStages: false,
    eight: false,
    quarter: true,
    semi: true,
    final: true,
    comment: '',
  }
}

const MetadataForm = ({ seasonId, name, teams }) => {
  const teamSelection = teams.map((team) => {
    return { value: { name: team.name, teamId: team.teamId }, label: team.name }
  })

  // const initialState = {
  //   seasonId: seasonId,
  //   name: '',
  //   year: name,
  //   winnerId: null,
  //   winnerName: '',
  //   hostCity: '',
  //   finalDate: '',
  //   northSouth: false,
  //   multipleGroupStages: false,
  //   eight: false,
  //   quarter: true,
  //   semi: true,
  //   final: true,
  //   comment: '',
  // }

  const [formState, dispatch] = useReducer(
    metadataFormReducer,
    initFunction(seasonId, name)
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    return null
  }

  const handleChange = (event) => {
    if (event.target.name === 'winnerName') {
      dispatch({
        type: 'INPUT',
        field: 'winnerId',
        payload: teamSelection[event.target.value].value.teamId,
      })
      dispatch({
        type: 'INPUT',
        field: event.target.name,
        payload: teamSelection[event.target.value].value.name,
      })
    } else {
      dispatch({
        type: 'INPUT',
        field: event.target.name,
        payload: event.target.value,
      })
    }
  }

  console.log(formState)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">
              Serienamn:
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={(event) => handleChange(event)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="winnerName">
              SM-guld:
              <select
                name="winnerName"
                id="winnerName"
                value={formState.winnerName}
                onChange={(event) => handleChange(event)}
              >
                {teamSelection.map((team, index) => {
                  return (
                    <option key={team.value.teamId} value={index}>
                      {team.label}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="hostCity">
              Finalstad:
              <input
                type="text"
                name="hostCity"
                value={formState.hostCity}
                onChange={(event) => handleChange(event)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="finalDate">
              Finaldatum:
              <input
                type="text"
                name="finalDate"
                value={formState.finalDate}
                onChange={(event) => handleChange(event)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="northSouth">
              Norr- och södergrupp?
              <input
                type="checkbox"
                name="northSouth"
                value={formState.northSouth}
                onChange={() => dispatch({ type: 'TOGGLE NORTHSOUTH' })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="multipleGroupStages">
              Dubbla gruppspel?
              <input
                type="checkbox"
                name="multipleGroupStages"
                value={formState.multipleGroupStages}
                onChange={() =>
                  dispatch({ type: 'TOGGLE MULTIPLEGROUPSTAGES' })
                }
              />
            </label>
          </div>
          <div>
            <label htmlFor="eight">
              Åttondelsfinal?
              <input
                type="checkbox"
                name="eight"
                value={formState.eight}
                onChange={() => dispatch({ type: 'TOGGLE EIGHT' })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="quarter">
              Kvartsfinal?
              <input
                type="checkbox"
                name="quarter"
                value={formState.quarter}
                onChange={() => dispatch({ type: 'TOGGLE QUARTER' })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="semi">
              Semifinal?
              <input
                type="checkbox"
                name="semi"
                value={formState.semi}
                onChange={() => dispatch({ type: 'TOGGLE SEMI' })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="final">
              Final?
              <input
                type="checkbox"
                name="final"
                value={formState.final}
                onChange={() => dispatch({ type: 'TOGGLE FINAL' })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="comment">
              Kommentar:
              <input
                type="textarea"
                name="comment"
                value={formState.comment}
                onChange={(event) => handleChange(event)}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MetadataForm
