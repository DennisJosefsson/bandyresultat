const gameFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }
    case 'TOGGLE WOMEN':
      return { ...state, women: !state.women }
    case 'TOGGLE PENALTIES':
      return { ...state, penalties: !state.penalties }
    case 'TOGGLE EXTRATIME':
      return { ...state, extraTime: !state.extraTime }
    case 'TOGGLE PLAYOFF':
      return { ...state, playoff: !state.playoff }
    default:
      return state
  }
}

export default gameFormReducer
