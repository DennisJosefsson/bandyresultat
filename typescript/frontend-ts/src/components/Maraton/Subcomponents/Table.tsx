import { useQuery } from 'react-query'
import { useState, useEffect, useRef } from 'react'
import { maratonTabell } from '../../../requests/tables'

import MaratonTableHeader from './MaratonTableSubComponents/MaratonTableHeader'
import MaratonTables from './MaratonTableSubComponents/MaratonTables'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../../utilitycomponents/Components/ScrollRefComponent'

const Table = ({ women }: { women: boolean }) => {
  const [selectedTable, setSelectedTable] = useState('all')
  const [homeAwayTitle, setHomeAwayTitle] = useState('')
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  const { data, isLoading, error, isSuccess } = useQuery(
    'maratonTabell',
    maratonTabell,
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  let tabell
  switch (selectedTable) {
    case 'all':
      if (isSuccess)
        tabell = data.maratonTabell.filter((table) => table.women === women)
      break
    case 'home':
      if (isSuccess)
        tabell = data.maratonHemmaTabell.filter(
          (table) => table.women === women,
        )
      break
    case 'away':
      if (isSuccess)
        tabell = data.maratonBortaTabell.filter(
          (table) => table.women === women,
        )
      break
    default:
      return <div>Väntar...</div>
  }

  return (
    <>
      {tabell && (
        <div ref={topRef}>
          <h2 className="mt-4 text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
            Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
          </h2>

          <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
            <MaratonTableHeader
              setHomeAwayTitle={setHomeAwayTitle}
              setSelectedTable={setSelectedTable}
            />
            <MaratonTables tabell={tabell} />
            <div ref={bottomRef}></div>
          </div>
          <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
        </div>
      )}
    </>
  )
}

export default Table
