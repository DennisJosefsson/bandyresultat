const searchReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }
    case 'ADD CATEGORY':
      if (state.categoryArray.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        categoryArray: [...state.categoryArray, action.payload],
      }
    case 'REMOVE CATEGORY': {
      return {
        ...state,
        categoryArray: state.categoryArray.filter(
          (cat) => cat !== action.payload,
        ),
      }
    }
    case 'TOGGLE':
      return { ...state, qualification: !state.qualification }
    default:
      return state
  }
}

export default searchReducer
