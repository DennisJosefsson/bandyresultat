const initialState = []

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem('favTeams')) || initialValue

export const favTeamsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEAM':
      return state.find((team) => team === action.teamId)
        ? state
        : [...state, action.teamId]

    case 'REMOVE_TEAM':
      return state.filter((team) => team !== action.teamId)

    case 'CLEAR_TEAMS':
      return initialState

    default:
      return state
  }
}

export const addToFavTeams = (teamId) => ({
  type: 'ADD_TEAM',
  teamId,
})

export const removeFromFavTeams = (teamId) => ({
  type: 'REMOVE_TEAM',
  teamId,
})

export const clearTeams = () => ({
  type: 'CLEAR_TEAMS',
})
