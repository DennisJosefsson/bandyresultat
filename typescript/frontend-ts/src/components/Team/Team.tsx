import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useEffect } from 'react'

import Spinner from '../utilitycomponents/Components/Spinner'
import TeamTable from './Subcomponents/TeamInfoSubComponents/TeamTable'
import TeamCuriosities from './Subcomponents/TeamInfoSubComponents/TeamCuriosities'
import TeamHeader from './Subcomponents/TeamInfoSubComponents/TeamHeader'

const Team = ({ teamId }: { teamId: number }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error, isSuccess } = useQuery(
    ['teams', teamId],
    () => getSingleTeam(teamId),
  )

  useEffect(() => {
    if (isSuccess && data) document.title = `Bandyresultat - ${data.name}`

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

  const teams = data

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <TeamHeader teams={teams} teamId={teamId} />
      <div className="mx-2 flex flex-col-reverse justify-between lg:flex-row-reverse xl:mx-0">
        <div className="max-w-[30rem]">
          <TeamCuriosities teams={teams} />
        </div>
        <div>
          <h2 className="ml-0 text-base font-bold md:text-xl">Tabeller</h2>
          <TeamTable tableArray={teams.tabeller} />
        </div>
      </div>
    </div>
  )
}

export default Team
