import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'
import Date from '../../utilitycomponents/Components/Date'
type Game = {
  homeTeam: { casualName: string }
  awayTeam: { casualName: string }
  homeTeamId: number
  awayTeamId: number
  result: string
  date: string
  qualification: boolean
}

type ResultComponentProps = {
  gameArray: Game[]
}

const ResultComponent = ({ gameArray }: ResultComponentProps) => {
  const { favTeams } = useTeampreferenceContext()
  return (
    <div>
      {gameArray?.map((game, index) => {
        return (
          <div className="recordCard" key={`${game.date}-${index}`}>
            <div className="pos">{index + 1}</div>
            <div className="flex flex-col">
              <div className="record1st">
                <div className="name">
                  {game.homeTeam.casualName}-{game.awayTeam.casualName}
                </div>
                <div
                  className={
                    favTeams.includes(game.homeTeamId) ||
                    favTeams.includes(game.awayTeamId)
                      ? 'count font-bold'
                      : 'count'
                  }
                >
                  {game.result}
                </div>
              </div>
              <div className="record2nd">
                <div className="dates">
                  <Date>{game.date}</Date>
                  {game.qualification && <span className="ml-1">(K)</span>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultComponent
