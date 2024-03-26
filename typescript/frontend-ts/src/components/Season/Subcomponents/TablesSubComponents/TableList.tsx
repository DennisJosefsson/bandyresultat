// import { useState, useEffect } from 'react'

import { SerieAttributes } from '../../../types/series/series'
import { SortedTablesType } from '../../../utilitycomponents/functions/sortFunction'

import DataTable from './DataTable'
import { columns } from './columns'

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
