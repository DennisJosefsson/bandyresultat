import { useQuery } from '@tanstack/react-query'
import { getSingleSeason } from '../../../requests/seasons'
import useGenderContext from '../../contextHooks/useGenderContext'

export const useGetSingleSeason = (seasonId: number) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['singleSeason', seasonId],
    queryFn: () => getSingleSeason(seasonId),
  })

  const seasonObject = data?.filter((season) => season.women === women)[0]

  const seriesInfo = seasonObject?.series

  const seasonTables = seasonObject?.tables

  const tableLength = seasonObject?.tables.length

  const womensSeason = data?.find((season) => season.women === true)

  const seasonData = {
    seriesInfo,
    seasonTables,
    womensSeason,
    tableLength,
  }

  return {
    data,
    seasonData,
    isLoading,
    error,
    isSuccess,
  }
}
