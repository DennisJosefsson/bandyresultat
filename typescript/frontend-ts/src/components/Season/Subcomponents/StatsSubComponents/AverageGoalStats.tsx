import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import { useGetGoalStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGoalStats'
import GoalStatsCard from './GoalStatsCard'

const AverageGoalStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const {
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverage,
    goalsScoredAwayAverageCat,
  } = useGetGoalStats(seasonId, women)
  return (
    <>
      {goalsScoredAverage && goalsScoredAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål"
          base={goalsScoredAverage}
          catArray={goalsScoredAverageCat}
        />
      ) : null}
      {goalsScoredHomeAverage && goalsScoredHomeAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål hemmalag"
          base={goalsScoredHomeAverage}
          catArray={goalsScoredHomeAverageCat}
        />
      ) : null}
      {goalsScoredAwayAverage && goalsScoredAwayAverageCat ? (
        <GoalStatsCard
          title="Genomsnitt mål bortalag"
          base={goalsScoredAwayAverage}
          catArray={goalsScoredAwayAverageCat}
        />
      ) : null}
    </>
  )
}

export default AverageGoalStats
