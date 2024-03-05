import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import { useGetGoalStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGoalStats'
import GoalStatsCard from './GoalStatsCard'

const TotalGoalStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const {
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredHomeTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotal,

    goalsScoredAwayTotalCat,
  } = useGetGoalStats(seasonId, women)
  return (
    <>
      {goalsScoredTotal && goalsScoredTotalCat ? (
        <GoalStatsCard
          title="Antal mål"
          base={goalsScoredTotal}
          catArray={goalsScoredTotalCat}
        />
      ) : null}
      {goalsScoredHomeTotal && goalsScoredHomeTotalCat ? (
        <GoalStatsCard
          title="Antal mål hemmalag"
          base={goalsScoredHomeTotal}
          catArray={goalsScoredHomeTotalCat}
        />
      ) : null}
      {goalsScoredAwayTotal && goalsScoredAwayTotalCat ? (
        <GoalStatsCard
          title="Antal mål bortalag"
          base={goalsScoredAwayTotal}
          catArray={goalsScoredAwayTotalCat}
        />
      ) : null}
    </>
  )
}

export default TotalGoalStats
