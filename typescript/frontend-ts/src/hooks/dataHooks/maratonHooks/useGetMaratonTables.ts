import { useQuery } from '@tanstack/react-query'
import { maratonTabell } from '../../../requests/tables'
import useGenderContext from '../../contextHooks/useGenderContext'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'

type Title = {
  [key: string]: string
}

const titles: Title = { all: '', home: 'Hemma', away: 'Borta' }
const fields = ['all', 'home', 'away']

export const useGetMaratonTables = () => {
  const { table } = useSearch({ from: '/maraton' })

  const [homeAwayTitle, setHomeAwayTitle] = useState(
    table && fields.includes(table) ? titles[table] : '',
  )
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['maratonTabell'],
    queryFn: maratonTabell,
  })

  let tabell
  switch (table) {
    case 'all':
      if (isSuccess)
        tabell = data.maratonTabell.filter((item) => item.women === women)
      break
    case 'home':
      if (isSuccess)
        tabell = data.maratonHemmaTabell.filter((item) => item.women === women)
      break
    case 'away':
      if (isSuccess)
        tabell = data.maratonBortaTabell.filter((item) => item.women === women)
      break
    default:
      if (isSuccess)
        tabell = data.maratonTabell.filter((item) => item.women === women)
  }

  return {
    tabell,
    table,
    homeAwayTitle,
    setHomeAwayTitle,
    error,
    isLoading,
  }
}
