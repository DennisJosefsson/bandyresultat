import { useState, useEffect, KeyboardEvent } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import ErrorFallback from '../utilitycomponents/Components/LoadingAndError/ErrorFallback'
import TeamsComponentSwitch from './Subcomponents/TeamsComponentSwitch'
import { useSearchParams, useLocation } from 'react-router-dom'
import { Input } from '@/src/@/components/ui/input'
import { teamIdFromParams } from '../types/teams/teams'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'

import { Card, CardContent } from '@/src/@/components/ui/card'

import TeamsTabBar from './Subcomponents/TeamsTabBar'
import { ErrorState } from '../Search/Search'

const Teams = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)

  const [customError, setCustomError] = useState<ErrorState>({ error: false })
  const teamId = searchParams.get('teamId')
  const link = searchParams.get('link')

  const { women, dispatch } = useGenderContext()

  const [tab, setTab] = useState<string>('teams')

  const [stateNull, setStateNull] = useState<boolean>(false)

  const [teamFilter, setTeamFilter] = useState<string>('')

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
    if (link) {
      setTab('compare')
    }
    if (teamId) {
      const parsedTeamId = teamIdFromParams.safeParse(teamId)
      if (!parsedTeamId.success) {
        throw new Error(parsedTeamId.error.message)
      }

      setTab('singleTeam')
    }
  }, [link, teamId, location.state])

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

  //console.log(methods.getValues())

  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card className="mb-2 items-center">
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <TeamsTabBar
            tab={tab}
            setTab={setTab}
            removeTeamIdParam={removeTeamIdParam}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
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
              <TeamsComponentSwitch
                tab={tab}
                teamFilter={teamFilter}
                customError={customError}
                setCustomError={setCustomError}
              />
            </ErrorBoundary>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Teams
