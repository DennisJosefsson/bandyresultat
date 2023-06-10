const teamSeasonFormReducer = (state, action) => {
  switch (action.type) {
    case 'ADD TEAM':
      if (state.includes(action.payload)) {
        return state
      }
      return [...state, action.payload]
    case 'REMOVE TEAM': {
      return state.filter((teamId) => teamId !== action.payload)
    }
    case 'CLEAR': {
      return []
    }
    default:
      return state
  }
}

export default teamSeasonFormReducer
