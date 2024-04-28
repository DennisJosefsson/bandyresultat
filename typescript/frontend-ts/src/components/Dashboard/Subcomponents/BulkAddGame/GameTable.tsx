import { Dispatch, SetStateAction } from 'react'
import { TeamAndSeasonAttributes } from '../../../types/teams/teams'
import { FormContent } from '../SeasonsList'
import BulkGameForm from './BulkGameForm'

type Games = {
  date: string
  homeTeam: string
  awayTeam: string
  seasonId: number
  category: string
  group: string
  women: boolean
  serieId: number | undefined | null
}

type GamesProps = {
  games: Games[]
  teams: TeamAndSeasonAttributes[] | null
  setTab: Dispatch<SetStateAction<string>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
}

const GameTable = ({ games, teams, setTab, setFormContent }: GamesProps) => {
  const teamString = teams?.map((team) => team.name).join(', ')
  const gameTable = games.map((game) => {
    const homeTeamId = teams?.find(
      (team) => team.name === game.homeTeam,
    )?.teamId
    const awayTeamId = teams?.find(
      (team) => team.name === game.awayTeam,
    )?.teamId

    return {
      ...game,
      homeTeamId: homeTeamId?.toString() ?? 'Fel namn',
      awayTeamId: awayTeamId?.toString() ?? 'Fel namn',
    }
  })
  return (
    <div>
      <div className="mb-4 text-sm">Lag:{teamString}</div>

      {gameTable ? (
        <BulkGameForm
          gameArray={gameTable}
          setTab={setTab}
          setFormContent={setFormContent}
        />
      ) : null}
    </div>
  )
}

export default GameTable
