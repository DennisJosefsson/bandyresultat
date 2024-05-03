import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import { useGetGoalStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGoalStats'
import BarChartCard from './BarChartCard'

const AverageGoalStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const { averageArray, totObjectArray } = useGetGoalStats(seasonId, women)

  return (
    <>
      <BarChartCard
        averageArray={averageArray}
        totObjectArray={totObjectArray}
      />
    </>
  )
}

export default AverageGoalStats
