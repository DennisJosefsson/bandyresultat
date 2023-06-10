const basicInputFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }
    case 'TOGGLE QUALIFICATION':
      return { ...state, qualification: !state.qualification }
    default:
      return state
  }
}

export default basicInputFormReducer
