import { useGetSeasonStats } from './useGetSeasonStats'

export const useGetGameResultStats = (seasonId: number, women: boolean) => {
  const { data, isLoading, error, isSuccess } = useGetSeasonStats(seasonId)

  const gamesCountTotal = data?.gamesCountTotal.find(
    (cat) => cat.women === women,
  )
  const gamesCountTotalCat = data?.gamesCountTotalCat.filter(
    (cat) => cat.women === women,
  )
  const winCountHomeTeam = data?.winCountHomeTeam.find(
    (cat) => cat.women === women,
  )
  const winCountAwayTeam = data?.winCountAwayTeam.find(
    (cat) => cat.women === women,
  )
  const drawCount = data?.drawCount.find((cat) => cat.women === women)

  const winCountHomeTeamCat = data?.winCountHomeTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const winCountAwayTeamCat = data?.winCountAwayTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const drawCountCat = data?.drawCountCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')

  return {
    data,
    isLoading,
    error,
    isSuccess,
    gamesCountTotal,
    gamesCountTotalCat,
    winCountAwayTeam,
    winCountAwayTeamCat,
    winCountHomeTeam,
    winCountHomeTeamCat,
    drawCount,
    drawCountCat,
  }
}
