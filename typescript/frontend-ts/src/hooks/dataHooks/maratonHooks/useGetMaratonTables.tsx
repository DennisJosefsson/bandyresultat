import { useQuery } from 'react-query'
import { maratonTabell } from '../../../requests/tables'
import useGenderContext from '../../contextHooks/useGenderContext'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useState } from 'react'

type Title = {
  [key: string]: string
}

const titles: Title = { all: '', home: 'Hemma', away: 'Borta' }
const fields = ['all', 'home', 'away']

export const useGetMaratonTables = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const selectedTable = searchParams.get('table')
  const [homeAwayTitle, setHomeAwayTitle] = useState(
    selectedTable && fields.includes(selectedTable)
      ? titles[selectedTable]
      : '',
  )
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery(
    'maratonTabell',
    maratonTabell,
  )

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
      if (isSuccess)
        tabell = data.maratonTabell.filter((table) => table.women === women)
  }

  return {
    tabell,
    selectedTable,
    setSearchParams,
    homeAwayTitle,
    setHomeAwayTitle,
    error,
    isLoading,
  }
}
