import { useQuery } from 'react-query'
import { useContext, useState } from 'react'
import { maratonTabell } from '../../requests/tables'
import { GenderContext } from '../../contexts/contexts'
import MaratonHelpModal from './MaratonHelp'
import Spinner from '../utilitycomponents/spinner'

const Table = () => {
  const { women, dispatch } = useContext(GenderContext)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { data, isLoading, error } = useQuery('maratonTabell', maratonTabell)

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
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center mb-6"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
        <div>
          <div
            onClick={() => setShowHelpModal(true)}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center mb-6"
          >
            Hjälp/Info
          </div>
        </div>
      </div>
      <div>
        <table className="table-auto w-[52rem]">
          <thead>
            <tr key={'header'}>
              <th scope="col" className="px-1 py-2 text-center">
                Pos
              </th>
              <th scope="col" className="px-1 py-2 text-left">
                Lag
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                M
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                V
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                O
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                F
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                GM
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                IM
              </th>
              <th scope="col" className="px-1 py-2 text-center">
                MS
              </th>
              <th scope="col" className="px-1 py-2 text-center">
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
                  <td className="px-1 py-2 text-center">{index + 1}</td>
                  <td className="px-1 py-2 ">{team.lag.name}</td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_games}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_wins}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_draws}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_lost}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_goals_scored}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_goals_conceded}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {team.total_goal_difference}
                  </td>
                  <td className="px-1 py-2 p text-right tabular-nums">
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
