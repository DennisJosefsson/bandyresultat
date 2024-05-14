import { useSuspenseQuery } from '@tanstack/react-query'
import { getTeams } from '../../../requests/teams'

export const useGetTeams = () => {
  const { data, isLoading, error, isSuccess } = useSuspenseQuery({
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
