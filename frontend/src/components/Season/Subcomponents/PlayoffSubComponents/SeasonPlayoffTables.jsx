import { tableSortFunction } from '../../../utilitycomponents/Functions/sortFunction'
import { useContext } from 'react'
import { TeamPreferenceContext } from '../../../../contexts/contexts'
import FinalCard from './FinalCard'
import SemiQuarterCard from './SemiQuarterCard'

import {
  semiColStarts,
  quarterColStarts,
  eightColStarts,
  eightColStartsFourTeams,
} from '../../../utilitycomponents/Functions/constants'

const SeasonPlayoffTables = ({
  tables,
  playoffGames,
  final,
  setGameData,
  setShowPopup,
}) => {
  const { favTeams } = useContext(TeamPreferenceContext)
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
  return (
    <div className="m-0 mt-4 justify-self-center text-base">
      <div className="grid-rows-7 grid gap-6">
        {final.map((game) => {
          return <FinalCard key={game.date} game={game} favTeams={favTeams} />
        })}

        <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
          {semiTables.map((group, index) => {
            return (
              <SemiQuarterCard
                key={`${group.group}-${index}`}
                group={group}
                colStarts={semiColStarts}
                playoffGames={playoffGames}
                setShowPopup={setShowPopup}
                setGameData={setGameData}
                favTeams={favTeams}
              />
            )
          })}
        </div>

        {quarterTables.length !== 2 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-4 md:text-sm">
            {quarterTables.map((group, index) => {
              return (
                <SemiQuarterCard
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={quarterColStarts}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                />
              )
            })}
          </div>
        )}

        {quarterTables.length === 2 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
            {quarterTables.map((group) => {
              return (
                <SemiQuarterCard
                  key={group.group}
                  group={group}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                />
              )
            })}
          </div>
        )}
        {eightTables.length === 2 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-5 md:text-sm">
            {eightTables.map((group) => {
              return (
                <SemiQuarterCard
                  key={group.group}
                  group={group}
                  colStarts={eightColStarts}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
                />
              )
            })}
          </div>
        )}
        {eightTables.length === 4 && (
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-4 md:text-sm">
            {eightTables.map((group) => {
              return (
                <SemiQuarterCard
                  key={group.group}
                  group={group}
                  colStarts={eightColStartsFourTeams}
                  playoffGames={playoffGames}
                  setShowPopup={setShowPopup}
                  setGameData={setGameData}
                  favTeams={favTeams}
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
