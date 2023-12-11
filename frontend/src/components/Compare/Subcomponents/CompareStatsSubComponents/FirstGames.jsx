import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const FirstGames = ({ firstGames, compObject }) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold md:text-base">Första matcherna</h3>
      <div className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm">
        <div>
          {firstGames.map((game) => {
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
      {!compObject.women && (
        <p className="my-2 w-full bg-white p-1 text-[8px] font-bold md:text-xs">
          Obs! Speldatum 1 januari före 1931 gäller enbart tillsvidare, de
          betyder att faktiskt datum saknas.
        </p>
      )}
    </div>
  )
}

export default FirstGames
