const teamFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }
    case 'TOGGLE':
      return { ...state, women: !state.women }
    default:
      return state
  }
}

export default teamFormReducer
