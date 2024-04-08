//import { useState, useEffect } from 'react'
import { MaratonTabell } from '../../../types/tables/tables'

import { columns } from './columns'
import DataTable from './DataTable'

const MaratonTables = ({ tabell }: { tabell: MaratonTabell[] }) => {
  const teamObject = tabell.reduce(
    (o, key) => ({ ...o, [key.lag.casualName]: key.team }),
    {},
  )

  return (
    <div className="w-full">
      <DataTable columns={columns} data={tabell} teamObject={teamObject} />
    </div>
  )
}

export default MaratonTables
