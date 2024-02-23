import { Dispatch, SetStateAction } from 'react'
import { GameObjectType } from '../../../types/games/games'
import { groupConstant } from '../../../utilitycomponents/functions/constants'
import { TableObjectType } from '../../../types/tables/tables'

type ColstartsType = {
  [key: string]: string
}

type GroupType = {
  group: string
  dates: {
    date: string
    games: GameObjectType[]
  }[]
}

type TableType = {
  group: string
  tables: TableObjectType[]
}

type DefaultComponentProps = {
  group: GroupType
  colStarts: ColstartsType
  setGameData: Dispatch<SetStateAction<GameObjectType[] | null>>
  setShowPopup: Dispatch<SetStateAction<boolean>>
  playoffGames: GameObjectType[]
  favTeams: number[]
  tables: TableType[]
}

const DefaultComponent = ({
  group,
  colStarts,
  setGameData,
  playoffGames,
  setShowPopup,
  favTeams,
  tables,
}: DefaultComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer rounded bg-white p-2 shadow-md`
    : 'cursor-pointer rounded bg-white p-2 shadow-md md:col-start-4 md:odd:col-start-2'

  let resultString
  const tableObject = tables.find(
    (tableGroup) => tableGroup.group === group.group,
  )
  if (tables.length === 0) {
    resultString = '0-0'
  } else if (tableObject) {
    const actualTableObject = tableObject.tables.find(
      (team) => team.team === group.dates[0].games[0].homeTeamId,
    )
    if (!actualTableObject) {
      resultString = ''
      return
    }
    resultString = `${actualTableObject.totalWins}-${actualTableObject.totalWins}`
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
                    favTeams.includes(game.homeTeamId) ? 'font-bold' : undefined
                  }
                >
                  {game.homeTeam.casualName}
                </span>
                <span>-</span>
                <span
                  className={
                    favTeams.includes(game.awayTeamId) ? 'font-bold' : undefined
                  }
                >
                  {game.awayTeam.casualName}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DefaultComponent
