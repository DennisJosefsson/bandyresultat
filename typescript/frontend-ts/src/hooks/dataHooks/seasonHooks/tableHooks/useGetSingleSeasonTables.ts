import { useQuery } from '@tanstack/react-query'
import { getSingleSeasonTable } from '../../../../requests/tables'
import useGenderContext from '../../../contextHooks/useGenderContext'
import { tableSortFunction } from '../../../../components/utilitycomponents/functions/sortFunction'

export const useGetSingleSeasonTables = (
  seasonId: number,
  selectedTable: string,
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['singleSeasonTable', seasonId],
    queryFn: () => getSingleSeasonTable(seasonId),
  })

  let regTables = isSuccess
    ? data.tabell.filter((table) => table.women === women)
    : []
  switch (selectedTable) {
    case 'all':
      if (isSuccess)
        regTables = data.tabell.filter((table) => table.women === women)

      break
    case 'home':
      if (isSuccess)
        regTables = data.hemmaTabell.filter((table) => table.women === women)
      break
    case 'away':
      if (isSuccess)
        regTables = data.bortaTabell.filter((table) => table.women === women)
      break
    default:
      regTables = []
  }

  const unsortedRegularTables = regTables.filter(
    (table) => table.category === 'regular',
  )
  const unsortedQualificationTables = regTables.filter(
    (table) => table.category === 'qualification',
  )

  const regularTables = tableSortFunction(unsortedRegularTables)
  const qualificationTables = tableSortFunction(unsortedQualificationTables)

  const tableData = {
    unsortedRegularTables,
    regularTables,
    qualificationTables,
  }

  return {
    tableData,
    isLoading,
    error,
  }
}
