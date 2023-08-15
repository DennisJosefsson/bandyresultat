const SeasonHelpModal = ({
  setShowModal,
  final,
  semiTables,
  quarterTables,
  eightTables,
}) => {
  return (
    <>
      <div className="fixed justify-center items-center lg:p-10 flex overflow-x-hidden z-50 outline-none focus:outline-none">
        <div className="fixed inset-2 w-auto my-3 mx-auto max-w-5xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between landscape:p1 p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl xl:text-3xl font-semibold">Slutspel</h3>
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
            <div className="font-inter text-[#011d29] landscape:p-1 p-5">
              <div className="w-full xl:w-[36rem] flex flex-col">
                <h5 className="font-bold text-sm text-right mr-2">Final</h5>
                <div className="self-center mb-2 xl:mb-6">
                  <table className="table-fixed w-24 xl:w-32">
                    <thead>
                      <tr className="text-[0.5rem]">
                        <th scope="col" className="w-20 xl:w-22 p-1 mx-1"></th>
                        <th
                          scope="col"
                          className="w-4 xl:w-8 p-1 mx-1 text-right"
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
                            <td className="text-xs xl:text-lg text-right">
                              {team.total_goals_scored}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {semiTables.length > 0 && (
                  <h5 className="font-bold text-sm text-right mr-2">Semi</h5>
                )}
                <div className="flex flex-row justify-around mb-2 xl:mb-6">
                  {semiTables.map((group, index) => {
                    return (
                      <div
                        key={`${group.group}-${index}`}
                        className="gap-2 m-2"
                      >
                        <table className="w-24 xl:w-32">
                          <thead>
                            <tr className="text-[0.5rem]">
                              <th
                                scope="col"
                                className="w-20 xl:w-22 p-1 mx-1"
                              ></th>
                              <th
                                scope="col"
                                className="w-4 xl:w-8 p-1 mx-1 text-right"
                              ></th>
                            </tr>
                          </thead>
                          {group.tables.map((team) => {
                            return (
                              <tr key={team.teamId}>
                                <td className="text-xs xl:text-lg">
                                  {team.lag.casualName}
                                </td>
                                <td className="text-xs xl:text-lg text-right">
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
                  <h5 className="font-bold text-sm text-right mr-2">Kvart</h5>
                )}
                <div className="flex flex-row justify-around mb-2 xl:mb-6">
                  {quarterTables.map((group) => {
                    return (
                      <div key={group.group}>
                        <table className="w-20 xl:w-32">
                          <thead>
                            <tr className="text-[0.5rem]">
                              <th
                                scope="col"
                                className="w-12 xl:w-22 p-1 mx-1"
                              ></th>
                              <th
                                scope="col"
                                className="w-4 xl:w-8 p-1 mx-1 xl:text-right"
                              ></th>
                            </tr>
                          </thead>
                          {group.tables.map((team) => {
                            return (
                              <tr key={team.teamId}>
                                <td className="hidden xl:contents text-lg">
                                  {team.lag.casualName}
                                </td>
                                <td className="xl:hidden text-xs">
                                  {team.lag.shortName}
                                </td>
                                <td className="text-xs xl:text-lg xl:text-right">
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
                  <h5 className="font-bold text-sm text-right mr-2">
                    Åttondel
                  </h5>
                )}
                <div className="grid grid-cols-2 justify-center justify-items-center mb-2 xl:mb-6">
                  {eightTables.map((group) => {
                    return (
                      <div key={group.group}>
                        <table className="table-fixed w-20 xl:w-30">
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
                                  <td className="text-xs xl:text-lg p-1">
                                    {team.lag.shortName}
                                  </td>
                                  <td className="text-xs xl:text-lg p-1 text-center">
                                    {team.total_points}
                                  </td>
                                  <td className="text-xs xl:text-lg p-1 text-right">
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
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
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

export default SeasonHelpModal
