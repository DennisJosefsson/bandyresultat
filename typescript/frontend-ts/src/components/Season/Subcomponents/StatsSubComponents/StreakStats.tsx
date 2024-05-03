import ScoreStatsData from './ScoreStatsData'
import MaxDiffData from './MaxDiffData'
import StreakStatsData from './StreakStatsData'

const StreakStats = () => {
  return (
    <div>
      <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Resultat
      </h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <div>
          <ScoreStatsData />
          <MaxDiffData />
        </div>

        <StreakStatsData />
      </div>
    </div>
  )
}

export default StreakStats
