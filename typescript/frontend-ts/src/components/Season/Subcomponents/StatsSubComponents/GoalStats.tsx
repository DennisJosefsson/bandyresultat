//import TotalGoalStats from './TotalGoalStats'
import AverageGoalStats from './AverageGoalStats'

const GoalStats = () => {
  return (
    <div>
      <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Målstatistik
      </h4>
      {/* <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3">
        <TotalGoalStats />
      </div> */}
      <div>
        <AverageGoalStats />
      </div>
    </div>
  )
}

export default GoalStats
