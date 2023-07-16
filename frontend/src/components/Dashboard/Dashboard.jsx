import { useState, useContext } from 'react'
import { useMutation } from 'react-query'
import { postTeamSeason } from '../../requests/seasons'
import { postMetadata } from '../../requests/metadata'
import { postGame } from '../../requests/games'
import { GenderContext } from '../../contexts/genderContext'
import MetadataForm from '../Metadata/MetadataForm'

import TeamSeasonForm from './TeamSeasonForm'
import GameForm from '../Game/GameForm'

const Dashboard = () => {
  const [showMetadataModal, setShowMetadataModal] = useState(false)
  const [showTeamSeasonModal, setShowTeamSeasonModal] = useState(false)
  const [showAddGameModal, setShowAddGameModal] = useState(false)

  const [season, setSeason] = useState('2023/24')

  const metadataMutation = useMutation({
    mutationFn: postMetadata,
  })

  const teamSeasonMutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const postGameMutation = useMutation({
    mutationFn: postGame,
  })

  const { women, dispatch } = useContext(GenderContext)

  return (
    <div>
      <div>
        Dashboard
        <div
          onClick={() => dispatch({ type: 'TOGGLE' })}
          className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center"
        >
          {women ? 'Herrar' : 'Damer'}
        </div>
        <div>
          <input
            type="text"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
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
              season={season}
              women={women}
              mutation={metadataMutation}
              setShowModal={setShowMetadataModal}
            />
          </>
        ) : null}

        <p>
          <button onClick={() => setShowTeamSeasonModal(true)}>
            Lägg till lag
          </button>
        </p>
        {showTeamSeasonModal ? (
          <>
            <TeamSeasonForm
              season={season}
              wome={women}
              mutation={teamSeasonMutation}
              setShowModal={setShowTeamSeasonModal}
            />
          </>
        ) : null}
        <p>
          <button onClick={() => setShowAddGameModal(true)}>
            Lägg till Match
          </button>
        </p>
        {showAddGameModal ? (
          <>
            <GameForm
              women={women}
              seasons={season}
              mutation={postGameMutation}
              setShowModal={setShowAddGameModal}
              gameData={gameData}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Dashboard
