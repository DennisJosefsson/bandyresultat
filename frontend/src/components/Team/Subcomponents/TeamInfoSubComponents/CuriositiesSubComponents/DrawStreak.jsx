import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const DrawStreak = ({ teams }) => {
  if (
    !teams.drawStreak ||
    teams.drawStreak.filter((streak) => streak.game_count > 2).length === 0
  )
    return null

  const drawStreak = teams.drawStreak.filter((streak) => streak.game_count > 2)

  return (
    <div>
      <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
        Oavgjorda matcher
      </h4>
      <div className="teamCurCard">
        {drawStreak.map((streak, index) => {
          return (
            <div key={`${streak.start_date}-${index}`} className="curCard1st">
              <div className="dates">
                {dayjs(streak.start_date).format('D MMMM YYYY')} -
                {dayjs(streak.end_date).format('D MMMM YYYY')}
              </div>
              <div className="count">{streak.game_count} matcher</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DrawStreak
