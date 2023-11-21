import {
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '../../../utilitycomponents/Components/icons'

const AnimationTable = ({
  dateArray,
  round,
  seriesArray,
  favTeams,
  group,
  seriesInfo,
}) => {
  const displayArrow = (teamId) => {
    const prevPos = dateArray[round - 1].table.find(
      (team) => team.teamId === teamId,
    ).position
    const currPos = dateArray[round].table.find(
      (team) => team.teamId === teamId,
    ).position

    if (prevPos === currPos) {
      return ''
    } else if (prevPos < currPos) {
      return <SmallArrowDownRight />
    } else if (prevPos > currPos) {
      return <SmallArrowUpRight />
    }
  }

  return (
    <div className="mx-2 mt-4 xl:mx-0">
      <table className="season w-full text-xs md:text-sm ">
        <thead>
          <tr>
            <th scope="col" className="pos"></th>
            <th scope="col" className="team"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {dateArray[round]?.table.map((team, index) => {
            return (
              <tr
                key={`${team.teamId}-${index}`}
                className={`season ${
                  seriesArray
                    .find((serie) => serie.serieGroupCode === group)
                    .serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-black'
                    : null
                } ${
                  favTeams.includes(team.teamId) ? 'font-bold' : null
                } odd:bg-slate-300`}
              >
                <td className="pos">{team.position}</td>
                <td className="team">{team.casualName}</td>
                <td className="text-slate-100">
                  {round > 0 &&
                    team.table.games > 0 &&
                    displayArrow(team.teamId)}
                </td>
                <td>{team.table.games}</td>
                <td>{team.table.wins}</td>
                <td>{team.table.draws}</td>
                <td>{team.table.lost}</td>
                <td className="twelve">{team.table.scoredGoals}</td>
                <td className="twelve">{team.table.concededGoals}</td>
                <td className="twelve">
                  {team.table.scoredGoals - team.table.concededGoals}
                </td>
                <td>{team.table.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {seriesInfo.find((serie) => serie.serieGroupCode === group).comment && (
        <p className="bg-white p-1 text-xs font-bold">
          {seriesInfo.find((serie) => serie.serieGroupCode === group).comment}
        </p>
      )}
    </div>
  )
}

export default AnimationTable
