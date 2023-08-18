import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const StatsModal = ({
  setShowModal,
  firstGames,
  latestGames,
  golds,
  playoffs,
  seasons,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Statistik</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 font-inter text-[#011d29] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
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
            <div className="font-inter text-[#011d29] p-5">
              <div className="flex flex-col justify-start">
                <div>
                  <h3 className="text-lg font-bold">Första matcherna</h3>
                  <table className="mb-3">
                    <thead>
                      <tr key={`head-first-games`}>
                        <th scope="col" className="w-60 px-1 py-2"></th>
                        <th scope="col" className="w-60 px-1 py-2"></th>
                        <th scope="col" className="w-16 px-1 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {firstGames.map((game) => {
                        return (
                          <tr
                            key={game.game_id}
                            className="odd:bg-slate-300 rounded"
                          >
                            <td className="px-1 py-1">
                              {game.date && (
                                <span>
                                  {dayjs(game.date).format('D MMMM YYYY')}:
                                </span>
                              )}
                            </td>
                            <td className="px-1 py-1">
                              {game.home_name}-{game.away_name}
                            </td>
                            <td className="px-1 py-1">{game.result}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Senaste matcherna</h3>
                  <table className="mb-3">
                    <thead>
                      <tr key={`head-latest-games`}>
                        <th scope="col" className="w-60 px-1 py-2"></th>
                        <th scope="col" className="w-60 px-1 py-2"></th>
                        <th scope="col" className="w-16 px-1 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestGames.map((game) => {
                        return (
                          <tr
                            key={game.game_id}
                            className="odd:bg-slate-300 rounded"
                          >
                            <td className="px-1 py-1">
                              {game.date && (
                                <span>
                                  {dayjs(game.date).format('D MMMM YYYY')}:
                                </span>
                              )}
                            </td>
                            <td className="px-1 py-1">
                              {game.home_name}-{game.away_name}
                            </td>
                            <td className="px-1 py-1">{game.result}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Säsonger</h3>
                  <table className="mb-3 w-56">
                    <thead>
                      <tr key={`head-seasons`}>
                        <th
                          scope="col"
                          className="w-32 px-1 py-2 text-left"
                        ></th>
                        <th
                          scope="col"
                          className="w-8 px-1 py-2 text-right"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasons.map((team) => {
                        return (
                          <tr
                            key={team.team}
                            className="odd:bg-slate-300 rounded"
                          >
                            <td className="px-1 py-1">{team.casual_name}</td>
                            <td className="px-1 py-1 text-right">
                              {team.seasons}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Slutspel</h3>
                  <table className="mb-3 w-56">
                    <thead>
                      <tr key={`head-playoffs`}>
                        <th
                          scope="col"
                          className="w-32 px-1 py-2 text-left"
                        ></th>
                        <th
                          scope="col"
                          className="w-8 px-1 py-2 text-right"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {playoffs.map((team) => {
                        return (
                          <tr
                            key={team.team}
                            className="odd:bg-slate-300 rounded"
                          >
                            <td className="px-1 py-1">{team.casual_name}</td>
                            <td className="px-1 py-1 text-right">
                              {team.playoffs}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-lg font-bold">SM-Guld</h3>
                  <table className="mb-3 w-56">
                    <thead>
                      <tr key={`head-golds`}>
                        <th scope="col" className="w-32 px-1 py-2"></th>
                        <th scope="col" className="w-8 px-1 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {golds.map((team) => {
                        return (
                          <tr
                            key={team.team}
                            className="odd:bg-slate-300 rounded"
                          >
                            <td className="px-1 py-1">{team.casual_name}</td>
                            <td className="px-1 py-1 text-right">
                              {team.guld}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 bg-slate-200 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default StatsModal
