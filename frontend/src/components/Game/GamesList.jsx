import { groupConstant } from '../utilitycomponents/constants'
import { useContext, useState, useEffect, forwardRef } from 'react'
import { UserContext, TeamPreferenceContext } from '../../contexts/contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const GamesList = forwardRef(function GamesList(
  { gamesArray, title, setShowModal, setGameData, seriesInfo },
  ref,
) {
  const { user } = useContext(UserContext)
  const { favTeams } = useContext(TeamPreferenceContext)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  return (
    <div className="mb-6 w-full font-inter" ref={ref}>
      <h1 className="text-[1rem] font-bold md:text-[1.25rem] xl:text-[1.5rem]">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <h3 className="text-[0.75rem] font-bold md:text-base xl:text-xl">
                {gamesArray.length > 1 ? `${groupConstant[group.group]}` : ''}
              </h3>
              {seriesInfo.find((serie) => serie.serieGroupCode === group.group)
                .comment != null && (
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
                      <div className="w-full sm:w-2/3">
                        {date.games.map((game) => {
                          return (
                            <div
                              key={game.gameId}
                              className="mb-1 flex flex-row justify-between bg-slate-300 px-2 py-0.5 text-[10px] md:text-base xl:mb-2 xl:w-[36rem] xl:py-1"
                            >
                              <span
                                className={
                                  favTeams.includes(game.homeTeamId)
                                    ? 'w-1/3 font-bold sm:w-2/5 xl:w-52'
                                    : 'w-1/3 sm:w-2/5 xl:w-52'
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
                                    ? 'w-1/3 font-bold sm:w-2/5 xl:w-52'
                                    : 'w-1/3 sm:w-2/5 xl:w-52'
                                }
                              >
                                {width < breakpoint
                                  ? `${game.awayTeam.casualName}`
                                  : `${game.awayTeam.name}`}
                              </span>
                              <span className="w-1 text-right xl:w-4">
                                {game.homeGoal}
                              </span>
                              <span className="w-1">-</span>
                              <span className="w-1 text-justify xl:w-4">
                                {game.awayGoal}
                              </span>
                              {user && (
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setGameData(game)
                                    setShowModal(true)
                                  }}
                                >
                                  [Ändra]
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
})

export default GamesList
