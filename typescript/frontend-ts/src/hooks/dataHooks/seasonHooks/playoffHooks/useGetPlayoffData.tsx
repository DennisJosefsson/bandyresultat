import { useQuery } from 'react-query'
import { getSingleSeasonTable } from '../../../../requests/tables'
import useGenderContext from '../../../contextHooks/useGenderContext'

export const useGetPlayoffData = (seasonId: number) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery(
    ['singleSeasonTable', seasonId],
    () => getSingleSeasonTable(seasonId),
  )

  const tables = data?.tabell.filter((table) => table.women === women)
  const playoffGames = data?.playoffGames.filter(
    (table) => table.women === women,
  )
  const final = playoffGames?.filter((games) => games.category === 'final')

  return { isLoading, error, isSuccess, tables, final, playoffGames }
}
