import useGetAllSeasons from './useGetAllSeasons'

export const useGetFirstAndLastSeason = () => {
  const { seasons } = useGetAllSeasons()

  const firstSeasonObject = seasons.filter((season) => season.women === false)[
    seasons.filter((season) => season.women === false).length - 1
  ]
  const lastSeasonObject = seasons.filter((season) => season.women === false)[0]

  const firstSeason = Number(firstSeasonObject.year)
  const lastSeason = Number(lastSeasonObject.year.split('/')[1])

  return { firstSeason, lastSeason }
}
