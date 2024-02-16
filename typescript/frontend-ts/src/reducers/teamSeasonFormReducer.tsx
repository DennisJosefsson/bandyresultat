import { CompareFormState } from '../components/types/teams/teams'

type CompareFormStateActions =
  | { type: 'ADD TEAM'; payload: number }
  | { type: 'REMOVE TEAM'; payload: number }
  | { type: 'CLEAR TEAMS' }
  | {
      type: 'ADD CATEGORY'
      payload: string
    }
  | {
      type: 'REMOVE CATEGORY'
      payload: string
    }
  | { type: 'CLEAR CATEGORIES' }
  | { type: 'INPUT START'; payload: number }
  | { type: 'INPUT END'; payload: number }
  | { type: 'RESET' }

const teamArrayFormReducer = (
  state: CompareFormState,
  action: CompareFormStateActions,
): CompareFormState => {
  switch (action.type) {
    case 'ADD TEAM':
      if (state.teamArray.includes(action.payload)) {
        return state
      }
      return { ...state, teamArray: [...state.teamArray, action.payload] }
    case 'REMOVE TEAM': {
      return {
        ...state,
        teamArray: state.teamArray.filter(
          (teamId) => teamId !== action.payload,
        ),
      }
    }
    case 'CLEAR TEAMS': {
      return { ...state, teamArray: [] }
    }
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
    case 'CLEAR CATEGORIES': {
      return { ...state, categoryArray: [] }
    }
    case 'INPUT START':
      return { ...state, startSeason: action.payload }
    case 'INPUT END':
      return { ...state, endSeason: action.payload }
    case 'RESET':
      return {
        teamArray: [],
        categoryArray: [
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ],
        endSeason: null,
        startSeason: null,
      }
    default:
      return state
  }
}

export default teamArrayFormReducer
