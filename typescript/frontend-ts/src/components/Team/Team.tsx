import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useEffect } from 'react'

import Spinner from '../utilitycomponents/Components/Spinner'
import TeamTable from './Subcomponents/TeamInfoSubComponents/TeamTable'
import TeamCuriosities from './Subcomponents/TeamInfoSubComponents/TeamCuriosities'
import TeamHeader from './Subcomponents/TeamInfoSubComponents/TeamHeader'
import TeamFiveSeasonsTables from './Subcomponents/TeamInfoSubComponents/TeamFiveSeasons'
import { CardContent } from '@/src/@/components/ui/card'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/src/@/components/ui/tabs'

const Team = ({ teamId }: { teamId: number }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error, isSuccess } = useQuery(
    ['teams', teamId],
    () => getSingleTeam(teamId),
  )

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (error instanceof Error && error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        {error.message}
      </div>
    )
  }

  if (!teamId.toString().match('^[0-9]{1,3}$')) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        Kolla länken, angivet lag-id är felaktigt.
      </div>
    )
  }

  const team = isSuccess ? data : null

  return (
    <>
      {team && (
        <div className="mx-auto mt-2 flex min-h-screen flex-col font-inter text-foreground">
          <TeamHeader team={team} teamId={teamId} />
          <CardContent>
            <Tabs defaultValue="tables">
              <TabsList>
                <TabsTrigger value="tables">Tabeller</TabsTrigger>
                <TabsTrigger value="fiveSeasons">
                  Senaste säsongerna
                </TabsTrigger>
                <TabsTrigger value="stats">Statistik</TabsTrigger>
              </TabsList>
              <TabsContent value="tables">
                {team.tabeller.length === 0 && (
                  <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                    Tyvärr saknas tabelldata
                  </h2>
                )}
                {team.tabeller.length > 0 && (
                  <>
                    <TeamTable tabeller={team.tabeller} />
                  </>
                )}
              </TabsContent>
              <TabsContent value="fiveSeasons">
                {team.sortedFiveSeasons.length > 1 && (
                  <>
                    <TeamFiveSeasonsTables
                      tableArray={team.sortedFiveSeasons}
                    />
                  </>
                )}
              </TabsContent>
              <TabsContent value="stats">
                <TeamCuriosities team={team} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </div>
      )}
    </>
  )
}

export default Team
