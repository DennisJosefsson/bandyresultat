import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useEffect } from 'react'

import Spinner from '../utilitycomponents/Components/spinner'
import TeamTable from './Subcomponents/TeamInfoSubComponents/TeamTable'
import TeamCuriosities from './Subcomponents/TeamInfoSubComponents/TeamCuriosities'
import TeamHeader from './Subcomponents/TeamInfoSubComponents/TeamHeader'
import TeamFiveSeasonsTables from './Subcomponents/TeamInfoSubComponents/TeamFiveSeasonsTables'

const Team = ({ teamId }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useQuery(['teams', teamId], () =>
    getSingleTeam(teamId),
  )

  useEffect(() => {
    if (data?.team) document.title = `Bandyresultat - ${data?.team.name}`

    return () => (document.title = 'Bandyresultat')
  }, [data])

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
        Något gick fel.
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

  if (data?.success === 'false') {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {data.message}
      </div>
    )
  }

  const teams = data

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <TeamHeader teams={teams} teamId={teamId} />
      <div className="mx-2 flex flex-col-reverse justify-between lg:flex-row-reverse xl:mx-0">
        <div className="max-w-[30rem]">
          <TeamCuriosities teams={teams} />
        </div>

        <div>
          {teams.tabeller.length === 0 && (
            <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
              Tyvärr saknas tabelldata
            </h2>
          )}
          {teams.tabeller.length > 0 && (
            <>
              <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                Tabeller
              </h2>
              <TeamTable tableArray={teams.tabeller} />
            </>
          )}
          {teams.sortedFiveSeasons.length > 1 && (
            <>
              <h2 className="mb-2 ml-0 text-base font-bold md:text-xl">
                Senaste säsongerna
              </h2>
              <TeamFiveSeasonsTables tableArray={teams.sortedFiveSeasons} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Team
