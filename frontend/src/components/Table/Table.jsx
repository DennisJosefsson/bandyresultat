import { useQuery } from 'react-query'
import { useContext, useState, useEffect } from 'react'
import { maratonTabell } from '../../requests/tables'
import { GenderContext } from '../../contexts/contexts'
import MaratonHelpModal from './MaratonHelp'
import Spinner from '../utilitycomponents/spinner'

const Table = () => {
  const { women, dispatch } = useContext(GenderContext)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { data, isLoading, error } = useQuery('maratonTabell', maratonTabell)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const tabell = data.filter((table) => table.lag.women === women)

  return (
    <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29] flex flex-row-reverse justify-between">
      <div>
        <div>
          <div
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center ml-1 mb-4 lg:mb-6"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
        <div>
          <div
            onClick={() => setShowHelpModal(true)}
            className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center ml-1 mb-4 lg:mb-6"
          >
            Hjälp/Info
          </div>
        </div>
      </div>
      <div className="w-full md:w-4/5">
        <table className="table-auto w-full text-[10px] md:text-xs lg:text-base">
          <thead>
            <tr key={'header'}>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center"
              >
                Pos
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 md:w-[20%] xl:px-1 xl:py-2 text-left"
              >
                Lag
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                M
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                V
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                O
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                F
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                GM
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                IM
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                MS
              </th>
              <th
                scope="col"
                className="px-0.5 py-1 xl:px-1 xl:py-2 text-center md:text-right md:pr-2 xl:pr-4"
              >
                Poä
              </th>
            </tr>
          </thead>
          <tbody>
            {tabell.map((team, index) => {
              return (
                <tr
                  key={`${team.teamId}-${index}`}
                  className="odd:bg-slate-300 rounded"
                >
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 ">
                    {width < breakpoint
                      ? `${team.lag.shortName}`
                      : `${team.lag.name}`}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_games}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_wins}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_draws}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_lost}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_goals_scored}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_goals_conceded}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 text-right tabular-nums">
                    {team.total_goal_difference}
                  </td>
                  <td className="px-0.5 py-1 xl:px-1 xl:py-2 p text-right tabular-nums">
                    {team.total_points}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {showHelpModal ? (
        <>
          <MaratonHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
    </div>
  )
}

export default Table
