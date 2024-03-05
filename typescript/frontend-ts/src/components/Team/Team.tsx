import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useEffect } from 'react'

import Spinner from '../utilitycomponents/Components/Spinner'
import TeamTable from './Subcomponents/TeamInfoSubComponents/TeamTable'
import TeamCuriosities from './Subcomponents/TeamInfoSubComponents/TeamCuriosities'
import TeamHeader from './Subcomponents/TeamInfoSubComponents/TeamHeader'
import TeamFiveSeasonsTables from './Subcomponents/TeamInfoSubComponents/TeamFiveSeasons'

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
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error instanceof Error && error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {error.message}
      </div>
    )
  }

  if (!teamId.toString().match('^[0-9]{1,3}$')) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivet lag-id är felaktigt.
      </div>
    )
  }

  const team = isSuccess ? data : null

  return (
    <>
      {team && (
        <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
          <TeamHeader team={team} teamId={teamId} />
          <div className="mx-2 flex flex-col-reverse justify-between lg:flex-row-reverse xl:mx-0">
            <div className="max-w-[30rem]">
              <TeamCuriosities team={team} />
            </div>
            <div>
              <h2 className="ml-0 text-base font-bold md:text-xl">Tabeller</h2>
              <TeamTable tabeller={team.tabeller} />
              {team.tabeller.length === 0 && (
                <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                  Tyvärr saknas tabelldata
                </h2>
              )}
              {team.tabeller.length > 0 && (
                <>
                  <h2 className="ml-0 text-base font-bold md:text-xl">
                    Tabeller
                  </h2>
                  <TeamTable tabeller={team.tabeller} />
                </>
              )}
              {team.sortedFiveSeasons.length > 1 && (
                <>
                  <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                    Senaste säsongerna
                  </h2>
                  <TeamFiveSeasonsTables tableArray={team.sortedFiveSeasons} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Team
