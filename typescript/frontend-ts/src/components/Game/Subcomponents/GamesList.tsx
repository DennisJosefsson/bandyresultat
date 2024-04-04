import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import useUserContext from '../../../hooks/contextHooks/useUserContext'
import useTeampreferenceContext from '../../../hooks/contextHooks/useTeampreferenceContext'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { GameObjectType } from '../../types/games/games'
import { SortedGamesType } from '../../utilitycomponents/functions/sortFunction'
import { SerieAttributes } from '../../types/series/series'
import { Button } from '@/src/@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

dayjs.locale('sv')

type GameListProps = {
  gamesArray: SortedGamesType
  title: string
  setShowModal: Dispatch<SetStateAction<boolean>>
  setGameData: Dispatch<SetStateAction<GameObjectType | null>>
  seriesInfo: SerieAttributes[]
  startSeason: number | null
  endSeason: number | null
}

const GamesList = ({
  gamesArray,
  title,
  setShowModal,
  setGameData,
  seriesInfo,
  startSeason,
  endSeason,
}: GameListProps) => {
  const { user } = useUserContext()
  const { favTeams } = useTeampreferenceContext()
  const { women } = useGenderContext()
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 1050

  const categoryArray = [
    'qualification',
    'regular',
    'eight',
    'quarter',
    'semi',
    'final',
  ]

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  return (
    <div className="mb-6 w-full font-inter">
      <h1 className="scroll-m-20 text-[1rem] font-semibold tracking-tight md:text-xl">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          const seriesObject = seriesInfo.find(
            (serie) => serie.serieGroupCode === group.group,
          )
          return (
            <div key={group.group} className="mb-6">
              <h3 className="scroll-m-20 text-[0.75rem] font-semibold tracking-tight md:text-base xl:text-lg">
                {gamesArray.length > 1 ? `${seriesObject?.serieName}` : ''}
              </h3>

              {seriesObject && seriesObject.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-xs font-bold">
                  {seriesObject.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={`${date.date}-${Math.random()}`}>
                      {date.date !== 'null' && (
                        <h3 className="text-[0.75rem] md:text-sm">
                          {dayjs(date.date).format('D MMMM YYYY')}
                        </h3>
                      )}
                      <div className="w-full">
                        {date.games.map((game) => {
                          return (
                            <div
                              key={game.gameId}
                              className="flex w-full flex-row items-center gap-1"
                            >
                              <div className="mb-1 flex w-full flex-row items-center justify-between gap-1 px-2 py-0.5 text-[10px] transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 xxs:gap-2 md:text-sm xl:mb-2 xl:w-[36rem] xl:py-1">
                                <span
                                  className={
                                    favTeams.includes(game.homeTeamId)
                                      ? 'w-24 font-bold sm:w-40 lg:w-40 xl:w-52'
                                      : 'w-24 sm:w-40 lg:w-40 xl:w-52'
                                  }
                                >
                                  {width < breakpoint
                                    ? `${game.homeTeam.casualName}`
                                    : `${game.homeTeam.name}`}
                                </span>
                                <span className="w-1 text-center xl:w-4">
                                  {' '}
                                  -{' '}
                                </span>
                                <span
                                  className={
                                    favTeams.includes(game.awayTeamId)
                                      ? 'w-24 font-bold sm:w-40 lg:w-40 xl:w-52'
                                      : 'w-24 sm:w-40 lg:w-40 xl:w-52'
                                  }
                                >
                                  {width < breakpoint
                                    ? `${game.awayTeam.casualName}`
                                    : `${game.awayTeam.name}`}
                                </span>

                                <span className="w-10 text-right tabular-nums">
                                  {game.result}
                                </span>

                                {game.halftimeResult && (
                                  <>
                                    <span className="w-10 text-right text-[8px] tabular-nums md:text-xs">
                                      ({game.halftimeResult})
                                    </span>
                                  </>
                                )}
                                <Button asChild size="icon" variant="ghost">
                                  <Link
                                    to="/teams"
                                    state={{
                                      compObject: {
                                        teamArray: [
                                          game.homeTeamId,
                                          game.awayTeamId,
                                        ],
                                        categoryArray: categoryArray,
                                        startSeason: startSeason?.toString(),
                                        endSeason: endSeason?.toString(),
                                        women: women,
                                      },
                                      origin: 'gamesList',
                                    }}
                                  >
                                    H2H
                                  </Link>
                                </Button>
                                {user && (
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setGameData(game)
                                      setShowModal(true)
                                    }}
                                    size="icon"
                                  >
                                    <PlusIcon />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
