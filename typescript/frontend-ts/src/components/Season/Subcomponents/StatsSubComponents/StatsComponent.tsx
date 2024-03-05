import GameResultStats from './GameResultStats'
import GoalStats from './GoalStats'
import StreakStats from './StreakStats'

const StatsComponent = () => {
  return (
    <div>
      <GameResultStats />
      <GoalStats />
      <StreakStats />
    </div>
  )
}

export default StatsComponent
