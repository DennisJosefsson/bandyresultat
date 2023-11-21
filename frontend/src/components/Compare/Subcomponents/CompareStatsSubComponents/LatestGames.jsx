import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const LatestGames = ({ latestGames }) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold md:text-base">Senaste matcherna</h3>
      <div className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm">
        <div>
          {latestGames.map((game) => {
            return (
              <div key={game.game_id} className="card">
                <div className="line1">
                  {game.date && (
                    <span>{dayjs(game.date).format('D MMMM YYYY')}:</span>
                  )}
                </div>
                <div className="line2">
                  <div>
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="result">{game.result}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LatestGames
