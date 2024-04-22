import { useQuery } from '@tanstack/react-query'
import { getTeams } from '../../../requests/teams'

export const useGetTeams = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })
  return {
    data,
    isLoading,
    error,
    isSuccess,
  }
}
