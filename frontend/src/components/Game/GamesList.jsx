import { groupConstant } from '../utilitycomponents/constants'
import { useContext } from 'react'
import { UserContext } from '../../contexts/contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const GamesList = ({ gamesArray, title, setShowModal, setGameData }) => {
  const { user } = useContext(UserContext)
  return (
    <div className="mb-6">
      <h1 className="font-inter text-2xl">{title}</h1>
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <h3 className="font-bold">
                {gamesArray.length > 1 ? `${groupConstant[group.group]}` : ''}
              </h3>
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      <h3>{dayjs(date.date).format('D MMMM YYYY')}</h3>
                      <div>
                        {date.games.map((game) => {
                          return (
                            <div
                              key={game.gameId}
                              className="bg-slate-300 px-2 py-1 mb-2 w-[36rem] flex flex-row justify-between"
                            >
                              <span className="w-52">{game.homeTeam.name}</span>
                              <span className="w-4"> - </span>
                              <span className="w-52">{game.awayTeam.name}</span>
                              <span className="w-4 text-right">
                                {game.homeGoal}
                              </span>
                              <span className="w-1">-</span>
                              <span className="w-4 text-justify">
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
