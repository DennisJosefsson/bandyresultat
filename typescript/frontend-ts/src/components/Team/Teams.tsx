import { useState, useEffect, KeyboardEvent } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback'
import TeamsComponentSwitch from './Subcomponents/TeamsComponentSwitch'
import { useSearchParams, useLocation } from 'react-router-dom'

import Spinner from '../utilitycomponents/Components/Spinner'

import { Input } from '@/src/@/components/ui/input'
//import FormStateComponent from './Subcomponents/FormStateComponent'
import { teamIdFromParams } from '../types/teams/teams'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
//import { CompareFormState } from '../types/teams/teams'
import { useGetTeamsList } from '@/src/hooks/dataHooks/teamHooks/useGetTeamsList'
import { Form } from '@/src/@/components/ui/form'

import {
  useCompare,
  useCompareResults,
} from '@/src/hooks/dataHooks/teamHooks/useCompare'
import TeamsTabBar from './Subcomponents/TeamsTabBar'

const Teams = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const teamId = searchParams.get('teamId')

  const { women, dispatch } = useGenderContext()

  const [tab, setTab] = useState<string>('teams')

  const [stateNull, setStateNull] = useState<boolean>(false)

  const [teamFilter, setTeamFilter] = useState<string>('')

  const methods = useCompare()
  const { onSubmit } = useCompareResults()

  const { isLoading, error } = useGetTeamsList(teamFilter)

  useEffect(() => {
    if (location.state && !stateNull) {
      dispatch({
        type: 'SET',
        payload: location.state.compObject.women
          ? location.state.compObject.women
          : women,
      })

      setStateNull(true)
      setTab('compare')
    }
    if (teamId) {
      const parsedTeamId = teamIdFromParams.safeParse(teamId)
      if (!parsedTeamId.success) {
        throw new Error(parsedTeamId.error.message)
      }

      setTab('singleTeam')
    }
  }, [teamId, location.state])

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const removeTeamIdParam = () => {
    if (searchParams.has('teamId')) {
      searchParams.delete('teamId')
      setSearchParams(searchParams)
    }
  }

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-foreground lg:px-0">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id="search-form">
          <TeamsTabBar
            tab={tab}
            setTab={setTab}
            removeTeamIdParam={removeTeamIdParam}
          />

          {(tab === 'teams' || tab === 'map') && (
            <div className="mt-2 w-full">
              <Input
                className="w-full border-[#011d29] text-foreground focus:border-[#011d29]"
                type="text"
                placeholder="Filter"
                value={teamFilter}
                name="teamFilter"
                onChange={(event) =>
                  setTeamFilter(
                    event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ''),
                  )
                }
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={logError}
              resetKeys={[tab]}
            >
              <TeamsComponentSwitch tab={tab} teamFilter={teamFilter} />
            </ErrorBoundary>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Teams
