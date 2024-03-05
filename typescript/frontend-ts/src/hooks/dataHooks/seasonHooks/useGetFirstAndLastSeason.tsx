import useGetAllSeasons from './useGetAllSeasons'

export const useGetFirstAndLastSeason = () => {
  const { seasons } = useGetAllSeasons()

  const firstSeasonObject = seasons
    .filter((season) => season.women === false)
    .pop()
  const lastSeasonObject = seasons
    .filter((season) => season.women === false)
    .shift()

  const firstSeason = Number(firstSeasonObject?.year)
  const lastSeason = Number(lastSeasonObject?.year.split('/')[1])

  return { firstSeason, lastSeason }
}
