import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  UserContext,
  TeamPreferenceContext,
  GenderContext,
} from '../../contexts/contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const GamesList = ({
  gamesArray,
  title,
  setShowModal,
  setGameData,
  seriesInfo,
  startSeason,
  endSeason,
}) => {
  const { user } = useContext(UserContext)
  const { favTeams } = useContext(TeamPreferenceContext)
  const { women } = useContext(GenderContext)
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
          return (
            <div key={group.group} className="mb-6">
              <h3 className="text-[0.75rem] font-bold md:text-base xl:text-xl">
                {gamesArray.length > 1
                  ? `${
                      seriesInfo.find(
                        (serie) => serie.serieGroupCode === group.group,
                      ).serieName
                    }`
                  : ''}
              </h3>

              {seriesInfo.find((serie) => serie.serieGroupCode === group.group)
                .comment && (
                <p className="my-2 max-w-xl bg-white p-1 text-xs font-bold">
                  {
                    seriesInfo.find(
                      (serie) => serie.serieGroupCode === group.group,
                    ).comment
                  }
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={`${date.date}-${Math.random()}`}>
                      {date.date !== 'null' && (
                        <h3 className="text-[0.75rem] md:text-base">
                          {dayjs(date.date).format('D MMMM YYYY')}
                        </h3>
                      )}
                      <div className="w-full">
                        {date.games.map((game) => {
                          return (
                            <div key={game.gameId}>
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
                                <div className="mb-1 flex flex-row items-center justify-between bg-slate-300 px-2 py-0.5 text-[10px] md:text-base xl:mb-2 xl:w-[36rem] xl:py-1">
                                  <span
                                    className={
                                      favTeams.includes(game.homeTeamId)
                                        ? 'w-1/3 font-bold sm:w-2/5 lg:w-40 xl:w-52'
                                        : 'w-1/3 sm:w-2/5 lg:w-40 xl:w-52'
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
                                        ? 'w-1/3 font-bold sm:w-2/5 lg:w-40 xl:w-52'
                                        : 'w-1/3 sm:w-2/5 lg:w-40 xl:w-52'
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
                                      <span className="ml-2 text-right text-[8px] tabular-nums md:text-sm">
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
