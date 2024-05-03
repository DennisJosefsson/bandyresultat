import { useGetSeasonStats } from './useGetSeasonStats'

export const useGetGoalStats = (seasonId: number, women: boolean) => {
  const { data, isLoading, error, isSuccess } = useGetSeasonStats(seasonId)

  const goalsScoredTotal = data?.goalsScoredTotal.find(
    (cat) => cat.women === women,
  )

  const goalsScoredTotalCat = data?.goalsScoredTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAverage = data?.goalsScoredAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAverageCat = data?.goalsScoredAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeTotal = data?.goalsScoredHomeTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayTotal = data?.goalsScoredAwayTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeTotalCat = data?.goalsScoredHomeTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayTotalCat = data?.goalsScoredAwayTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeAverage = data?.goalsScoredHomeAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayAverage = data?.goalsScoredAwayAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeAverageCat = data?.goalsScoredHomeAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayAverageCat = data?.goalsScoredAwayAverageCat.filter(
    (cat) => cat.women === women,
  )

  const averageArray = goalsScoredTotalCat?.map((cat) => {
    const avgAll = goalsScoredAverageCat?.find(
      (avgCat) => cat.category === avgCat.category,
    )
    const avgHome = goalsScoredHomeAverageCat?.find(
      (avgCat) => cat.category === avgCat.category,
    )
    const avgAway = goalsScoredAwayAverageCat?.find(
      (avgCat) => cat.category === avgCat.category,
    )
    const totHome = goalsScoredHomeTotalCat?.find(
      (totCat) => cat.category === totCat.category,
    )
    const totAway = goalsScoredAwayTotalCat?.find(
      (totCat) => cat.category === totCat.category,
    )
    return {
      category: cat.category,
      totAll: cat.data,
      totHome: totHome?.data,
      totAway: totAway?.data,
      avgAll: avgAll?.data,
      avgHome: avgHome?.data,
      avgAway: avgAway?.data,
    }
  })

  const totObjectArray = [
    {
      category: 'totalt',
      totAll: goalsScoredTotal?.data,
      totHome: goalsScoredHomeTotal?.data,
      totAway: goalsScoredAwayTotal?.data,
      avgAll: goalsScoredAverage?.data,
      avgHome: goalsScoredHomeAverage?.data,
      avgAway: goalsScoredAwayAverage?.data,
    },
  ]

  return {
    data,
    isLoading,
    error,
    isSuccess,
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeTotal,
    goalsScoredAwayTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotalCat,
    goalsScoredHomeAverage,
    goalsScoredAwayAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverageCat,
    averageArray,
    totObjectArray,
  }
}
