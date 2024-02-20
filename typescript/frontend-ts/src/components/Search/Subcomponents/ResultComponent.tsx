import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'

dayjs.locale('sv')

const ResultComponent = ({ gameArray }) => {
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
                  {game.date && (
                    <span className="mr-1">
                      {dayjs(game.date).format('D MMMM YYYY')}
                    </span>
                  )}
                  {game.qualification && <span>(K)</span>}
                  {!game.date && <span className="invisible">Gömt datum </span>}
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
