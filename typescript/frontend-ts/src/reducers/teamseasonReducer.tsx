export type TeamSeasonStateType = { teamArray: number[] }

const initialState: TeamSeasonStateType = { teamArray: [] }

export type TeamSeasonActionType =
  | { type: 'ADD TEAM'; payload: number }
  | { type: 'REMOVE TEAM'; payload: number }
  | { type: 'CLEAR TEAMS' }

const teamseasonReducer = (
  state: TeamSeasonStateType,
  action: TeamSeasonActionType,
): TeamSeasonStateType => {
  switch (action.type) {
    case 'ADD TEAM':
      if (state.teamArray.find((team) => team === action.payload)) return state
      else return { teamArray: [...state.teamArray, action.payload] }
    case 'REMOVE TEAM':
      if (!state.teamArray.find((team) => team === action.payload)) return state
      else
        return {
          teamArray: state.teamArray.filter((team) => team !== action.payload),
        }
    case 'CLEAR TEAMS':
      return initialState
    default:
      return state
  }
}

export default teamseasonReducer
