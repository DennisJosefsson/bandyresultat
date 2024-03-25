import { useState, useEffect, KeyboardEvent } from 'react'

import { useParams } from 'react-router-dom'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/@/components/ui/tabs'
import Spinner from '../utilitycomponents/Components/Spinner'
import TeamsList from './Subcomponents/TeamsList'

//import FormStateComponent from './Subcomponents/FormStateComponent'
import SearchSelection from './Subcomponents/SearchSelectionModal'
import Map from './Subcomponents/Map'
import Compare from '../Compare/Compare'
import Team from './Team'
import Help from './Subcomponents/Help'
// import {

//   TabBarObject,
// } from '../utilitycomponents/Components/TabBar'
import { teamIdFromParams } from '../types/teams/teams'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
//import { CompareFormState } from '../types/teams/teams'
import { useGetTeamsList } from '@/src/hooks/dataHooks/teamHooks/useGetTeamsList'
import { Form } from '@/src/@/components/ui/form'
import { Button } from '@/src/@/components/ui/button'
import {
  useCompare,
  useCompareResults,
} from '@/src/hooks/dataHooks/teamHooks/useCompare'

const Teams = () => {
  //const location = useLocation()
  const params = useParams()

  const { women, dispatch } = useGenderContext()

  const [tab, setTab] = useState<string>('teams')
  const [teamId, setTeamId] = useState<number | null>(null)

  //const [stateNull, setStateNull] = useState<boolean>(false)

  const [teamFilter, setTeamFilter] = useState<string>('')
  //const Compare = lazy(() => import('../Compare/Compare'))
  const methods = useCompare()
  const { onSubmit } = useCompareResults()

  const { teams, isLoading, error } = useGetTeamsList(teamFilter)
  console.log(methods.getValues())
  useEffect(() => {
    // if (location.state && !stateNull) {
    //   genderDispatch({
    //     type: 'SET',
    //     payload: location.state.compObject.women
    //       ? location.state.compObject.women
    //       : women,
    //   })
    //   setStateNull(true)
    //   setTab('compare')
    // }
    if (params.teamId) {
      const teamId = teamIdFromParams.safeParse(params.teamId)
      if (!teamId.success) {
        throw new Error(teamId.error.message)
      }
      setTeamId(teamId.data)
      setTab('singleTeam')
    }
  }, [params.teamId])

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const teamArrayLength = methods.getValues('teamArray').length

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id="search-form">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="hidden items-center xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2">
              <div>
                <TabsList>
                  <TabsTrigger value="teams">Laglista</TabsTrigger>
                  <TabsTrigger value="map">Lagkarta</TabsTrigger>
                  {teamArrayLength < 2 || teamArrayLength > 4 ? null : (
                    <TabsTrigger value="compare">Jämför</TabsTrigger>
                  )}
                  {teamArrayLength < 2 ? null : (
                    <TabsTrigger value="selection">Sökval</TabsTrigger>
                  )}

                  <TabsTrigger value="help">Hjälp</TabsTrigger>
                </TabsList>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    dispatch({ type: 'TOGGLE' })
                  }}
                >
                  <span className="text-sm md:text-base">
                    {women ? 'Herr' : 'Dam'}
                  </span>
                </Button>
              </div>
            </div>
            {(tab === 'teams' || tab === 'map') && (
              <div className="mt-2 w-full">
                <input
                  className="w-full border-[#011d29] text-[#011d29] focus:border-[#011d29]"
                  type="text"
                  placeholder="Filter"
                  value={teamFilter}
                  name="teamFilter"
                  onChange={(event) =>
                    setTeamFilter(
                      event.target.value.replace(
                        /[^a-z0-9\u00C0-\u017F]/gi,
                        '',
                      ),
                    )
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}

            <TabsContent value="teams">
              {tab === 'teams' ? <TeamsList teams={teams} /> : null}
            </TabsContent>
            <TabsContent value="map">
              {tab === 'map' ? <Map teams={teams} /> : null}
            </TabsContent>
            <TabsContent value="compare">
              {tab === 'map' ? <Compare /> : null}
            </TabsContent>
            <TabsContent value="selection">
              {tab === 'selection' ? <SearchSelection /> : null}
            </TabsContent>
            <TabsContent value="singleTeam">
              {teamId && tab === 'singleTeam' ? (
                <Team teamId={teamId} />
              ) : (
                <div>Något gick fel, tom sida</div>
              )}
            </TabsContent>
            <TabsContent value="help">
              {tab === 'help' ? <Help /> : null}
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

export default Teams
