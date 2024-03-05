import { useState } from 'react'
import { useQuery } from 'react-query'

import MetadataForm from '../Metadata/MetadataForm'
import TeamSeasonForm from '../Season/Subcomponents/TeamSeasonForm'
import TeamForm from '../Team/Subcomponents/TeamForm'
import Errors from './Errors'
import { getSeasons } from '../../requests/seasons'
import { getTeams } from '../../requests/teams'
import SeriesModal from './SeriesModal'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'

const Dashboard = () => {
  const {
    data: seasons,
    isLoading: isSeasonLoading,
    error: seasonsError,
    isSuccess: isSeasonSuccess,
  } = useQuery('allSeasons', getSeasons)
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: teamsError,
    isSuccess: isTeamsSuccess,
  } = useQuery(['teams'], getTeams)

  const [seasonId, setSeasonId] = useState<number | null>(null)
  const [seasonFilter, setSeasonFilter] = useState<string>('')
  const [tab, setTab] = useState<string>('error')

  const { women, dispatch } = useGenderContext()

  if (isSeasonLoading || isTeamsLoading) {
    return <div className="mx-auto max-w-7xl">Loading...</div>
  }

  if (seasonsError || teamsError) {
    return <div className="mx-auto max-w-7xl">There was an error</div>
  }

  const filteredSeasons = isSeasonSuccess
    ? seasons
        .filter((season) => season.women === women)
        .filter((season) => season.year.includes(seasonFilter))
    : []
  const teamsArray = isTeamsSuccess
    ? teams.filter((season) => season.women === women)
    : []

  const dashboardTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    tabBarArray: [
      {
        name: 'Error',
        tabName: 'error',
        clickFunctions: () => setTab('error'),
        conditional: true,
      },
      {
        name: 'Lägg till lag',
        tabName: 'addteams',
        clickFunctions: () => setTab('addteams'),
        conditional: true,
      },
      {
        name: 'Serie',
        tabName: 'serie',
        clickFunctions: () => setTab('serie'),
        conditional: true,
      },
      {
        name: 'Teamseason',
        tabName: 'teamseason',
        clickFunctions: () => setTab('teamseason'),
        conditional: false,
      },
      {
        name: 'Metadata',
        tabName: 'metadata',
        clickFunctions: () => setTab('metadata'),
        conditional: false,
      },
    ].filter((item) => {
      if (seasonId === null) {
        if (item.conditional !== false) return item
      } else {
        return item
      }
    }),
  }

  const handleSeasonChange = (checkedSeasonId: number) => {
    if (seasonId === checkedSeasonId) {
      setSeasonId(null)
    } else {
      setSeasonId(checkedSeasonId)
    }
  }

  const seasonObject = filteredSeasons.find(
    (season) => season.seasonId === seasonId,
  )

  return (
    <div className="mx-auto min-h-screen max-w-7xl font-inter text-[#011d29]">
      <h2 className="text-2xl font-bold">
        Dashboard {women ? 'Damer' : 'Herrar'}
      </h2>
      <TabBarDivided
        tabBarObject={dashboardTabBarObject}
        tab={tab}
        setTab={setTab}
        onlyDesktop
      />
      <div className=" flex flex-row-reverse justify-between">
        <div>
          <div>
            <input
              type="text"
              value={seasonFilter}
              onChange={(event) => setSeasonFilter(event.target.value)}
            />
          </div>
        </div>

        <div className="justify-self-center">
          {tab === 'error' && <Errors />}

          {tab === 'metadata' && seasonObject && seasonId && (
            <>
              <MetadataForm
                teams={teamsArray}
                seasonId={seasonId}
                name={seasonObject?.year}
              />
            </>
          )}

          {tab === 'serie' && <SeriesModal women={women} />}

          {tab === 'teamseason' && seasonId && (
            <>
              <TeamSeasonForm
                teams={teamsArray}
                seasonId={seasonId}
                women={women}
              />
            </>
          )}

          {tab === 'addteams' && (
            <>
              <TeamForm />
            </>
          )}
          <ul>
            {filteredSeasons.length < 12 &&
              filteredSeasons.map((season) => {
                return (
                  <li key={season.seasonId}>
                    <div className="flex flex-row">
                      <div className="w-32">{season.year}</div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={() => handleSeasonChange(season.seasonId)}
                          checked={season.seasonId === seasonId}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
