import { useState, useEffect } from 'react'
import { roundForRoundSortFunction } from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import {
  RightArrow,
  LeftArrow,
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '../utilitycomponents/icons'

const RoundForRound = ({ array, round, setRound }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  const gameArray = roundForRoundSortFunction(array)

  return (
    <div>
      <div className="flex w-full flex-row items-center justify-between">
        <div
          onClick={() => round > 1 && setRound(round - 1)}
          className={
            round > 1
              ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-left text-[#011d29]'
              : 'mt-3 w-6 cursor-not-allowed rounded-md py-3 text-left text-[#011d29] opacity-25'
          }
        >
          <LeftArrow />
        </div>
        <div className="mt-3 py-1 text-center font-bold">
          {groupConstant[gameArray[0].games[0].group]}
        </div>
        <div
          onClick={() =>
            round < gameArray[0].games.length && setRound(round + 1)
          }
          className={
            round < gameArray[0].games.length
              ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-right text-[#011d29]'
              : 'mt-3 w-6 cursor-not-allowed rounded-md py-3 text-right text-[#011d29] opacity-25'
          }
        >
          <RightArrow />
        </div>
      </div>
      <table className="w-full px-1 text-xs md:text-sm lg:text-base">
        <thead>
          <tr className="roundForRound">
            <th scope="col" className="pos">
              Pos
            </th>
            <th scope="col" className="team">
              Lag
            </th>
            <th scope="col" className="dir"></th>
            <th scope="col">M</th>
            <th scope="col">V</th>
            <th scope="col">O</th>
            <th scope="col">F</th>
            <th scope="col" className="twelve">
              GM
            </th>
            <th scope="col" className="twelve">
              IM
            </th>
            <th scope="col" className="twelve">
              MS
            </th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          {gameArray
            .sort((teamA, teamB) => {
              if (round <= teamA.games.length && round <= teamB.games.length) {
                return (
                  teamA.games[round - 1].rank_position -
                  teamB.games[round - 1].rank_position
                )
              }
              return
            })
            .map((team, index) => {
              return (
                <tr
                  key={`${team.team}-${index}`}
                  className="roundForRound rounded odd:bg-slate-300"
                >
                  <td className="pos">
                    {round <= team.games.length
                      ? `${team.games[round - 1].rank_position}`
                      : `${team.games.at(-1).rank_position}`}
                  </td>
                  {width >= breakpoint && (
                    <td className="team">
                      {round <= team.games.length
                        ? `${team.games[round - 1].casual_name}`
                        : `${team.games.at(-1).casual_name}`}
                    </td>
                  )}
                  {width < breakpoint && (
                    <td className="team">
                      {round <= team.games.length
                        ? `${team.games[round - 1].short_name}`
                        : `${team.games.at(-1).short_name}`}
                    </td>
                  )}
                  <td className="dir">
                    {round <= team.games.length &&
                      round > 1 &&
                      team.games[round - 1].rank_position <
                        team.games[round - 2].rank_position && (
                        <SmallArrowUpRight />
                      )}
                    {round > team.games.length &&
                      team.games.at(-1).rank_position <
                        team.games.at(-2).rank_position && (
                        <SmallArrowUpRight />
                      )}
                    {round <= team.games.length &&
                      round > 1 &&
                      team.games[round - 1].rank_position >
                        team.games[round - 2].rank_position && (
                        <SmallArrowDownRight />
                      )}
                    {round > team.games.length &&
                      team.games.at(-1).rank_position >
                        team.games.at(-2).rank_position && (
                        <SmallArrowDownRight />
                      )}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].round}`
                      : `${team.games.at(-1).round}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_wins}`
                      : `${team.games.at(-1).sum_wins}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_draws}`
                      : `${team.games.at(-1).sum_draws}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_lost}`
                      : `${team.games.at(-1).sum_lost}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_goals_scored}`
                      : `${team.games.at(-1).sum_goals_scored}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_goals_conc}`
                      : `${team.games.at(-1).sum_goals_conc}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_gd}`
                      : `${team.games.at(-1).sum_gd}`}
                  </td>
                  <td>
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_points}`
                      : `${team.games.at(-1).sum_points}`}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RoundForRound
