import Help from './Help'
import Map from './Map'

import TeamsList from './TeamsList'
import Compare from '../../Compare/Compare'
import Team from '../Team'

import { useCompare } from '@/src/hooks/dataHooks/teamHooks/useCompare'
import { useSearchParams } from 'react-router-dom'
import { teamIdFromParams } from '../../types/teams/teams'
import { useState, useEffect, Dispatch, SetStateAction, Suspense } from 'react'
import { Form } from '@/src/@/components/ui/form'
import { ErrorState } from '../../Search/Search'
import Loading from '../../utilitycomponents/Components/LoadingAndError/Loading'
import CompareSelectionForm from '../../Compare/CompareSelectionForm'

type TeamsComponentSwitchProps = {
  customError: ErrorState
  setCustomError: Dispatch<SetStateAction<ErrorState>>
  tab: string
  teamFilter: string
}

const TeamsComponentSwitch = ({
  tab,
  teamFilter,
  customError,
  setCustomError,
}: TeamsComponentSwitchProps) => {
  const { methods, mutation, compareLink } = useCompare()

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
        <Suspense fallback={<Loading page="teamsList" />}>
          <TeamsList
            teamFilter={teamFilter}
            setSearchParams={setSearchParams}
          />
        </Suspense>
      )
      break
    case 'compare':
      pageContent = (
        <Compare
          methods={methods}
          mutation={mutation}
          customError={customError}
          setCustomError={setCustomError}
          compareLink={compareLink}
        />
      )
      break
    case 'selection':
      pageContent = (
        <Suspense fallback={<Loading page="searchSelection" />}>
          <CompareSelectionForm />
        </Suspense>
      )
      break
    case 'singleTeam':
      pageContent = parsedTeamId && <Team teamId={parsedTeamId} />
      break
    case 'map':
      pageContent = (
        <Suspense fallback={<Loading page="seasonMap" />}>
          <Map teamFilter={teamFilter} setSearchParams={setSearchParams} />
        </Suspense>
      )
      break
    case 'help':
      pageContent = <Help />
      break
    default:
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }
  return (
    <>
      <Form {...methods}>
        <form>{pageContent}</form>
      </Form>
    </>
  )
}

export default TeamsComponentSwitch
