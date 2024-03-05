import { useQuery } from 'react-query'
import { getSeasons } from '../../../requests/seasons'

const useGetAllSeasons = () => {
  const { data, isLoading, error, isSuccess } = useQuery(
    'allSeasons',
    getSeasons,
  )

  const seasons = isSuccess ? data : []

  return { seasons, isLoading, error, isSuccess }
}

export default useGetAllSeasons
