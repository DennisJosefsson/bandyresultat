import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const ScoreStatsCard = ({ streakMen, streakWomen, women, title }) => {
  return (
    <div className="streakCard">
      <h6 className="head">{title}</h6>
      {!women && (
        <div>
          {streakMen.map((game, index) => {
            return (
              <div
                key={`${game.casual_name}-${game.game_count}-${
                  game.start_date
                }-${index}-${Math.random()}`}
              >
                <div className="streak1st">
                  <div className="name">
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="count">{game.resultat}</div>
                </div>
                <div className="streak2nd">
                  <div className="dates">
                    {dayjs(game.datum).format('D MMMM YYYY')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {women && (
        <div>
          {streakWomen.map((game, index) => {
            return (
              <div
                key={`${game.casual_name}-${game.game_count}-${
                  game.start_date
                }-${index}-${Math.random()}`}
              >
                <div className="streak1st">
                  <div className="name">
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="count">{game.resultat}</div>
                </div>
                <div className="streak2nd">
                  <div className="dates">
                    {dayjs(game.datum).format('D MMMM YYYY')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ScoreStatsCard
