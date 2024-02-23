import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

type StreakType = {
  women: boolean
  team: number
  casual_name: string
  game_count: number
  start_date: string
  end_date: string
}[]

type StreakStatsCard = {
  streak: StreakType
  title: string
}

const StreakStatsCard = ({ streak, title }: StreakStatsCard) => {
  return (
    <div className="streakCard">
      <h6 className="head">{title}</h6>

      {streak?.map((team, index) => {
        return (
          <div
            key={`${team.casual_name}-${team.game_count}-${
              team.start_date
            }-${Math.random()}-${index}`}
          >
            <div className="streak1st">
              <div className="name">{team.casual_name}</div>
              <div className="count">{team.game_count}</div>
            </div>
            <div className="streak2nd">
              <div className="dates">
                {dayjs(team.start_date).format('D MMMM YYYY')} -
                {dayjs(team.end_date).format('D MMMM YYYY')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StreakStatsCard
