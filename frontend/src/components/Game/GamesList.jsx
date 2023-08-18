import { groupConstant } from '../utilitycomponents/constants'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const GamesList = ({ gamesArray, title, setShowModal, setGameData }) => {
  const { user } = useContext(UserContext)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  return (
    <div className="mb-6 font-inter w-full">
      <h1 className="font-bold text-[1rem] md:text-[1.25rem] xl:text-[1.5rem]">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <h3 className="font-bold text-[0.75rem] md:text-base xl:text-xl">
                {gamesArray.length > 1 ? `${groupConstant[group.group]}` : ''}
              </h3>
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
                              className="bg-slate-300 px-2 py-0.5 mb-1 xl:py-1 xl:mb-2 xl:w-[36rem] flex flex-row justify-between text-[10px] md:text-base"
                            >
                              <span className="w-1/3 sm:w-2/5 xl:w-52">
                                {width < breakpoint
                                  ? `${game.homeTeam.casualName}`
                                  : `${game.homeTeam.name}`}
                              </span>
                              <span className="w-1 xl:w-4"> - </span>
                              <span className="w-1/3 sm:w-2/5 xl:w-52">
                                {width < breakpoint
                                  ? `${game.awayTeam.casualName}`
                                  : `${game.awayTeam.name}`}
                              </span>
                              <span className="w-1 xl:w-4 text-right">
                                {game.homeGoal}
                              </span>
                              <span className="w-1">-</span>
                              <span className="w-1 xl:w-4 text-justify">
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
}

export default GamesList
