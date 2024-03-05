import { useContext } from 'react'
import { SeasonContext } from '../../contexts/contexts'

const useSeasonContext = () => {
  const seasonContext = useContext(SeasonContext)

  if (!seasonContext) throw new Error('Missing Season context')

  const { seasonId } = seasonContext

  return { seasonId }
}

export default useSeasonContext
