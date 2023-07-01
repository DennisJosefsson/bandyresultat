import { useQuery, useMutation } from 'react-query'
import { getSingleSeason, postTeamSeason } from '../../requests/seasons'
import { getSingleSeasonTable, postTable } from '../../requests/tables'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../utilitycomponents/spinner'
import MetadataForm from '../Metadata/MetadataForm'
import TableForm from '../Table/TableForm'
import TeamSeasonForm from './TeamSeasonForm'
import GameForm from '../Game/GameForm'
import { postMetadata } from '../../requests/metadata'
import { postGame } from '../../requests/games'
import { groupConstant } from '../utilitycomponents/constants'

import { LeftArrow, RightArrow } from '../utilitycomponents/icons'

const Season = () => {
  const seasonId = parseInt(useParams().seasonId)

  const [showMetadataModal, setShowMetadataModal] = useState(false)
  const [showTableModal, setShowTableModal] = useState(false)
  const [showTeamSeasonModal, setShowTeamSeasonModal] = useState(false)
  const [showAddGameModal, setShowAddGameModal] = useState(false)

  const metadataMutation = useMutation({
    mutationFn: postMetadata,
  })
  const tableMutation = useMutation({
    mutationFn: postTable,
  })
  const teamSeasonMutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const postGameMutation = useMutation({
    mutationFn: postGame,
  })

  const {
    data: season,
    isLoading,
    error,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))
  const {
    data: tables,
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

  const semiGroups = unsortedSemiTables.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {})

  const semiTables = Object.keys(semiGroups).map((group) => {
    return {
      group,
      tables: semiGroups[group],
    }
  })

  const quarterGroups = unsortedQuarterTables.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {})

  const quarterTables = Object.keys(quarterGroups).map((group) => {
    return {
      group,
      tables: quarterGroups[group],
    }
  })

  const eightGroups = unsortedEightTables.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {})

  const eightTables = Object.keys(eightGroups).map((group) => {
    return {
      group,
      tables: eightGroups[group],
    }
  })
  const regularGroups = unsortedRegularTables.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {})

  const regularTables = Object.keys(regularGroups).map((group) => {
    return {
      group,
      tables: regularGroups[group],
    }
  })
  const qualificationGroups = unsortedQualificationTables.reduce(
    (groups, table) => {
      if (!groups[table.group]) {
        groups[table.group] = []
      }
      groups[table.group].push(table)
      return groups
    },
    {}
  )

  const qualificationTables = Object.keys(qualificationGroups).map((group) => {
    return {
      group,
      tables: qualificationGroups[group],
    }
  })

  const sortOrder = [
    'S1',
    'S2',
    'Q1',
    'Q2',
    'Q3',
    'Q4',
    'E1',
    'E2',
    'E3',
    'E4',
    'elitserien',
    'ElitA',
    'ElitB',
    'allsvenskan',
    'AllsvNorr',
    'AllsvSyd',
    'Div1Norr',
    'Div1Syd',
    'AvdA',
    'AvdB',
    'AvdC',
    'AvdD',
    'KvalA',
    'KvalB',
    'Div1NorrA',
    'Div1NorrB',
    'Div1SydA',
    'Div1SydB',
    'NedflyttningNorr',
    'NedflyttningSyd',
  ]

  semiTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })

  quarterTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })

  eightTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })
  regularTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })

  qualificationTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })

  return (
    <div className="max-w-6xl mx-auto font-inter text-[#011d29] flex flex-col">
      <div className="flex flex-row justify-evenly">
        {seasonId - 1 === 0 ? null : (
          <Link to={`/season/${seasonId - 1}`}>
            <LeftArrow />
          </Link>
        )}
        <h2 className="leading-4 text-center text-2xl font-bold mb-4">
          Säsong {season.year} {season.women ? 'Damer' : 'Herrar'}
        </h2>
        <Link to={`/season/${seasonId + 1}`}>
          <RightArrow />
        </Link>
      </div>
      <div className="flex flex-row-reverse justify-between gap-2">
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
                {final.map((team) => {
                  return (
                    <tr key={team.teamId}>
                      <td>{team.lag.casualName}</td>
                      <td className="text-right">{team.total_goals_scored}</td>
                    </tr>
                  )
                })}
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
            {/* {season.metadatum ? (
            <div className="">
              <p>{season.metadatum.name}</p>
              <p>SM-guld: {season.metadatum.winnerName}</p>
              <p>Finalstad: {season.metadatum.hostCity}</p>
              <p>Finaldatum: {season.metadatum.finalDate}</p>
            </div>
          ) : null} */}
          </div>
          <div className="justify-self-center">
            <p>
              <button onClick={() => setShowMetadataModal(true)}>
                Redigera metadata
              </button>
            </p>
            {showMetadataModal ? (
              <>
                <MetadataForm
                  seasonId={seasonId}
                  name={season.year}
                  teams={season.teams.filter(
                    (team) => !team.teamseason.qualification
                  )}
                  mutation={metadataMutation}
                  setShowModal={setShowMetadataModal}
                />
              </>
            ) : null}
            <p>
              <button onClick={() => setShowTableModal(true)}>
                Lägg till tabelldata
              </button>
            </p>
            {showTableModal ? (
              <>
                <TableForm
                  seasonId={seasonId}
                  name={season.year}
                  teams={season.teams}
                  mutation={tableMutation}
                  setShowModal={setShowTableModal}
                />
              </>
            ) : null}
            <p>
              <button onClick={() => setShowTeamSeasonModal(true)}>
                Lägg till lag
              </button>
            </p>
            {showTeamSeasonModal ? (
              <>
                <TeamSeasonForm
                  seasonId={seasonId}
                  mutation={teamSeasonMutation}
                  setShowModal={setShowTeamSeasonModal}
                />
              </>
            ) : null}
            <p>
              <button onClick={() => setShowAddGameModal(true)}>
                Lägg till Match
              </button>
            </p>
            {showAddGameModal ? (
              <>
                <GameForm
                  teams={season.teams}
                  seasonId={seasonId}
                  mutation={postGameMutation}
                  setShowModal={setShowAddGameModal}
                />
              </>
            ) : null}
            <p>
              <Link
                to={`/games/${seasonId}`}
                state={{ seasonId: seasonId, teams: season.teams }}
              >
                Visa matcherna.
              </Link>
            </p>
          </div>
        </div>
        <div className=" w-[36rem]">
          {regularTables.length > 0 && (
            <div className="mb-6">
              {regularTables.map((group) => {
                return (
                  <div key={group.group}>
                    <h2 className="text-bold text-xl">
                      {groupConstant[group.group]}
                    </h2>
                    <div>
                      <table className="table-fixed w-[36rem]">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-center"
                            >
                              Pos
                            </th>
                            <th
                              scope="col"
                              className="w-72 px-1 py-2 text-left"
                            >
                              Lag
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              M
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              V
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              O
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              F
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              GM
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              IM
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              MS
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              P
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.tables.map((team, index) => {
                            return (
                              <tr
                                key={team.teamId}
                                className="odd:bg-slate-300 rounded"
                              >
                                <td className="px-1 py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="px-1 py-2">{team.lag.name}</td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_games}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_wins}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_draws}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_lost}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goals_scored}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goals_conceded}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goal_difference}
                                </td>
                                <td className="px-1 py-2 p text-right">
                                  {team.total_points}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {qualificationTables.length > 0 && (
            <div className="mb-6">
              {qualificationTables.map((group) => {
                return (
                  <div key={group.group}>
                    <h2 className="text-bold text-xl">
                      {qualificationTables.length > 1
                        ? `${groupConstant[group.group]}`
                        : 'Kvalgrupp'}
                    </h2>
                    <div>
                      <table className="table-fixed w-[36rem]">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-center"
                            >
                              Pos
                            </th>
                            <th
                              scope="col"
                              className="w-72 px-1 py-2 text-left"
                            >
                              Lag
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              M
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              V
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              O
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              F
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              GM
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              IM
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              MS
                            </th>
                            <th
                              scope="col"
                              className="w-8 px-1 py-2 text-right"
                            >
                              P
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.tables.map((team, index) => {
                            return (
                              <tr
                                key={team.teamId}
                                className="odd:bg-slate-300 rounded"
                              >
                                <td className="px-1 py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="px-1 py-2 ">{team.lag.name}</td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_games}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_wins}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_draws}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_lost}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goals_scored}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goals_conceded}
                                </td>
                                <td className="px-1 py-2 text-right">
                                  {team.total_goal_difference}
                                </td>
                                <td className="px-1 py-2 p text-right">
                                  {team.total_points}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Season
