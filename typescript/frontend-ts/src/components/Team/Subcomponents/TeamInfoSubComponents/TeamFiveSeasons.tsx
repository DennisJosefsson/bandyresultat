import { SingleTeamTable } from '../../../types/tables/tables'
import TeamTable from './TeamTable'

type FiveSeasons = {
  season: string
  tables: SingleTeamTable[]
}

type TeamFiveSeasonsTablesProps = { tableArray: FiveSeasons[] }

const TeamFiveSeasonsTables = ({ tableArray }: TeamFiveSeasonsTablesProps) => {
  const sortedSeasons = (a: FiveSeasons, b: FiveSeasons) => {
    if (a.season < b.season) {
      return 1
    } else if (a.season > b.season) {
      return -1
    } else return 0
  }

  return (
    <div className="mb-6">
      {tableArray.sort(sortedSeasons).map((season) => {
        return (
          <div key={season.season}>
            <TeamTable tabeller={season.tables} season={season.season} />
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
