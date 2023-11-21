import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const LosingStreak = ({ teams }) => {
  if (
    !teams.losingStreak ||
    teams.losingStreak.filter((streak) => streak.game_count > 5).length === 0
  )
    return null

  const losingStreak = teams.losingStreak.filter(
    (streak) => streak.game_count > 5,
  )

  return (
    <div>
      <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
        Förlustsvit
      </h4>
      <div className="teamCurCard">
        {losingStreak.map((streak, index) => {
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

export default LosingStreak
