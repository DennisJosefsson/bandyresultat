import { SeasonStatsObjectType } from '../../../types/games/stats'
import GoalStatsCard from './GoalStatsCard'

type GoalStatsProps = {
  data: SeasonStatsObjectType
  women: boolean
}

const GoalStats = ({ data, women }: GoalStatsProps) => {
  const goalsScoredTotal = data.goalsScoredTotal.find(
    (cat) => cat.women === women,
  )

  if (!goalsScoredTotal || goalsScoredTotal.data === 0) return null

  const goalsScoredTotalCat = data.goalsScoredTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAverage = data.goalsScoredAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAverageCat = data.goalsScoredAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeTotal = data.goalsScoredHomeTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayTotal = data.goalsScoredAwayTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeTotalCat = data.goalsScoredHomeTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayTotalCat = data.goalsScoredAwayTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeAverage = data.goalsScoredHomeAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayAverage = data.goalsScoredAwayAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeAverageCat = data.goalsScoredHomeAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayAverageCat = data.goalsScoredAwayAverageCat.filter(
    (cat) => cat.women === women,
  )
  return (
    <div>
      <h4 className="ml-2 font-bold md:text-lg xl:ml-0">Målstatistik</h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <GoalStatsCard
          title="Antal mål"
          base={goalsScoredTotal}
          catArray={goalsScoredTotalCat}
        />
        {goalsScoredHomeTotal && (
          <GoalStatsCard
            title="Antal mål hemmalag"
            base={goalsScoredHomeTotal}
            catArray={goalsScoredHomeTotalCat}
          />
        )}
        {goalsScoredAwayTotal && (
          <GoalStatsCard
            title="Antal mål bortalag"
            base={goalsScoredAwayTotal}
            catArray={goalsScoredAwayTotalCat}
          />
        )}
        {goalsScoredAverage && (
          <GoalStatsCard
            title="Genomsnitt mål"
            base={goalsScoredAverage}
            catArray={goalsScoredAverageCat}
          />
        )}
        {goalsScoredHomeAverage && (
          <GoalStatsCard
            title="Genomsnitt mål hemmalag"
            base={goalsScoredHomeAverage}
            catArray={goalsScoredHomeAverageCat}
          />
        )}
        {goalsScoredAwayAverage && (
          <GoalStatsCard
            title="Genomsnitt mål bortalag"
            base={goalsScoredAwayAverage}
            catArray={goalsScoredAwayAverageCat}
          />
        )}
      </div>
    </div>
  )
}

export default GoalStats
