import useGenderContext from '../../../contextHooks/useGenderContext'
import useGetAllSeasons from '../useGetAllSeasons'

export const useGamesSeason = () => {
  const { women } = useGenderContext()
  const { seasons, isLoading, error, isSuccess } = useGetAllSeasons()

  const allSeasons = isSuccess
    ? seasons.filter((season) => season.women === women)
    : []

  const startSeasonObject = allSeasons.pop()
  const endSeasonObject = allSeasons.shift()

  const startSeason = startSeasonObject ? startSeasonObject.seasonId : null
  const endSeason = endSeasonObject ? endSeasonObject.seasonId : null

  return { startSeason, endSeason, isLoading, error }
}
