import { useCompareStore } from '@/src/components/Compare/zustand/compareStore'
import { useForm } from 'react-hook-form'
import useGenderContext from '../../contextHooks/useGenderContext'

type TeamsListFormType = {
  teamArray: number[]
  women: boolean
}

export const useTeamsListForm = () => {
  const { women } = useGenderContext()
  const teamArray = useCompareStore((state) => state.compare.teamArray)
  const methods = useForm<TeamsListFormType>({
    defaultValues: { teamArray, women },
    criteriaMode: 'all',
    mode: 'onTouched',
  })

  return methods
}
