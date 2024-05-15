import { Button } from '@/src/@/components/ui/button'
import { GameObjectType } from '@/src/components/types/games/games'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import useTeampreferenceContext from '@/src/hooks/contextHooks/useTeampreferenceContext'
import useUserContext from '@/src/hooks/contextHooks/useUserContext'

import { Link } from '@tanstack/react-router'
import EditGameButton from './EditGameButton'

type GamesListItemProps = {
  startSeason: number
  endSeason: number
  game: GameObjectType
}

const categoryArray = [
  'qualification',
  'regular',
  'eight',
  'quarter',
  'semi',
  'final',
]

const GamesListItem = ({
  game,
  startSeason,
  endSeason,
}: GamesListItemProps) => {
  const { favTeams } = useTeampreferenceContext()
  const { women } = useGenderContext()
  const { user } = useUserContext()

  return (
    <div key={game.gameId} className="flex w-full flex-row items-center gap-1">
      <div className="mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-2 py-0.5 text-[10px] transition-colors hover:bg-slate-100/50 dark:bg-muted/50  dark:hover:bg-slate-800/50  xxs:gap-2 md:text-sm xl:mb-2 xl:w-[36rem] xl:py-1">
        <span
          className={
            favTeams.includes(game.homeTeamId)
              ? 'w-24 font-bold text-primary sm:w-40 lg:w-40 xl:w-52'
              : 'w-24 sm:w-40 lg:w-40 xl:w-52'
          }
        >
          {game.homeTeam.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={
            favTeams.includes(game.awayTeamId)
              ? 'w-24 font-bold text-primary sm:w-40 lg:w-40 xl:w-52'
              : 'w-24 sm:w-40 lg:w-40 xl:w-52'
          }
        >
          {game.awayTeam.casualName}
        </span>

        <span className="w-10 text-right tabular-nums">{game.result}</span>

        {game.halftimeResult && (
          <>
            <span className="w-10 text-right text-[8px] tabular-nums md:text-xs">
              ({game.halftimeResult})
            </span>
          </>
        )}
        <Button asChild size="icon" variant="ghost">
          <Link
            to="/teams/compare"
            search={{
              teamArray: [game.homeTeamId, game.awayTeamId],
              categoryArray: categoryArray,
              startSeason: startSeason.toString(),
              endSeason: endSeason.toString(),
              women: women,
            }}
          >
            H2H
          </Link>
        </Button>
        {user && <EditGameButton game={game} />}
      </div>
    </div>
  )
}

export default GamesListItem
