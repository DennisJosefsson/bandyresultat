import { ReactNode, useReducer } from 'react'
import { GenderContext, GenderActionType, GenderType } from './contexts'

const genderReducer = (state: GenderType, action: GenderActionType) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    case 'SET':
      return (state = action.payload)
    default:
      return state
  }
}

const GenderContextProvider = ({ children }: { children: ReactNode }) => {
  const [women, dispatch] = useReducer(genderReducer, false)

  return (
    <GenderContext.Provider value={{ women, dispatch }}>
      {children}
    </GenderContext.Provider>
  )
}

export default GenderContextProvider
