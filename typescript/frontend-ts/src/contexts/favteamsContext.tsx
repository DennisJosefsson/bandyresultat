import { useReducer, useEffect, ReactNode } from 'react'
import { TeamPreferenceContext } from './contexts'
import { favTeamsReducer, initializer } from '../reducers/favteamsReducer'

const FavTeamsContextProvider = ({ children }: { children: ReactNode }) => {
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
