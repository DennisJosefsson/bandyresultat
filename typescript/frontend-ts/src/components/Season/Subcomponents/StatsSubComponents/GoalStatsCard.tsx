import { sortStatsCat } from '../../../utilitycomponents/functions/sortFunction'
import { groupConstant } from '../../../utilitycomponents/functions/constants'

type BaseType = {
  data: number
  women: boolean
  season: {
    year: string
    seasonId: number
  }
}
type CatArrayType = {
  data: number
  women: boolean
  category: string
  season: {
    seasonId: number
    year: string
  }
}[]

type GoalStatsCardProps = {
  title: string
  base: BaseType
  catArray: CatArrayType
}

const GoalStatsCard = ({ title, base, catArray }: GoalStatsCardProps) => {
  return (
    <div>
      <div className="statsCard">
        <div className="name">{title}: </div>
        <div className="count">{base.data}</div>
      </div>

      {sortStatsCat(catArray).map((cat) => {
        return (
          <div key={`${cat.category}-${Math.random()}`} className="statsCard">
            <div className="name">{groupConstant[cat.category]}</div>
            <div className="count">{cat.data}</div>
          </div>
        )
      })}
    </div>
  )
}

export default GoalStatsCard
