import TotalGoalStats from './TotalGoalStats'
import AverageGoalStats from './AverageGoalStats'

const GoalStats = () => {
  return (
    <div>
      <h4 className="ml-2 font-bold md:text-lg xl:ml-0">Målstatistik</h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <TotalGoalStats />
        <AverageGoalStats />
      </div>
    </div>
  )
}

export default GoalStats
