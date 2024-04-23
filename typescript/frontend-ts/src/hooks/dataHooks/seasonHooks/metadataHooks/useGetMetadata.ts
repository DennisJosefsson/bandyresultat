import { getSingleMetadata } from '@/src/requests/metadata'
import { useQuery } from '@tanstack/react-query'

const useGetMetaData = (year: string) => {
  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ['seasonMetadata', year],
    queryFn: () => getSingleMetadata(year),
  })

  return { data, error, isSuccess, isLoading }
}

export default useGetMetaData
