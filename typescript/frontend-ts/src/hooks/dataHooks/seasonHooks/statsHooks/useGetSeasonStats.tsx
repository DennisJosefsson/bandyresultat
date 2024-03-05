import { useQuery } from 'react-query'
import { getSeasonStats } from '../../../../requests/games'

export const useGetSeasonStats = (seasonId: number) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ['singleSeasonStats', seasonId],
    () => getSeasonStats(seasonId),
  )

  return { data, isLoading, error, isSuccess }
}
