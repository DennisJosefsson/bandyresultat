import { getSingleTeam } from '@/src/requests/teams'
import { useQuery } from 'react-query'

export const useGetSingleTeam = (teamId: number) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ['teams', teamId],
    () => getSingleTeam(teamId),
  )

  return { data, isLoading, error, isSuccess }
}
