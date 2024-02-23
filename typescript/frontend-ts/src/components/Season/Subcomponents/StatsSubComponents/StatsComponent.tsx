import { SeasonStatsObjectType } from '../../../types/games/stats'
import GameResultStats from './GameResultStats'
import GoalStats from './GoalStats'
import StreakStats from './StreakStats'

type StatsComponentProps = {
  data: SeasonStatsObjectType
  women: boolean
}

const StatsComponent = ({ data, women }: StatsComponentProps) => {
  return (
    <div>
      <GameResultStats data={data} women={women} />
      <GoalStats data={data} women={women} />
      <StreakStats data={data} women={women} />
    </div>
  )
}

export default StatsComponent
