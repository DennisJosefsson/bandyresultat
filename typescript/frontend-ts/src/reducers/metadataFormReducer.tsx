export type MetadataState = {
  seasonId: number
  name: string
  year: string
  winnerId: number | null
  winnerName: string
  hostCity: string
  finalDate: string
  northSouth: boolean
  multipleGroupStages: boolean
  eight: boolean
  quarter: boolean
  semi: boolean
  final: boolean
  comment: string
}

type MetadataActionType =
  | { type: 'INPUT'; field: string; payload: string | number }
  | { type: 'TOGGLE'; field: string }

const metadataFormReducer = (
  state: MetadataState,
  action: MetadataActionType,
) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.field]: action.payload }

    case 'TOGGLE':
      return {
        ...state,
        [action.field]: ![action.field],
      }

    default:
      return state
  }
}

export default metadataFormReducer
