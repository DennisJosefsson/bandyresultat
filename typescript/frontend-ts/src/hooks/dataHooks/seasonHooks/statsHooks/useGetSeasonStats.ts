import { useQuery } from '@tanstack/react-query'
import { getSeasonStats } from '../../../../requests/games'

export const useGetSeasonStats = (seasonId: number) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['singleSeasonStats', seasonId],
    queryFn: () => getSeasonStats(seasonId),
  })

  return { data, isLoading, error, isSuccess }
}
