import { useGetSeasonStats } from './useGetSeasonStats'

export const useGetStreakStats = (seasonId: number, women: boolean) => {
  const { data, isLoading, error, isSuccess } = useGetSeasonStats(seasonId)

  const unbeatenStreak = data?.unbeatenStreak.filter(
    (table) => table.women === women,
  )
  const winStreak = data?.winStreak.filter((table) => table.women === women)
  const drawStreak = data?.drawStreak.filter((table) => table.women === women)
  const noWinStreak = data?.noWinStreak.filter((table) => table.women === women)
  const losingStreak = data?.losingStreak.filter(
    (table) => table.women === women,
  )

  const maxGoalsMen = data?.maxGoalsMen
  const minGoalsMen = data?.minGoalsMen
  const maxDiffMen = data?.maxDiffMen
  const maxGoalsWomen = data?.maxGoalsWomen
  const minGoalsWomen = data?.minGoalsWomen
  const maxDiffWomen = data?.maxDiffWomen

  return {
    isLoading,
    error,
    isSuccess,
    unbeatenStreak,
    winStreak,
    drawStreak,
    noWinStreak,
    losingStreak,
    maxGoalsMen,
    minGoalsMen,
    maxDiffMen,
    maxGoalsWomen,
    minGoalsWomen,
    maxDiffWomen,
  }
}
