import { useCompareStore } from '@/src/components/Compare/zustand/compareStore'
import { useForm } from 'react-hook-form'

type CompareSelectionType = {
  startSeason: string
  endSeason: string
  categoryArray: string[]
}

export const useCompareSelection = () => {
  const startSeason = useCompareStore((state) => state.compare.startSeason)
  const endSeason = useCompareStore((state) => state.compare.endSeason)
  const categoryArray = useCompareStore((state) => state.compare.categoryArray)
  const methods = useForm<CompareSelectionType>({
    defaultValues: { categoryArray, startSeason, endSeason },
    criteriaMode: 'all',
    mode: 'onTouched',
  })

  return methods
}
