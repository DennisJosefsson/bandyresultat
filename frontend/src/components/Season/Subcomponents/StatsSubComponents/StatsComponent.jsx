import GameResultStats from './GameResultStats'
import GoalStats from './GoalStats'
import StreakStats from './StreakStats'

const StatsComponent = ({ data, women }) => {
  return (
    <div>
      <GameResultStats data={data} women={women} />
      <GoalStats data={data} women={women} />
      <StreakStats data={data} women={women} />
    </div>
  )
}

export default StatsComponent
