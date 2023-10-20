import { useQuery } from 'react-query'

import { getSingleSeasonTable } from '../../requests/tables'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { GenderContext, TeamPreferenceContext } from '../../contexts/contexts'
import { tableSortFunction } from '../utilitycomponents/sortFunction'
import PlayoffSeriesPopup from './PlayoffSeriesPopup'
import Spinner from '../utilitycomponents/spinner'
import {
  groupConstant,
  semiColStarts,
  quarterColStarts,
  eightColStarts,
} from '../utilitycomponents/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Playoff = ({ seasonId }) => {
  const { women } = useContext(GenderContext)
  const { favTeams } = useContext(TeamPreferenceContext)
  const [gameData, setGameData] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const { data, isLoading, error } = useQuery(
    ['singleSeasonTable', seasonId],
    () => getSingleSeasonTable(seasonId),
  )
  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const tables = data.tabell.filter((table) => table.women === women)
  const playoffGames = data.playoffGames.filter(
    (table) => table.women === women,
  )
  const final = playoffGames.filter((games) => games.category === 'final')

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

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center font-inter text-[#011d29]">
        <p>
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  if (playoffGames.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center font-inter font-bold text-[#011d29]">
        Inga slutspelsmatcher än.
      </div>
    )
  }

  return (
    <div>
      {seasonId < 2025 && (
        <div className="m-0 mt-4 justify-self-center text-base">
          <div className="grid-rows-7 grid gap-6">
            {final.map((game) => {
              return (
                <div
                  key={game.date}
                  className="grid w-auto min-w-[25%] grid-cols-1 justify-center rounded bg-white p-2 shadow-md md:mx-auto"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-bold">Final</h4>
                      <h4 className="text-sm font-bold">
                        {dayjs(game.date).format('D MMMM YYYY')}
                      </h4>
                    </div>
                    <div className="mt-1 text-base md:text-xl">
                      <span
                        className={
                          favTeams.includes(game.homeTeam.teamId)
                            ? 'font-bold'
                            : null
                        }
                      >
                        {game.homeTeam.name}
                      </span>
                      -
                      <span
                        className={
                          favTeams.includes(game.awayTeam.teamId)
                            ? 'font-bold'
                            : null
                        }
                      >
                        {game.awayTeam.name}
                      </span>{' '}
                      {game.result}
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-5 md:text-base">
              {semiTables.map((group, index) => {
                return (
                  <div
                    key={`${group.group}-${index}`}
                    className={`${
                      semiColStarts[group.group]
                    } cursor-pointer rounded bg-white p-2 shadow-md`}
                    onClick={() => {
                      setGameData(
                        playoffGames.filter(
                          (game) => game.group === group.group,
                        ),
                      )
                      setShowPopup(true)
                    }}
                  >
                    <h4 className="text-sm font-bold">
                      {groupConstant[group.group]}
                    </h4>
                    <div>
                      {group.tables.map((team) => {
                        return (
                          <div
                            key={`${team.team}-${Math.random()}`}
                            className="flex flex-row justify-between"
                          >
                            <span
                              className={
                                favTeams.includes(team.team)
                                  ? 'font-bold'
                                  : null
                              }
                            >
                              {team.lag.casualName}
                            </span>
                            <span className="text-right">
                              {team.total_wins}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {quarterTables.length !== 2 && (
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-4 md:text-base">
                {quarterTables.map((group) => {
                  return (
                    <div
                      key={group.group}
                      className={`${
                        quarterColStarts[group.group]
                      } cursor-pointer rounded bg-white p-2 shadow-md`}
                      onClick={() => {
                        setGameData(
                          playoffGames.filter(
                            (game) => game.group === group.group,
                          ),
                        )
                        setShowPopup(true)
                      }}
                    >
                      <h4 className="text-sm font-bold">
                        {groupConstant[group.group]}
                      </h4>
                      <div>
                        {group.tables.map((team) => {
                          return (
                            <div
                              key={`${team.team}-${Math.random()}`}
                              className="flex flex-row justify-between"
                            >
                              <span
                                className={
                                  favTeams.includes(team.team)
                                    ? 'font-bold'
                                    : null
                                }
                              >
                                {team.lag.casualName}
                              </span>
                              <span className="text-right">
                                {team.total_wins}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {quarterTables.length === 2 && (
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-5 md:text-base">
                {quarterTables.map((group) => {
                  return (
                    <div
                      key={group.group}
                      className="cursor-pointer rounded bg-white p-2 shadow-md md:col-start-4 md:odd:col-start-2"
                      onClick={() => {
                        setGameData(
                          playoffGames.filter(
                            (game) => game.group === group.group,
                          ),
                        )
                        setShowPopup(true)
                      }}
                    >
                      <h4 className="text-sm font-bold">
                        {groupConstant[group.group]}
                      </h4>
                      <div>
                        {group.tables.map((team) => {
                          return (
                            <div
                              key={`${team.team}-${Math.random()}`}
                              className="flex flex-row justify-between"
                            >
                              <span
                                className={
                                  favTeams.includes(team.team)
                                    ? 'font-bold'
                                    : null
                                }
                              >
                                {team.lag.casualName}
                              </span>
                              <span className="text-right">
                                {team.total_wins}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {eightTables.length === 2 && (
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-5 md:text-base">
                {eightTables.map((group) => {
                  return (
                    <div
                      key={group.group}
                      className={`${
                        eightColStarts[group.group]
                      } cursor-pointer rounded bg-white p-2 shadow-md`}
                      onClick={() => {
                        setGameData(
                          playoffGames.filter(
                            (game) => game.group === group.group,
                          ),
                        )
                        setShowPopup(true)
                      }}
                    >
                      <h4 className="text-sm font-bold">
                        {groupConstant[group.group]}
                      </h4>
                      <div>
                        {group.tables.map((team) => {
                          return (
                            <div
                              key={`${team.team}-${Math.random()}`}
                              className="flex flex-row justify-between"
                            >
                              <span
                                className={
                                  favTeams.includes(team.team)
                                    ? 'flex-1 font-bold'
                                    : 'flex-1'
                                }
                              >
                                {team.lag.casualName}
                              </span>
                              <span className="mr-2 w-6 text-right">
                                {team.total_points}
                              </span>
                              <span className="w-6 text-right">
                                {team.total_goal_difference}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {eightTables.length === 4 && (
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-4 md:text-base">
                {eightTables.map((group) => {
                  return (
                    <div
                      key={group.group}
                      className="cursor-pointer rounded bg-white p-2 shadow-md"
                      onClick={() => {
                        setGameData(
                          playoffGames.filter(
                            (game) => game.group === group.group,
                          ),
                        )
                        setShowPopup(true)
                      }}
                    >
                      <h4 className="text-sm font-bold">
                        {groupConstant[group.group]}
                      </h4>
                      <div>
                        {group.tables.map((team) => {
                          return (
                            <div
                              key={`${team.team}-${Math.random()}`}
                              className="flex flex-row justify-between"
                            >
                              <span
                                className={
                                  favTeams.includes(team.team)
                                    ? 'flex-1 font-bold'
                                    : 'flex-1'
                                }
                              >
                                {team.lag.casualName}
                              </span>
                              <span className="mr-2 w-6 text-right">
                                {team.total_points}
                              </span>
                              <span className="w-6 text-right">
                                {team.total_goal_difference}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <PlayoffSeriesPopup gameData={gameData} setShowPopup={setShowPopup} />
      )}
    </div>
  )
}

export default Playoff
