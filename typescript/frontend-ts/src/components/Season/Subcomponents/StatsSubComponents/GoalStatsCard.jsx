import { sortStatsCat } from '../../../utilitycomponents/functions/sortFunction'
import { groupConstant } from '../../../utilitycomponents/functions/constants'

const GoalStatsCard = ({ title, base, catArray, half }) => {
  return (
    <div>
      <div className="statsCard">
        <div className="name">{title}: </div>
        <div className="count">
          {half ? parseInt(base.data) / 2 : base.data}
        </div>
      </div>

      {sortStatsCat(catArray).map((cat) => {
        return (
          <div key={`${cat.category}-${Math.random()}`} className="statsCard">
            <div className="name">{groupConstant[cat.category]}</div>
            <div className="count">
              {half ? parseInt(cat.data) / 2 : cat.data}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GoalStatsCard
