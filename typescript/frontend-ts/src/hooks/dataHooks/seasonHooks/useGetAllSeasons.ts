import { useSuspenseQuery } from '@tanstack/react-query'
import { getSeasons } from '../../../requests/seasons'

const useGetAllSeasons = () => {
  const {
    data: seasons,
    isLoading,
    error,
  } = useSuspenseQuery({
    queryKey: ['allSeasons'],
    queryFn: getSeasons,
  })

  return { seasons, isLoading, error }
}

export default useGetAllSeasons
