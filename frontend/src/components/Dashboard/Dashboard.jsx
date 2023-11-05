import { useState, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { postTeamSeason } from '../../requests/seasons'
import { postMetadata } from '../../requests/metadata'
import { GenderContext } from '../../contexts/contexts'
import MetadataForm from '../Metadata/MetadataForm'
import TeamSeasonForm from '../Season/Subcomponents/TeamSeasonForm'
import TeamForm from '../Team/Subcomponents/TeamForm'
import GenderButtonComponent from '../utilitycomponents/Components/GenderButtonComponent'
import { getSeasons } from '../../requests/seasons'
import { getTeams, postTeam } from '../../requests/teams'
import SeriesModal from './SeriesModal'

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
  const [showSeriesModal, setShowSeriesModal] = useState(false)
  const [seasonId, setSeasonId] = useState('')
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
    return <div className="mx-auto max-w-7xl">Loading...</div>
  }

  if (seasonsError || teamsError) {
    return <div className="mx-auto max-w-7xl">There was an error</div>
  }

  const filteredSeasons = seasons
    .filter((season) => season.women === women)
    .filter((season) => season.year.includes(seasonFilter))
  const teamsArray = teams.filter((season) => season.women === women)

  return (
    <div className="mx-auto min-h-screen max-w-7xl font-inter text-[#011d29]">
      <h2 className="text-2xl font-bold">
        Dashboard {women ? 'Damer' : 'Herrar'}
      </h2>
      <div className=" flex flex-row-reverse justify-between">
        <div>
          <GenderButtonComponent
            women={women}
            clickFunctions={() => dispatch({ type: 'TOGGLE' })}
          />
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
                seasonId={seasonId}
                women={women}
                name={
                  seasons.find((season) => season.seasonId === seasonId).year
                }
                mutation={metadataMutation}
                setShowModal={setShowMetadataModal}
              />
            </>
          ) : null}
          <p>
            <button onClick={() => setShowSeriesModal(true)}>Serie</button>
          </p>
          {showSeriesModal && (
            <SeriesModal women={women} setShowModal={setShowSeriesModal} />
          )}
          <p>
            <button onClick={() => setShowTeamSeasonModal(true)}>
              Lägg till lag till säsong
            </button>
          </p>
          {showTeamSeasonModal ? (
            <>
              <TeamSeasonForm
                teams={teamsArray}
                seasonId={seasonId}
                women={women}
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
                          onChange={() => setSeasonId(season.seasonId)}
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
