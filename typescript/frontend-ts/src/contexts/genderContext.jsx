import { useReducer } from 'react'
import { GenderContext } from './contexts'

const genderReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    case 'SET':
      return (state = action.payload)
    default:
      return state
  }
}

const GenderContextProvider = ({ children }) => {
  const [women, dispatch] = useReducer(genderReducer, false)

  return (
    <GenderContext.Provider value={{ women, dispatch }}>
      {children}
    </GenderContext.Provider>
  )
}

export default GenderContextProvider
