import { useReducer, useEffect } from 'react'
import { TeamPreferenceContext } from './contexts'
import { favTeamsReducer, initializer } from '../reducers/favteamsReducer'

const FavTeamsContextProvider = ({ children }) => {
  const [favTeams, favTeamsDispatch] = useReducer(
    favTeamsReducer,
    [],
    initializer,
  )

  useEffect(() => {
    localStorage.setItem('favTeams', JSON.stringify(favTeams))
  }, [favTeams])

  return (
    <TeamPreferenceContext.Provider value={{ favTeams, favTeamsDispatch }}>
      {children}
    </TeamPreferenceContext.Provider>
  )
}

export default FavTeamsContextProvider
