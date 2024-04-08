//import { useState, useEffect } from 'react'
import { StaticSeasonTable } from '../../../types/tables/tables'
import { SerieAttributes } from '../../../types/series/series'

import DataTable from './StaticDataTable'
import { columns } from './staticColumns'

type StaticTableListProps = {
  tableArray: StaticSeasonTable[]
  seriesInfo: SerieAttributes[]
  serieName: string
}

const StaticTableList = ({
  tableArray,
  seriesInfo,
  serieName,
}: StaticTableListProps) => {
  const group = tableArray[0]?.group

  const serieObject = seriesInfo.find((serie) => serie.serieGroupCode === group)
  if (!serieObject) throw new Error('Missing serie object')

  const teamObject = tableArray.reduce(
    (o, key) => ({ ...o, [key.team.name]: key.teamId }),
    {},
  )

  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {serieName}
        </h2>

        <div>
          <DataTable
            columns={columns}
            data={tableArray}
            serieStructure={serieObject.serieStructure}
            teamObject={teamObject}
          />
          {serieObject.comment != null && (
            <p className="bg-background p-1 text-xs font-bold">
              {serieObject.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
