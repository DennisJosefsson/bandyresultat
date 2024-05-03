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

  const pieChartData = [
    {
      win: 'Hemma',
      count: winCountHomeTeam?.count ?? 0,
      percent:
        winCountHomeTeam?.count && gamesCountTotal?.count
          ? (winCountHomeTeam?.count / gamesCountTotal?.count) * 100
          : 0,
    },
    {
      win: 'Borta',
      count: winCountAwayTeam?.count ?? 0,
      percent:
        winCountAwayTeam?.count && gamesCountTotal?.count
          ? (winCountAwayTeam?.count / gamesCountTotal?.count) * 100
          : 0,
    },
    {
      win: 'Oavgjort',
      count: drawCount?.count ?? 0,
      percent:
        drawCount?.count && gamesCountTotal?.count
          ? (drawCount?.count / gamesCountTotal?.count) * 100
          : 0,
    },
  ]

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
    pieChartData,
  }
}
