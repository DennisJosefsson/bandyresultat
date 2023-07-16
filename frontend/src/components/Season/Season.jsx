import { useQuery } from 'react-query'
import { getSingleSeason } from '../../requests/seasons'
import { getSingleSeasonTable } from '../../requests/tables'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import { GenderContext } from '../../contexts/genderContext'
import Spinner from '../utilitycomponents/spinner'

import TableList from './TableList'

import { tableSortFunction } from '../utilitycomponents/sortFunction'
import { LeftArrow, RightArrow } from '../utilitycomponents/icons'

const Season = () => {
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)

  const {
    data: season,
    isLoading,
    error,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))
  const {
    data,
    isLoading: isTableLoading,
    error: tableError,
  } = useQuery(['singleSeasonTable', seasonId], () =>
    getSingleSeasonTable(seasonId)
  )
  if (isLoading || isTableLoading) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || tableError) {
    return (
      <div className="max-w-6xl min-h-screen mx-auto font-inter text-[#011d29]">
        There was an error
      </div>
    )
  }

  const tables = data.filter((table) => table.women === women)

  const final = tables.filter((table) => table.category === 'final')
  const unsortedSemiTables = tables.filter((table) => table.category === 'semi')
  const unsortedQuarterTables = tables.filter(
    (table) => table.category === 'quarter'
  )
  const unsortedEightTables = tables.filter(
    (table) => table.category === 'eight'
  )
  const unsortedRegularTables = tables.filter(
    (table) => table.category === 'regular'
  )
  const unsortedQualificationTables = tables.filter(
    (table) => table.category === 'qualification'
  )

  const semiTables = tableSortFunction(unsortedSemiTables)
  const quarterTables = tableSortFunction(unsortedQuarterTables)
  const eightTables = tableSortFunction(unsortedEightTables)
  const regularTables = tableSortFunction(unsortedRegularTables)
  const qualificationTables = tableSortFunction(unsortedQualificationTables)

  return (
    <div className="max-w-6xl mx-auto font-inter text-[#011d29] flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-evenly w-[52rem]">
          {seasonId - 1 === 1906 ? null : (
            <Link to={`/season/${seasonId - 1}`}>
              <LeftArrow />
            </Link>
          )}
          <h2 className="leading-4 text-center text-2xl font-bold mb-4">
            Säsong {season[0].year} {women ? 'Damer' : 'Herrar'}
          </h2>
          <Link to={`/season/${seasonId + 1}`}>
            <RightArrow />
          </Link>
        </div>
        <div>
          <div
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
          <div className="text-right mt-2 mb-4">
            <Link to={`/games/${seasonId}`}>[Matcher]</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <div className="m-0 justify-self-center text-base">
          <h2 className="text-bold text-xl text-right">Slutspel</h2>

          <div className="w-[36rem] flex flex-col">
            <h5 className="text-bold text-sm text-right">Final</h5>
            <div className="self-center mb-6">
              <table className="table-fixed w-32">
                <thead>
                  <tr className="text-[0.5rem]">
                    <th scope="col" className="w-22 p-1 mx-1"></th>
                    <th scope="col" className="w-8 p-1 mx-1 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {final.map((team, index) => {
                    return (
                      <tr key={`${team.teamId}-${index}`}>
                        <td>{team.lag.casualName}</td>
                        <td className="text-right">
                          {team.total_goals_scored}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {semiTables.length > 0 && (
              <h5 className="text-bold text-sm text-right">Semi</h5>
            )}
            <div className="flex flex-row justify-around mb-6">
              {semiTables.map((group) => {
                return (
                  <div key={group.group} className="gap-2 m-2">
                    <table className="table-fixed w-32">
                      <thead>
                        <tr className="text-[0.5rem]">
                          <th scope="col" className="w-22 p-1 mx-1"></th>
                          <th
                            scope="col"
                            className="w-8 p-1 mx-1 text-right"
                          ></th>
                        </tr>
                      </thead>
                      {group.tables.map((team) => {
                        return (
                          <tr key={team.teamId}>
                            <td>{team.lag.casualName}</td>
                            <td className="text-right">{team.total_wins}</td>
                          </tr>
                        )
                      })}
                    </table>
                  </div>
                )
              })}
            </div>
            {quarterTables.length > 0 && (
              <h5 className="text-bold text-sm text-right">Kvart</h5>
            )}
            <div className="flex flex-row justify-around mb-6">
              {quarterTables.map((group) => {
                return (
                  <div key={group.group}>
                    <table className="table-fixed w-32">
                      <thead>
                        <tr className="text-[0.5rem]">
                          <th scope="col" className="w-22 p-1 mx-1"></th>
                          <th
                            scope="col"
                            className="w-8 p-1 mx-1 text-right"
                          ></th>
                        </tr>
                      </thead>
                      {group.tables.map((team) => {
                        return (
                          <tr key={team.teamId}>
                            <td>{team.lag.casualName}</td>
                            <td className="text-right">{team.total_wins}</td>
                          </tr>
                        )
                      })}
                    </table>
                  </div>
                )
              })}
            </div>
            {eightTables.length > 0 && (
              <h5 className="text-bold text-sm text-right">Åttondel</h5>
            )}
            <div className="flex flex-row justify-around flex-wrap mb-6">
              {eightTables.map((group) => {
                return (
                  <div key={group.group}>
                    <table className="table-fixed w-30">
                      <thead>
                        <tr className="text-[0.5rem]">
                          <th scope="col" className="w-16 p-1"></th>
                          <th scope="col" className="w-6 p-1">
                            P
                          </th>

                          <th scope="col" className="w-6 p-1 text-right">
                            MS
                          </th>
                        </tr>
                      </thead>
                      {group.tables.map((team) => {
                        return (
                          <tr key={team.teamId}>
                            <td className="p-1">{team.lag.shortName}</td>
                            <td className="p-1 text-center">
                              {team.total_points}
                            </td>
                            <td className="p-1 text-right">
                              {team.total_goal_difference}
                            </td>
                          </tr>
                        )
                      })}
                    </table>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <div className=" w-[36rem]">
            {regularTables.length > 0 && (
              <TableList tableArray={regularTables} />
            )}
            {qualificationTables.length > 0 && (
              <TableList tableArray={qualificationTables} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Season
