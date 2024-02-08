import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const StreakCard = ({ streak, title }) => {
  return (
    <div className="p-2">
      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        {title}
      </h3>
      <div className="table">
        {streak.map((streak, index) => {
          return (
            <div className="recordCard" key={`${streak.name}-${Math.random()}`}>
              <div className="pos">{index + 1}</div>
              <div className="flex flex-col">
                <div className="record1st">
                  <div className="name">{streak.name}</div>
                  <div className="count">{streak.game_count}</div>
                </div>
                <div className="record2nd">
                  <div className="dates">
                    {dayjs(streak.start_date).format('D MMMM YYYY')}-
                    {dayjs(streak.end_date).format('D MMMM YYYY')}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StreakCard
