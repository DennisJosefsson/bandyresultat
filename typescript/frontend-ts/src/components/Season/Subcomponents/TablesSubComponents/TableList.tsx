// import { useState, useEffect } from 'react'

// import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'

import { SerieAttributes } from '../../../types/series/series'
import { SortedTablesType } from '../../../utilitycomponents/functions/sortFunction'
// import {
//   sortTitles,

// } from '../../../utilitycomponents/functions/tableSortFunctions'

import DataTable from './DataTable'
import { columns } from './columns'

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from '@/src/@/components/ui/table'

type TableListProps = {
  tableArray: SortedTablesType
  seriesInfo: SerieAttributes[]
  homeAwayTitle: string
  selectedTable: string
}

const TableList = ({
  tableArray,
  seriesInfo,
  homeAwayTitle,
}: TableListProps) => {
  // const [width, setWidth] = useState(window.innerWidth)
  // const [sortColumn, setSortColumn] = useState('tablePointsDesc')
  // const { favTeams } = useTeampreferenceContext()
  // const breakpoint = 576

  // useEffect(() => {
  //   const handleWindowResize = () => setWidth(window.innerWidth)
  //   window.addEventListener('resize', handleWindowResize)

  //   return () => window.removeEventListener('resize', handleWindowResize)
  // }, [])

  // return (
  //   <div className="container mx-auto py-10">
  //     <DataTable columns={columns} data={tableArray} />
  //   </div>
  // )

  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        const serieObject = seriesInfo.find(
          (serie) => serie.serieGroupCode === group.group,
        )
        if (!serieObject) throw new Error('Missing serieObject')
        const serieName = serieObject.serieName
        const teamObject = group.tables.reduce(
          (o, key) => ({ ...o, [key.lag.name]: key.team }),
          {},
        )
        const serieStructure = serieObject.serieStructure
        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') && tableArray.length === 1 ? (
              <>
                <h2 className="ml-1 text-sm font-bold lg:text-base xl:ml-0 xl:text-xl">
                  Kvalgrupp {homeAwayTitle}
                </h2>
                {/* <p className="m-1 text-[8px] sm:text-xs xl:m-0">
                  Sorteras efter {sortTitles[sortColumn]}
                </p> */}
              </>
            ) : (
              <>
                <h2 className="ml-1 text-sm font-bold lg:text-base xl:ml-0 xl:text-xl">
                  {serieName} {homeAwayTitle}
                </h2>
                {/* <p className="m-1 text-[8px] sm:text-xs xl:m-0">
                  Sorteras efter {sortTitles[sortColumn]}
                </p> */}
              </>
            )}
            <div>
              {/* <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Lag</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'gamesDesc' ? 'gamesDesc' : 'gamesAsc',
                        )
                      }
                    >
                      M
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'winDesc' ? 'winDesc' : 'winAsc',
                        )
                      }
                    >
                      V
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'drawDesc' ? 'drawDesc' : 'drawAsc',
                        )
                      }
                    >
                      O
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'lostDesc' ? 'lostDesc' : 'lostAsc',
                        )
                      }
                    >
                      F
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="twelve cursor-pointer"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'scoredDesc'
                            ? 'scoredDesc'
                            : 'scoredAsc',
                        )
                      }
                    >
                      GM
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="cursor-pointer"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'concededDesc'
                            ? 'concededDesc'
                            : 'concededAsc',
                        )
                      }
                    >
                      IM
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="cursor-pointer"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'goalDiffDesc'
                            ? 'goalDiffDesc'
                            : 'goalDiffAsc',
                        )
                      }
                    >
                      MS
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="cursor-pointer"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'tablePointsDesc'
                            ? 'tablePointsDesc'
                            : 'tablePointsAsc',
                        )
                      }
                    >
                      P
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.tables
                    .sort(sortFunctions[sortColumn](group.group, selectedTable))
                    .map((team, index) => {
                      return (
                        <TableRow
                          key={`${team.team}-${index}`}
                          className={`${
                            serieObject.serieStructure?.includes(index + 1)
                              ? 'border-b-2 border-black'
                              : null
                          } ${
                            favTeams.includes(team.team) ? 'font-bold' : null
                          }`}
                        >
                          <TableCell className="pos">{index + 1}</TableCell>
                          <TableCell className="team">
                            {width < breakpoint
                              ? `${team.lag.shortName}`
                              : `${team.lag.name}`}
                          </TableCell>

                          <TableCell>
                            {team.totalWins + team.totalDraws + team.totalLost}
                          </TableCell>
                          <TableCell>{team.totalWins}</TableCell>
                          <TableCell>{team.totalDraws}</TableCell>
                          <TableCell>{team.totalLost}</TableCell>
                          <TableCell>{team.totalGoalsScored}</TableCell>
                          <TableCell>{team.totalGoalsConceded}</TableCell>
                          <TableCell>{team.totalGoalDifference}</TableCell>
                          <TableCell>{team.totalPoints}</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table> */}
              <DataTable
                columns={columns}
                data={group.tables}
                teamObject={teamObject}
                serieStructure={serieStructure}
              />
              {serieObject.comment && (
                <p className="bg-white p-1 text-xs font-bold">
                  {serieObject.comment}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
