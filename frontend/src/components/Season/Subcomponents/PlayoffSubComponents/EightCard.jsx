import { groupConstant } from '../../../utilitycomponents/Functions/constants'

const EightCard = ({
  group,
  colStarts,
  setGameData,
  playoffGames,
  setShowPopup,
  favTeams,
}) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer rounded bg-white p-2 shadow-md`
    : 'cursor-pointer rounded bg-white p-2 shadow-md'
  return (
    <div
      key={group.group}
      className={styleClass}
      onClick={() => {
        setGameData(playoffGames.filter((game) => game.group === group.group))
        setShowPopup(true)
      }}
    >
      <h4 className="text-sm font-bold">{groupConstant[group.group]}</h4>
      <div>
        {group.tables.map((team) => {
          return (
            <div
              key={`${team.team}-${Math.random()}`}
              className="flex flex-row justify-between"
            >
              <span
                className={
                  favTeams.includes(team.team) ? 'flex-1 font-bold' : 'flex-1'
                }
              >
                {team.lag.casualName}
              </span>
              <span className="mr-2 w-6 text-right tabular-nums">
                {team.totalPoints}
              </span>
              <span className="w-6 text-right tabular-nums">
                {team.totalGoalDifference}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EightCard
