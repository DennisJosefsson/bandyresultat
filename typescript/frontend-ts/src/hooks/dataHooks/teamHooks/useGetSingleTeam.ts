import { getSingleTeam } from '@/src/requests/teams'
import { useQuery } from '@tanstack/react-query'

export const useGetSingleTeam = (teamId: number) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['teams', teamId],
    queryFn: () => getSingleTeam(teamId),
  })

  return { data, isLoading, error, isSuccess }
}
