import Date from '@/src/components/utilitycomponents/Components/Date'
type MaxMinGoalsType = {
  home_name: string
  away_name: string
  resultat: string
  datum: string
  sum_goals: number
}[]

type MaxMinGoalsStatsCardProps = {
  maxMinGoalsMen: MaxMinGoalsType
  maxMinGoalsWomen: MaxMinGoalsType
  women: boolean
  title: string
}

const MaxMinGoalsStatsCard = ({
  maxMinGoalsMen,
  maxMinGoalsWomen,
  women,
  title,
}: MaxMinGoalsStatsCardProps) => {
  return (
    <div className="streakCard">
      <h6 className="head">{title}</h6>
      {!women && (
        <div>
          {maxMinGoalsMen.map((game, index) => {
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
                    <Date>{game.datum}</Date>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {women && (
        <div>
          {maxMinGoalsWomen.map((game, index) => {
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
                    <Date>{game.datum}</Date>
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

export default MaxMinGoalsStatsCard
