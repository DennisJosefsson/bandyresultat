import { useQuery } from '@tanstack/react-query'
import { getSeasons } from '../../../requests/seasons'

const useGetAllSeasons = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['allSeasons'],
    queryFn: getSeasons,
  })

  const seasons = isSuccess ? data : []

  return { seasons, isLoading, error, isSuccess }
}

export default useGetAllSeasons
