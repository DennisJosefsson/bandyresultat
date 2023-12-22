import TeamTable from './TeamTable'

const TeamFiveSeasonsTables = ({ tableArray }) => {
  const sortedSeasons = (a, b) => {
    if (a.season < b.season) {
      return 1
    }

    if (a.season > b.season) {
      return -1
    }
  }

  return (
    <div className="mb-6">
      {tableArray.sort(sortedSeasons).map((season) => {
        return (
          <div key={season.season}>
            <h2 className="text-sm font-bold xs:text-base md:text-lg">
              {season.season}
            </h2>
            <TeamTable tableArray={season.tables} />
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
