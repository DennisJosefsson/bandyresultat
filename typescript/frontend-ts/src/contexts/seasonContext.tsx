import { ReactNode } from 'react'
import { SeasonContext } from './contexts'

const SeasonContextProvider = ({
  children,
  seasonId,
}: {
  children: ReactNode
  seasonId: number
}) => {
  return (
    <SeasonContext.Provider value={{ seasonId }}>
      {children}
    </SeasonContext.Provider>
  )
}

export default SeasonContextProvider
