import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const WinStreak = ({ teams }) => {
  if (
    !teams.WinStreak ||
    teams.WinStreak?.filter((streak) => streak.game_count > 5).length === 0
  )
    return null
  const winStreak = teams.WinStreak?.filter((streak) => streak.game_count > 5)

  return (
    <div>
      <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
        Vinster i rad
      </h4>
      <div className="teamCurCard">
        {winStreak.map((streak, index) => {
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

export default WinStreak
