import useGenderContext from '../../contextHooks/useGenderContext'
import {
  CompareFormState,
  compareFormState,
} from '../../../components/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { compareTeams } from '@/src/requests/tables'
import { useQuery } from 'react-query'
import useGetAllSeasons from '../seasonHooks/useGetAllSeasons'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ErrorState } from '@/src/components/Search/Search'

import { getLinkData } from '@/src/requests/link'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

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

export const useCompareResults = (
  compObjectParams: CompareFormState | null,
) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['compareTeams', compObjectParams],
    queryFn: () => compObjectParams && compareTeams(compObjectParams),
    enabled: !!compObjectParams,
  })

  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const compareLink = `${baseUrl}/teams?link=${data?.link[0].linkName}`

  return {
    data,
    isLoading,
    error,
    isSuccess,
    compareLink,
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

export const useCompareLocationData = (
  setCustomError: Dispatch<SetStateAction<ErrorState>>,
  setCompObjectParams: Dispatch<SetStateAction<CompareFormState | null>>,
  methods: UseFormReturn<CompareFormState>,
) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [linkDataParams, setLinkDataParams] = useState<string | null>(null)

  const [linkDataLoaded, setLinkDataLoaded] = useState<boolean>(false)
  const linkName = useParams().linkName
  const [linkParam, setLinkParam] = useSearchParams(location.search)

  const link = linkParam.get('link')

  const { data: linkData } = useQuery({
    queryKey: ['linkData', linkDataParams],
    queryFn: () => getLinkData(linkDataParams),
    enabled: !!linkDataParams,
  })

  useEffect(() => {
    if (location.state) {
      const parsedFormData = compareFormState.safeParse(
        location.state.compObject,
      )
      if (!parsedFormData.success) {
        setCustomError({ error: true, message: parsedFormData.error.message })
        navigate(location.pathname, { replace: true })
      }
      if (parsedFormData.success) {
        setCompObjectParams(parsedFormData.data)
        navigate(location.pathname, { replace: true })
      }
    } else if (!link) {
      const parsedFormData = compareFormState.safeParse(methods.getValues())
      if (!parsedFormData.success) {
        setCustomError({ error: true, message: parsedFormData.error.message })
      }
      if (parsedFormData.success) {
        setCompObjectParams(parsedFormData.data)
      }
    }
  }, [])

  useEffect(() => {
    if (link) {
      setLinkDataParams(link)
      setLinkParam({})
    }

    const regex = /link\d{7,}/gm

    if (linkName && !linkName.match(regex)) {
      setCustomError({ error: true, message: 'Felaktig länk' })
      setTimeout(() => {
        setCustomError({ error: false })
      }, 5000)
    } else if (linkName) {
      setLinkParam({ link: linkName })
    }

    if (linkData && !linkData?.success) {
      setCustomError({ error: true, message: linkData.message })
      setTimeout(() => {
        setCustomError({ error: false })
      }, 5000)
    } else if (linkData?.success && linkData.origin === 'search') {
      setCustomError({ error: true, message: 'Felaktig länk, fel LänkId.' })
      setTimeout(() => {
        setCustomError({ error: false })
      }, 5000)
    } else if (
      linkData?.success &&
      linkData.origin === 'compare' &&
      !linkDataLoaded
    ) {
      const searchData = compareFormState.safeParse(linkData.searchString)
      if (searchData.success) {
        setCompObjectParams(searchData.data)
        methods.reset(searchData.data)
        setLinkDataLoaded(true)
      } else {
        setCustomError({ error: true, message: searchData.error.message })
        setTimeout(() => {
          setCustomError({ error: false })
        }, 5000)
      }
    }
  }, [link, linkName, methods, linkData, linkDataLoaded])
}
