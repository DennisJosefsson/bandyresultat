const metadataFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }
    // case 'INPUT TEAM':
    //   return {
    //     ...state,
    //     winnerId: action.payload.teamId,
    //     winnerName: action.payload.name,
    //   }
    case 'TOGGLE NORTHSOUTH':
      return {
        ...state,
        northSouth: !state.northSouth,
      }
    case 'TOGGLE MULTIPLEGROUPSTAGES':
      return {
        ...state,
        multipleGroupStages: !state.multipleGroupStages,
      }
    case 'TOGGLE EIGHT':
      return {
        ...state,
        eight: !state.eight,
      }
    case 'TOGGLE QUARTER':
      return {
        ...state,
        quarter: !state.quarter,
      }
    case 'TOGGLE SEMI':
      return {
        ...state,
        semi: !state.semi,
      }
    case 'TOGGLE FINAL':
      return {
        ...state,
        final: !state.final,
      }

    default:
      return state
  }
}

export default metadataFormReducer
