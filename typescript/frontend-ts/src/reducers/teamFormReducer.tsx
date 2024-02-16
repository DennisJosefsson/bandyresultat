import { NewTeamType } from '../components/types/teams/teams'

type NewTeamActionType =
  | {
      type: 'INPUT'
      field: string
      payload: string | number
    }
  | { type: 'TOGGLE' }

const teamFormReducer = (state: NewTeamType, action: NewTeamActionType) => {
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
