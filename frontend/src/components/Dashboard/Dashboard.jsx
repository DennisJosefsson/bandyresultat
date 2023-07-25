import { useState, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { postTeamSeason } from '../../requests/seasons'
import { postMetadata } from '../../requests/metadata'
import { GenderContext } from '../../contexts/contexts'
import MetadataForm from '../Metadata/MetadataForm'
import TeamSeasonForm from '../Season/TeamSeasonForm'
import TeamForm from '../Team/TeamForm'
import { getSeasons } from '../../requests/seasons'
import { getTeams, postTeam } from '../../requests/teams'

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
  const [showMetadataModal, setShowMetadataModal] = useState(false)
  const [showTeamSeasonModal, setShowTeamSeasonModal] = useState(false)
  const [showNewTeamFormModal, setShowNewTeamFormModal] = useState(false)
  const [season, setSeason] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('')

  const metadataMutation = useMutation({
    mutationFn: postMetadata,
  })

  const teamSeasonMutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const teamFormMutation = useMutation({ mutationFn: postTeam })

  const { women, dispatch } = useContext(GenderContext)

  if (isSeasonLoading || isTeamsLoading) {
    return <div className="max-w-7xl mx-auto">Loading...</div>
  }

  if (seasonsError || teamsError) {
    return <div className="max-w-7xl mx-auto">There was an error</div>
  }

  const filteredSeasons = seasons
    .filter((season) => season.women === women)
    .filter((season) => season.year.includes(seasonFilter))
  const teamsArray = teams.filter((season) => season.women === women)

  return (
    <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29]">
      <h2 className="text-2xl font-bold">
        Dashboard {women ? 'Damer' : 'Herrar'}
      </h2>
      <div className=" flex flex-row-reverse justify-between">
        <div>
          <div
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center"
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
          <div>
            <input
              type="text"
              value={seasonFilter}
              onChange={(event) => setSeasonFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="justify-self-center">
          <p>
            <button onClick={() => setShowMetadataModal(true)}>
              Redigera metadata
            </button>
          </p>
          {showMetadataModal ? (
            <>
              <MetadataForm
                teams={teamsArray}
                season={season}
                women={women}
                name={
                  seasons.filter((season) => season.seasonId === season).year
                }
                mutation={metadataMutation}
                setShowModal={setShowMetadataModal}
              />
            </>
          ) : null}

          <p>
            <button onClick={() => setShowTeamSeasonModal(true)}>
              Lägg till lag till säsong
            </button>
          </p>
          {showTeamSeasonModal ? (
            <>
              <TeamSeasonForm
                teams={teamsArray}
                season={season}
                wome={women}
                mutation={teamSeasonMutation}
                setShowModal={setShowTeamSeasonModal}
              />
            </>
          ) : null}
          <p>
            <button onClick={() => setShowNewTeamFormModal(true)}>
              Lägg till lag
            </button>
          </p>
          {showNewTeamFormModal ? (
            <>
              <TeamForm
                mutation={teamFormMutation}
                setShowModal={setShowNewTeamFormModal}
              />
            </>
          ) : null}
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
                          onChange={() => setSeason(season.seasonId)}
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
