import {
  gameSortFunction,
  tableSortFunction,
} from '../../../utilitycomponents/functions/sortFunction'

import FinalCard from './FinalCard'
import NilComponent from './NilComponent'
import NilFinalComponent from './NilFinalComponent'
import DefaultComponent from './DefaultComponent'
import {
  semiColStarts,
  quarterColStarts,
  quarterColStartsTwoQuarter,
  eightColStarts,
  eightColStartsFourTeams,
} from '../../../utilitycomponents/functions/constants'
import { SingleSeasonTableObjectType } from '../../../types/tables/tables'
import { GameObjectType } from '../../../types/games/games'
import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'
import { Dispatch, SetStateAction } from 'react'

type SeasonPlayoffTablesProps = {
  tables: SingleSeasonTableObjectType[]
  playoffGames: GameObjectType[]
  final: GameObjectType[]
  setGameData: Dispatch<SetStateAction<GameObjectType[] | null>>
  setShowPopup: Dispatch<SetStateAction<boolean>>
  women: boolean
  seasonId: number
}

const SeasonPlayoffTables = ({
  tables,
  playoffGames,
  final,
  setGameData,
  setShowPopup,
  women,
  seasonId,
}: SeasonPlayoffTablesProps) => {
  const { favTeams } = useTeampreferenceContext()

  const unsortedSemiTables = tables.filter((table) => table.category === 'semi')
  const unsortedQuarterTables = tables.filter(
    (table) => table.category === 'quarter',
  )
  const unsortedEightTables = tables.filter(
    (table) => table.category === 'eight',
  )

  const semiTables = tableSortFunction(unsortedSemiTables)
  const quarterTables = tableSortFunction(unsortedQuarterTables)
  const eightTables = tableSortFunction(unsortedEightTables)

  const sortedPlayoffGames = gameSortFunction(playoffGames)

  const eightGames = sortedPlayoffGames.filter(
    (group) => group.group[0] === 'E',
  )
  const quarterGames = sortedPlayoffGames.filter(
    (group) => group.group[0] === 'Q',
  )

  const semiGames = sortedPlayoffGames.filter((group) => group.group[0] === 'S')

  const nilSemiGroups = ['S1', 'S2']
  const nilQuarterGroups = ['Q1', 'Q2', 'Q3', 'Q4']
  const nilEightGroups = ['E1', 'E2']

  return (
    <div className="m-0 mt-4 justify-self-center text-base">
      <div className="grid grid-rows-7 gap-6">
        {final.length === 0 && <NilFinalComponent />}
        {final.length > 0 && (
          <>
            {final.map((game) => {
              return (
                <FinalCard key={game.date} game={game} favTeams={favTeams} />
              )
            })}
          </>
        )}

        <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
          {semiGames.length === 0 && seasonId === 2024 && (
            <>
              {nilSemiGroups.map((group, index) => {
                return (
                  <NilComponent
                    key={`{Math.random()}-${group}-${index}`}
                    group={group}
                    colStarts={semiColStarts}
                  />
                )
              })}
            </>
          )}
          {semiGames.length > 0 && (
            <>
              {semiGames.map((group, index) => {
                return (
                  <DefaultComponent
                    key={`${group.group}-${index}`}
                    group={group}
                    colStarts={semiColStarts}
                    playoffGames={playoffGames}
                    setShowPopup={setShowPopup}
                    setGameData={setGameData}
                    favTeams={favTeams}
                    tables={semiTables}
                  />
                )
              })}
            </>
          )}
        </div>
        {quarterGames.length === 0 && seasonId === 2024 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-4 md:text-sm">
            {nilQuarterGroups.map((group, index) => {
              return (
                <NilComponent
                  key={`{Math.random()}-${group}-${index}`}
                  group={group}
                  colStarts={quarterColStarts}
                />
              )
            })}
          </div>
        )}
        {quarterGames.length !== 2 && quarterGames.length !== 0 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-4 md:text-sm">
            {quarterGames.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={quarterColStarts}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                  tables={quarterTables}
                />
              )
            })}
          </div>
        )}

        {quarterGames.length === 2 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
            {quarterGames.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={quarterColStartsTwoQuarter}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                  tables={quarterTables}
                />
              )
            })}
          </div>
        )}
        {eightGames.length === 0 && seasonId === 2024 && !women && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
            {nilEightGroups.map((group, index) => {
              return (
                <NilComponent
                  key={`{Math.random()}-${group}-${index}`}
                  group={group}
                  colStarts={eightColStarts}
                />
              )
            })}
          </div>
        )}
        {eightGames.length === 2 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
            {eightGames.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={eightColStarts}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                  tables={eightTables}
                />
              )
            })}
          </div>
        )}
        {eightGames.length === 4 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-4 md:text-sm">
            {eightGames.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={eightColStartsFourTeams}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                  tables={eightTables}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
