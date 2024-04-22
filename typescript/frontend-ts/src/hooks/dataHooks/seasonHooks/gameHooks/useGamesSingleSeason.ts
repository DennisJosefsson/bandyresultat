import { useQuery } from '@tanstack/react-query'
import { getSingleSeason } from '../../../../requests/seasons'
import useGenderContext from '../../../contextHooks/useGenderContext'

export const useGamesSingleSeason = (seasonId: number) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['singleSeason', seasonId],
    queryFn: () => getSingleSeason(seasonId),
  })
  const singleSeason = isSuccess ? data : []
  const genderSeason = singleSeason.filter(
    (indSeason) => indSeason.women === women,
  )

  const genderSeasonObject = singleSeason.find(
    (season) => season.women === women,
  )
  const seriesInfo = genderSeasonObject ? genderSeasonObject.series : []

  return { genderSeason, seriesInfo, isLoading, error }
}