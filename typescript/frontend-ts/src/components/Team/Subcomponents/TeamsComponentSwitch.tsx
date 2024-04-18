import Help from './Help'
import Map from './Map'
import SearchSelection from './SearchSelectionModal'
import TeamsList from './TeamsList'
import Compare from '../../Compare/Compare'
import { useGetTeamsList } from '@/src/hooks/dataHooks/teamHooks/useGetTeamsList'
import Team from '../Team'
import { useSearchParams } from 'react-router-dom'
import { CompareFormState, teamIdFromParams } from '../../types/teams/teams'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ErrorState } from '../../Search/Search'

type TeamsComponentSwitchProps = {
  compObjectParams: CompareFormState | null
  setCompObjectParams: Dispatch<SetStateAction<CompareFormState | null>>
  customError: ErrorState
  setCustomError: Dispatch<SetStateAction<ErrorState>>
  tab: string
  teamFilter: string
  methods: UseFormReturn<CompareFormState>
}

const TeamsComponentSwitch = ({
  tab,
  teamFilter,
  methods,
  compObjectParams,
  setCompObjectParams,
  customError,
  setCustomError,
}: TeamsComponentSwitchProps) => {
  const { teams } = useGetTeamsList(teamFilter)
  const [parsedTeamId, setParsedTeamId] = useState<number | null>(null)
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const teamId = searchParams.get('teamId')
  useEffect(() => {
    if (teamId) {
      const parsed = teamIdFromParams.safeParse(teamId)
      if (!parsed.success) {
        throw new Error(parsed.error.message)
      }
      setParsedTeamId(parsed.data)
    }
  }, [teamId])

  let pageContent
  switch (tab) {
    case 'teams':
      pageContent = (
        <TeamsList teams={teams} setSearchParams={setSearchParams} />
      )
      break
    case 'compare':
      pageContent = (
        <Compare
          methods={methods}
          compObjectParams={compObjectParams}
          setCompObjectParams={setCompObjectParams}
          customError={customError}
          setCustomError={setCustomError}
        />
      )
      break
    case 'selection':
      pageContent = <SearchSelection />
      break
    case 'singleTeam':
      pageContent = parsedTeamId && <Team teamId={parsedTeamId} />
      break
    case 'map':
      pageContent = <Map teams={teams} setSearchParams={setSearchParams} />
      break
    case 'help':
      pageContent = <Help />
      break
    default:
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }
  return <>{pageContent}</>
}

export default TeamsComponentSwitch
