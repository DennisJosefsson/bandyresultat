import { TeamChartType } from '@/src/components/types/teams/teams'
import TeamBarChart from './TeamChartSubComponents/TeamBarChart'
import TeamLineChart from './TeamChartSubComponents/TeamLineChart'

const TeamChart = ({ chartData }: { chartData: TeamChartType[] }) => {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2">
      <TeamBarChart chartData={chartData} />
      <TeamLineChart chartData={chartData} />
    </div>
  )
}

export default TeamChart
