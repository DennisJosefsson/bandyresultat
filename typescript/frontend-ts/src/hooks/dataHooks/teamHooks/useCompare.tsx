import useGenderContext from '../../contextHooks/useGenderContext'
import {
  CompareFormState,
  compareFormState,
} from '../../../components/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { compareTeams } from '@/src/requests/tables'
import { useQuery } from 'react-query'
import useGetAllSeasons from '../seasonHooks/useGetAllSeasons'
import { useState } from 'react'

const initValues = (women: boolean): CompareFormState => {
  return {
    teamArray: [],
    categoryArray: [
      'qualification',
      'regular',
      'eight',
      'quarter',
      'semi',
      'final',
    ],
    startSeason: women ? '119' : '1',
    endSeason: women ? '171' : '170',
    women: women,
  }
}

export const useCompare = () => {
  const { women } = useGenderContext()
  const compareInitvalues = initValues(women)

  const methods = useForm<CompareFormState>({
    defaultValues: compareInitvalues,
    criteriaMode: 'all',
    mode: 'onTouched',
    resolver: zodResolver(compareFormState),
  })

  return methods
}

export const useCompareResults = () => {
  const [compObjectParams, setCompObjectParams] =
    useState<CompareFormState | null>(null)
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['compareTeams', compObjectParams],
    queryFn: () => compObjectParams && compareTeams(compObjectParams),
    enabled: !!compObjectParams,
  })

  const onSubmit = (data: CompareFormState) => setCompObjectParams(data)

  return {
    data,
    isLoading,
    error,
    isSuccess,
    compObjectParams,
    setCompObjectParams,
    onSubmit,
  }
}

export const useCompareSeasons = () => {
  const { seasons } = useGetAllSeasons()

  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId)
  const startOptions = reversedSeasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  const endOptions = seasons.map((season) => {
    return { label: season.year, value: season.seasonId }
  })

  return { startOptions, endOptions }
}
