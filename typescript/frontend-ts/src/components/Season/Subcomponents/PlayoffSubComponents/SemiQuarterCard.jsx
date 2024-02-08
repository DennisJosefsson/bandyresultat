import { groupConstant } from '../../../utilitycomponents/functions/constants'

const SemiQuarterCard = ({
  group,
  colStarts,
  setGameData,
  playoffGames,
  setShowPopup,
  favTeams,
}) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer rounded bg-white p-2 shadow-md`
    : 'cursor-pointer rounded bg-white p-2 shadow-md md:col-start-4 md:odd:col-start-2'

  return (
    <div
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
                className={favTeams.includes(team.team) ? 'font-bold' : null}
              >
                {team.lag.casualName}
              </span>
              <span className="text-right tabular-nums">{team.total_wins}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SemiQuarterCard
