import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { GameObjectType } from '../../../types/games/games'

dayjs.locale('sv')

type DateArrayItem = {
  date: string
  games: GameObjectType[]
}

type AnimationGamesListProps = {
  dateArray: DateArrayItem[]

  round: number
  favTeams: number[]
}

const AnimationGamesList = ({
  dateArray,
  round,
  favTeams,
}: AnimationGamesListProps) => {
  return (
    <div className="mx-2 xl:mx-0">
      <div>
        {dateArray[round]?.date !== null && (
          <span className="text-sm font-bold md:text-base">
            {dayjs(dateArray[round]?.date).format('D MMMM YYYY') !==
            'Invalid Date'
              ? dayjs(dateArray[round]?.date).format('D MMMM YYYY')
              : 'Saknar speldatum'}
          </span>
        )}
      </div>
      {dateArray[round].games.map((game) => {
        return (
          <div
            key={game.gameId}
            className="flex flex-row justify-between px-2 py-1 text-[10px] even:bg-slate-300 md:text-sm xl:py-2 "
          >
            <div>
              <span
                className={
                  favTeams.includes(game.homeTeamId) ? 'font-bold ' : ''
                }
              >
                {game.homeTeam.casualName}
              </span>
              <span className="w-1 xl:w-4"> - </span>
              <span
                className={
                  favTeams.includes(game.awayTeamId) ? 'font-bold' : ''
                }
              >
                {game.awayTeam.casualName}
              </span>
            </div>
            <div>
              <span className="w-4 pr-2 text-right">{game.homeGoal}</span>
              <span className="w-4 text-center">-</span>
              <span className="w-4 pl-2 text-justify">{game.awayGoal}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AnimationGamesList
