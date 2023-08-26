import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const PlayoffSeriesPopup = ({ gameData, setGameData, setShowPlayoffGames }) => {
  return (
    <div className="fixed inset-x-2 bottom-40 z-50 flex flex-col items-center rounded border-2 border-[#011d29] bg-white object-center p-1 text-[10px] sm:inset-x-20 sm:text-sm md:inset-x-40">
      <div>
        <ul>
          {gameData.map((game, index) => (
            <li key={`${game.date}-${index}`}>
              {game.date !== null && (
                <span>{dayjs(game.date).format('D MMMM YYYY')}:</span>
              )}
              <span> {game.homeTeam.casualName}</span>-
              <span>{game.awayTeam.casualName}</span> <span>{game.result}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          onClick={() => {
            setGameData(null)
            setShowPlayoffGames(false)
          }}
          className="mb-1 mt-2 cursor-pointer bg-slate-200 px-2 py-1 font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
        >
          Stäng
        </div>
      </div>
    </div>
  )
}

const SeasonHelpModal = ({
  setShowModal,
  final,
  semiTables,
  quarterTables,
  eightTables,
  playoffGames,
}) => {
  const [gameData, setGameData] = useState(null)
  const [showPlayoffGames, setShowPlayoffGames] = useState(false)

  return (
    <>
      <div className="fixed z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none lg:p-10">
        <div className="fixed inset-2 mx-auto my-3 w-auto max-w-5xl overflow-y-auto">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="landscape:p1 flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-xl font-semibold xl:text-3xl">Slutspel</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 font-inter text-3xl font-semibold leading-none text-[#011d29] outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="black"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-5 font-inter text-[#011d29] landscape:p-1">
              <div className="flex w-full flex-col xl:w-[36rem]">
                <h5 className="mr-2 text-right text-sm font-bold">Final</h5>
                <div className="mb-2 self-center xl:mb-6">
                  <table className="w-24 table-fixed xl:w-32">
                    <thead>
                      <tr key="header" className="text-[0.5rem]">
                        <th scope="col" className="xl:w-22 mx-1 w-20 p-1"></th>
                        <th
                          scope="col"
                          className="mx-1 w-4 p-1 text-right xl:w-8"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {final.map((team, index) => {
                        return (
                          <tr key={`${team.teamId}-${index}`}>
                            <td className="text-xs xl:text-lg">
                              {team.lag.casualName}
                            </td>
                            <td className="text-right text-xs xl:text-lg">
                              {team.total_goals_scored}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {semiTables.length > 0 && (
                  <h5 className="mr-2 text-right text-sm font-bold">Semi</h5>
                )}
                <div className="mb-2 flex flex-row justify-around xl:mb-6">
                  {semiTables.map((group, index) => {
                    return (
                      <div
                        key={`${group.group}-${index}`}
                        className="m-2 cursor-pointer gap-2"
                        onClick={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                      >
                        <table className="w-24 xl:w-32">
                          <thead>
                            <tr className="text-[0.5rem]">
                              <th
                                scope="col"
                                className="xl:w-22 mx-1 w-20 p-1"
                              ></th>
                              <th
                                scope="col"
                                className="mx-1 w-4 p-1 text-right xl:w-8"
                              ></th>
                            </tr>
                          </thead>
                          {group.tables.map((team) => {
                            return (
                              <tr key={team.teamId}>
                                <td className="text-xs xl:text-lg">
                                  {team.lag.casualName}
                                </td>
                                <td className="text-right text-xs xl:text-lg">
                                  {team.total_wins}
                                </td>
                              </tr>
                            )
                          })}
                        </table>
                      </div>
                    )
                  })}
                </div>
                {quarterTables.length > 0 && (
                  <h5 className="mr-2 text-right text-sm font-bold">Kvart</h5>
                )}
                <div className="mb-2 flex flex-row justify-around xl:mb-6">
                  {quarterTables.map((group) => {
                    return (
                      <div
                        className=" cursor-pointer"
                        key={group.group}
                        onClick={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                      >
                        <table className="w-20 xl:w-32">
                          <thead>
                            <tr className="text-[0.5rem]">
                              <th
                                scope="col"
                                className="xl:w-22 mx-1 w-12 p-1"
                              ></th>
                              <th
                                scope="col"
                                className="mx-1 w-4 p-1 xl:w-8 xl:text-right"
                              ></th>
                            </tr>
                          </thead>
                          {group.tables.map((team) => {
                            return (
                              <tr key={team.teamId}>
                                <td className="hidden text-lg xl:contents">
                                  {team.lag.casualName}
                                </td>
                                <td className="text-xs xl:hidden">
                                  {team.lag.shortName}
                                </td>
                                <td className="text-xs xl:text-right xl:text-lg">
                                  {team.total_wins}
                                </td>
                              </tr>
                            )
                          })}
                        </table>
                      </div>
                    )
                  })}
                </div>
                {eightTables.length > 0 && (
                  <h5 className="mr-2 text-right text-sm font-bold">
                    Åttondel
                  </h5>
                )}
                <div className="mb-2 grid grid-cols-2 justify-center justify-items-center xl:mb-6">
                  {eightTables.map((group) => {
                    return (
                      <div
                        className="cursor-pointer"
                        key={group.group}
                        onClick={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                      >
                        <table className="xl:w-30 w-20 table-fixed">
                          <thead>
                            <tr key="header-row" className="text-[0.5rem]">
                              <th scope="col" className="w-16 p-1"></th>
                              <th scope="col" className="w-6 p-1">
                                P
                              </th>

                              <th scope="col" className="w-6 p-1 xl:text-right">
                                MS
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.tables.map((team) => {
                              return (
                                <tr key={team.teamId}>
                                  <td className="p-1 text-xs xl:text-lg">
                                    {team.lag.shortName}
                                  </td>
                                  <td className="p-1 text-center text-xs xl:text-lg">
                                    {team.total_points}
                                  </td>
                                  <td className="p-1 text-right text-xs xl:text-lg">
                                    {team.total_goal_difference}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-2">
              <button
                className="mb-1 mr-1 bg-slate-200 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
        {showPlayoffGames ? (
          <>
            <PlayoffSeriesPopup
              gameData={gameData}
              setGameData={setGameData}
              setShowPlayoffGames={setShowPlayoffGames}
            />
          </>
        ) : null}
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default SeasonHelpModal
