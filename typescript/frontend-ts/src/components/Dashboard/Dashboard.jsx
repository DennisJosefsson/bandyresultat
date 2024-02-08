import { useState, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { postTeamSeason } from '../../requests/seasons'
import { postMetadata } from '../../requests/metadata'
import { GenderContext } from '../../contexts/contexts'
import MetadataForm from '../Metadata/MetadataForm'
import TeamSeasonForm from '../Season/Subcomponents/TeamSeasonForm'
import TeamForm from '../Team/Subcomponents/TeamForm'
import Errors from './Errors'
import { getSeasons } from '../../requests/seasons'
import { getTeams, postTeam } from '../../requests/teams'
import SeriesModal from './SeriesModal'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'

const Dashboard = () => {
  const {
    data: seasons,
    isLoading: isSeasonLoading,
    error: seasonsError,
  } = useQuery('allSeasons', getSeasons)
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: teamsError,
  } = useQuery(['teams'], getTeams)

  const [seasonId, setSeasonId] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('')
  const [tab, setTab] = useState('error')

  const metadataMutation = useMutation({
    mutationFn: postMetadata,
  })

  const teamSeasonMutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const teamFormMutation = useMutation({ mutationFn: postTeam })

  const { women, dispatch } = useContext(GenderContext)

  if (isSeasonLoading || isTeamsLoading) {
    return <div className="mx-auto max-w-7xl">Loading...</div>
  }

  if (seasonsError || teamsError) {
    return <div className="mx-auto max-w-7xl">There was an error</div>
  }

  const filteredSeasons = seasons
    .filter((season) => season.women === women)
    .filter((season) => season.year.includes(seasonFilter))
  const teamsArray = teams.filter((season) => season.women === women)

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
      if (seasonId === '') {
        if (item.conditional !== false) return item
      } else {
        return item
      }
    }),
  }

  const handleSeasonChange = (checkedSeasonId) => {
    if (seasonId === checkedSeasonId) {
      setSeasonId('')
    } else {
      setSeasonId(checkedSeasonId)
    }
  }

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

          {tab === 'metadata' && (
            <>
              <MetadataForm
                teams={teamsArray}
                seasonId={seasonId}
                women={women}
                name={
                  seasons.find((season) => season.seasonId === seasonId).year
                }
                mutation={metadataMutation}
              />
            </>
          )}

          {tab === 'serie' && <SeriesModal women={women} />}

          {tab === 'teamseason' && (
            <>
              <TeamSeasonForm
                teams={teamsArray}
                seasonId={seasonId}
                women={women}
                mutation={teamSeasonMutation}
              />
            </>
          )}

          {tab === 'addteams' && (
            <>
              <TeamForm mutation={teamFormMutation} />
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
