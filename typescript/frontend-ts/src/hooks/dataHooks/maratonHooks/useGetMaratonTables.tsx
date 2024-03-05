import { useQuery } from 'react-query'
import { maratonTabell } from '../../../requests/tables'
import useGenderContext from '../../contextHooks/useGenderContext'

export const useGetMaratonTables = (selectedTable: string) => {
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
  }

  return { tabell, error, isLoading }
}
