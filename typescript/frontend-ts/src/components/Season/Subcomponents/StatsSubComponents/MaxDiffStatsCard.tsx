import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

type MaxDiffType = {
  home_name: string
  away_name: string
  resultat: string
  datum: string
  goal_difference: number
}[]

type MaxDiffStatsCardProps = {
  maxDiffMen: MaxDiffType
  maxDiffWomen: MaxDiffType
  women: boolean
  title: string
}

const MaxDiffStatsCard = ({
  maxDiffMen,
  maxDiffWomen,
  women,
  title,
}: MaxDiffStatsCardProps) => {
  return (
    <div className="streakCard">
      <h6 className="head">{title}</h6>
      {!women && (
        <div>
          {maxDiffMen.map((game, index) => {
            return (
              <div key={`${index}-${Math.random()}`}>
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
          {maxDiffWomen.map((game, index) => {
            return (
              <div key={`${index}-${Math.random()}`}>
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

export default MaxDiffStatsCard
