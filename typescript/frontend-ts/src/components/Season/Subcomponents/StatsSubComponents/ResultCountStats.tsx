import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGameResultStats'

import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import PieChartCard from './PieChartCard'

const ResultCountStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const { pieChartData } = useGetGameResultStats(seasonId, women)

  return (
    <>
      <div>
        <PieChartCard data={pieChartData} />
      </div>
    </>
  )
}

export default ResultCountStats
