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
      <h1 className="text-[1rem] font-bold md:text-[1.25rem]">{title}</h1>
      <div>
        {gamesArray.map((group) => {
          const seriesObject = seriesInfo.find(
            (serie) => serie.serieGroupCode === group.group,
          )
          return (
            <div key={group.group} className="mb-6">
              <h3 className="text-[0.75rem] font-bold md:text-base xl:text-lg">
                {gamesArray.length > 1 ? `${seriesObject?.serieName}` : ''}
              </h3>

              {seriesObject && seriesObject.comment && (
                <p className="my-2 max-w-xl bg-white p-1 text-xs font-bold">
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
                              <Link
                                to="/teams"
                                state={{
                                  compObject: {
                                    teamArray: [
                                      game.homeTeamId,
                                      game.awayTeamId,
                                    ],
                                    categoryArray: categoryArray,
                                    startSeason: startSeason,
                                    endSeason: endSeason,
                                    women: women,
                                  },
                                  origin: 'gamesList',
                                }}
                              >
                                <div className="mb-1 flex w-full flex-row items-center justify-between gap-1 bg-slate-300 px-2 py-0.5 text-[10px] xxs:gap-2 md:text-sm xl:mb-2 xl:w-[36rem] xl:py-1">
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
                                  <span className="w-1 xl:w-4"> - </span>
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
                                      <span className="ml-2 text-right text-[8px] tabular-nums md:text-xs">
                                        ({game.halftimeResult})
                                      </span>
                                    </>
                                  )}
                                </div>
                              </Link>
                              {user && (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setGameData(game)
                                    setShowModal(true)
                                  }}
                                >
                                  [Ä]
                                </span>
                              )}
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
