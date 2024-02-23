import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { GameObjectType } from '../../../types/games/games'

dayjs.locale('sv')

type FinalCardProps = {
  game: GameObjectType
  favTeams: number[]
}

const FinalCard = ({ game, favTeams }: FinalCardProps) => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center rounded bg-white p-2 shadow-md md:mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold">Final</h4>
          <h4 className="text-sm font-bold">
            {dayjs(game.date).format('D MMMM YYYY')}
          </h4>
        </div>
        <div className="mt-1 flex flex-row justify-between text-sm xl:text-lg">
          <span
            className={
              favTeams.includes(game.homeTeam.teamId) ? 'font-bold' : undefined
            }
          >
            {game.homeTeam.name}
          </span>
          -
          <span
            className={
              favTeams.includes(game.awayTeam.teamId) ? 'font-bold' : undefined
            }
          >
            {game.awayTeam.name}
          </span>{' '}
          <span className="text-right tabular-nums">{game.result}</span>
        </div>
      </div>
    </div>
  )
}

export default FinalCard
