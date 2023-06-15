import { useQuery, useMutation } from 'react-query'
import { getSingleSeason } from '../../requests/seasons'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../utilitycomponents/spinner'
import MetadataForm from '../Metadata/MetadataForm'
import TableForm from '../Table/TableForm'
import TeamSeasonForm from './TeamSeasonForm'
import GameForm from '../Game/GameForm'
import { postMetadata } from '../../requests/metadata'
import { postTable } from '../../requests/tables'
import { postTeamSeason } from '../../requests/seasons'
import { postGame } from '../../requests/games'

import { LeftArrow, RightArrow } from '../utilitycomponents/icons'

const Season = () => {
  const seasonId = parseInt(useParams().seasonId)

  const [showMetadataModal, setShowMetadataModal] = useState(false)
  const [showTableModal, setShowTableModal] = useState(false)
  const [showTeamSeasonModal, setShowTeamSeasonModal] = useState(false)
  const [showAddGameModal, setShowAddGameModal] = useState(false)

  const metadataMutation = useMutation({
    mutationFn: postMetadata,
  })
  const tableMutation = useMutation({
    mutationFn: postTable,
  })
  const teamSeasonMutation = useMutation({
    mutationFn: postTeamSeason,
  })

  const postGameMutation = useMutation({
    mutationFn: postGame,
  })

  const { data, isLoading, error } = useQuery(['singleSeason', seasonId], () =>
    getSingleSeason(seasonId)
  )
  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>There was an error</div>
  }

  const season = data
  console.log(season)

  return (
    <div className="flex flex-row">
      {/* <div className="text-sm text-gray-500 ml-3">
        <h3>Lag:</h3>
        <ul>
          {season.teams.map((team) => {
            if (!team.teamseason.qualification)
              return (
                <li key={team.teamId} className="text-sm text-gray-500 ml-3">
                  {team.name}
                </li>
              )
          })}
        </ul>

        <h3>Kvallag:</h3>
        <ul>
          {season.teams.map((team) => {
            if (team.teamseason.qualification)
              return (
                <li key={team.teamId} className="text-sm text-gray-500 ml-3">
                  {team.name}
                </li>
              )
          })}
        </ul>
      </div> */}
      <div>
        <div className="w-full">
          <div className="flex flex-row justify-evenly">
            {seasonId - 1 === 1 ? null : (
              <Link to={`/season/${seasonId - 1}`}>
                <LeftArrow />
              </Link>
            )}
            <h2 className="leading-4 text-center text-base font-bold mb-4">
              Säsong {season.year} {season.women ? 'Damer' : 'Herrar'}
            </h2>
            <Link to={`/season/${seasonId + 1}`}>
              <RightArrow />
            </Link>
          </div>
          {season.metadatum ? (
            <div className="text-sm text-gray-500 ml-3">
              <p>{season.metadatum.name}</p>
              <p>SM-guld: {season.metadatum.winnerName}</p>
              <p>Finalstad: {season.metadatum.hostCity}</p>
              <p>Finaldatum: {season.metadatum.finalDate}</p>
            </div>
          ) : null}
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2"></th>
                <th scope="col" className="px-3 py-2">
                  Lag
                </th>
                <th scope="col" className="px-3 py-2">
                  M
                </th>
                <th scope="col" className="px-3 py-2">
                  V
                </th>
                <th scope="col" className="px-3 py-2">
                  O
                </th>
                <th scope="col" className="px-3 py-2">
                  F
                </th>
                <th scope="col" className="px-3 py-2">
                  GM
                </th>
                <th scope="col" className="px-3 py-2">
                  IM
                </th>
                <th scope="col" className="px-3 py-2">
                  MS
                </th>
                <th scope="col" className="px-3 py-2">
                  P
                </th>
              </tr>
            </thead>
            <tbody>
              {season.tables.map((team) => {
                return (
                  <tr key={team.teamId}>
                    <td className="text-right px-1">{team.position}</td>
                    <td className="px-1">
                      {season.teams.find((x) => x.teamId === team.teamId).name}
                    </td>
                    <td className="text-center">{team.games}</td>
                    <td className="text-center">{team.won}</td>
                    <td className="text-center">{team.draw}</td>
                    <td className="text-center">{team.lost}</td>
                    <td className="text-center">{team.scoredGoals}</td>
                    <td className="text-center">{team.concededGoals}</td>
                    <td className="text-center">{team.goalDifference}</td>
                    <td className="text-center">{team.points}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p>
            <button onClick={() => setShowMetadataModal(true)}>
              Redigera metadata
            </button>
          </p>
          {showMetadataModal ? (
            <>
              <MetadataForm
                seasonId={seasonId}
                name={season.year}
                teams={season.teams.filter(
                  (team) => !team.teamseason.qualification
                )}
                mutation={metadataMutation}
                setShowModal={setShowMetadataModal}
              />
            </>
          ) : null}
          <p>
            <button onClick={() => setShowTableModal(true)}>
              Lägg till tabelldata
            </button>
          </p>
          {showTableModal ? (
            <>
              <TableForm
                seasonId={seasonId}
                name={season.year}
                teams={season.teams}
                mutation={tableMutation}
                setShowModal={setShowTableModal}
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
                seasonId={seasonId}
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
                teams={season.teams}
                seasonId={seasonId}
                mutation={postGameMutation}
                setShowModal={setShowAddGameModal}
              />
            </>
          ) : null}
          <p>
            <Link
              to={`/games/${seasonId}`}
              state={{ seasonId: seasonId, teams: season.teams }}
            >
              Visa matcherna.
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Season
