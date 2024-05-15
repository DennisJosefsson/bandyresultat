import useGenderContext from '../../../contextHooks/useGenderContext'
import useGetAllSeasons from '../useGetAllSeasons'

export const useGamesSeason = () => {
  const { women } = useGenderContext()
  const { seasons } = useGetAllSeasons()

  const allSeasons = seasons.filter((season) => season.women === women)

  const startSeason = allSeasons[allSeasons.length - 1].seasonId
  const endSeason = allSeasons[0].seasonId

  return { startSeason, endSeason }
}
