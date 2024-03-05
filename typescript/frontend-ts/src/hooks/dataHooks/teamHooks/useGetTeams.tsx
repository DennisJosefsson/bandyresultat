import { useQuery } from 'react-query'
import { getTeams } from '../../../requests/teams'

export const useGetTeams = () => {
  const { data, isLoading, error, isSuccess } = useQuery('teams', getTeams)
  return {
    data,
    isLoading,
    error,
    isSuccess,
  }
}
