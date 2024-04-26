import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MetadataType,
  metadataType,
} from '@/src/components/types/metadata/metadata'
import { useEffect } from 'react'
import useGetMetaData from './useGetMetadata'

const useMetadataForm = ({
  year,
  seasonId,
}: {
  seasonId: number
  year: string
}) => {
  const { data } = useGetMetaData(year)

  const form = useForm<MetadataType>({
    resolver: zodResolver(metadataType),
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      metadataId: undefined,
      seasonId: seasonId,
      name: '',
      year: '',
      winnerId: undefined,
      winnerName: '',
      hostCity: '',
      finalDate: '',
      northSouth: false,
      multipleGroupStages: false,
      eight: true,
      quarter: true,
      semi: true,
      final: true,
      comment: '',
    },
  })
  useEffect(() => {
    if (data) {
      const dataObject = data.find((item) => item.seasonId === seasonId)
      if (dataObject) {
        const parsedData = metadataType.safeParse(dataObject)
        if (parsedData.success) {
          form.reset(parsedData.data)
        }
      }
    }
  }, [data])

  return form
}

export default useMetadataForm
