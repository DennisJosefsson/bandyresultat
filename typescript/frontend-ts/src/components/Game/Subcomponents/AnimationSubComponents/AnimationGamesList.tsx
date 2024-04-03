import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { GameObjectWithSeasonType } from '../../../types/games/games'
import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'

dayjs.locale('sv')

type DateArrayItem = {
  date: string
  games: GameObjectWithSeasonType[]
}

type AnimationGamesListProps = {
  dateArray: DateArrayItem[]
  round: number
}

const AnimationGamesList = ({ dateArray, round }: AnimationGamesListProps) => {
  const { favTeams } = useTeampreferenceContext()

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
      {dateArray[round]?.games.map((game) => {
        return (
          <div
            key={game.gameId}
            className="flex flex-row justify-between border-b px-2 py-1 text-[10px] transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 md:text-sm xl:py-2 "
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
              <span className="w-4 pr-2 text-right tabular-nums">
                {game.homeGoal}
              </span>
              <span className="w-4 text-center">-</span>
              <span className="w-4 pl-2 text-justify tabular-nums">
                {game.awayGoal}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AnimationGamesList
