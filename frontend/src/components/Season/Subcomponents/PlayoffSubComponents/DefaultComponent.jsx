import { groupConstant } from '../../../utilitycomponents/Functions/constants'

const DefaultComponent = ({
  group,
  colStarts,
  setGameData,
  playoffGames,
  setShowPopup,
  favTeams,
  tables,
}) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer rounded bg-white p-2 shadow-md`
    : 'cursor-pointer rounded bg-white p-2 shadow-md md:col-start-4 md:odd:col-start-2'

  let resultString
  if (tables.length === 0) {
    resultString = '0-0'
  } else if (
    tables.find((tableGroup) => tableGroup.group === group.group).tables
  ) {
    resultString = `${
      tables
        .filter((tableGroup) => tableGroup.group === group.group)[0]
        .tables.find((team) => team.team === group.dates[0].games[0].homeTeamId)
        .totalWins
    }-${
      tables
        .filter((tableGroup) => tableGroup.group === group.group)[0]
        .tables.find((team) => team.team === group.dates[0].games[0].awayTeamId)
        .totalWins
    }`
  } else {
    resultString = ''
  }

  return (
    <div
      className={styleClass}
      onClick={() => {
        setGameData(playoffGames.filter((game) => game.group === group.group))
        setShowPopup(true)
      }}
    >
      <div className="flex flex-row justify-between">
        <h4 className="text-sm font-bold">{groupConstant[group.group]}</h4>
        <h4 className="text-sm font-bold">{resultString}</h4>
      </div>
      <div>
        {group.dates[0].games.map((game) => {
          return (
            <div
              key={`${game.date}-${Math.random()}`}
              className="flex flex-row justify-between"
            >
              <div>
                <span
                  className={
                    favTeams.includes(game.homeTeamId) ? 'font-bold' : null
                  }
                >
                  {game.homeTeam.casualName}
                </span>
                <span>-</span>
                <span
                  className={
                    favTeams.includes(game.awayTeamId) ? 'font-bold' : null
                  }
                >
                  {game.awayTeam.casualName}
                </span>
              </div>
              <span className="text-right tabular-nums">{game.totalWins}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DefaultComponent
