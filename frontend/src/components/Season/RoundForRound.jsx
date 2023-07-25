import { roundForRoundSortFunction } from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import {
  RightArrow,
  LeftArrow,
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '../utilitycomponents/icons'

const RoundForRound = ({ array, round, setRound }) => {
  const gameArray = roundForRoundSortFunction(array)

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-[40rem]">
        <div
          onClick={() => round > 1 && setRound(round - 1)}
          className={
            round > 1
              ? 'cursor-pointer rounded-md mt-3 py-3 text-[#011d29] text-left w-6'
              : 'cursor-not-allowed rounded-md mt-3 py-3 text-[#011d29] text-left w-6 opacity-25'
          }
        >
          <LeftArrow />
        </div>
        <div className="text-center font-bold mt-3 py-1">
          {groupConstant[gameArray[0].games[0].group]}
        </div>
        <div
          onClick={() =>
            round < gameArray[0].games.length && setRound(round + 1)
          }
          className={
            round < gameArray[0].games.length
              ? 'cursor-pointer rounded-md mt-3 py-3 text-[#011d29] text-right w-6'
              : 'cursor-not-allowed rounded-md mt-3 py-3 text-[#011d29] text-right w-6 opacity-25'
          }
        >
          <RightArrow />
        </div>
      </div>
      <table className="w-[40rem]">
        <thead>
          <tr>
            <th scope="col" className="w-8 px-1 py-2 text-center">
              Pos
            </th>
            <th scope="col" className="w-48 px-1 py-2 text-left">
              Lag
            </th>
            <th scope="col" className="w-8 px-1 py-2"></th>
            <th scope="col" className="w-8 px-1 py-2 text-right">
              M
            </th>
            <th scope="col" className="w-8 px-1 py-2 text-right">
              V
            </th>
            <th scope="col" className="w-8 px-1 py-2 text-right">
              O
            </th>
            <th scope="col" className="w-8 px-1 py-2 text-right">
              F
            </th>
            <th scope="col" className="w-12 px-1 py-2 text-right">
              GM
            </th>
            <th scope="col" className="w-12 px-1 py-2 text-right">
              IM
            </th>
            <th scope="col" className="w-12 px-1 py-2 text-right">
              MS
            </th>
            <th scope="col" className="w-8 px-3 py-2 text-right">
              P
            </th>
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
                  className="odd:bg-slate-300 rounded"
                >
                  <td className="px-1 py-2 text-center">
                    {round <= team.games.length
                      ? `${team.games[round - 1].rank_position}`
                      : `${team.games.at(-1).rank_position}`}
                  </td>
                  <td className="px-1 py-2">
                    {round <= team.games.length
                      ? `${team.games[round - 1].casual_name}`
                      : `${team.games.at(-1).casual_name}`}
                  </td>
                  <td className="opacity-30">
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
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].round}`
                      : `${team.games.at(-1).round}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_wins}`
                      : `${team.games.at(-1).sum_wins}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_draws}`
                      : `${team.games.at(-1).sum_draws}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_lost}`
                      : `${team.games.at(-1).sum_lost}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_goals_scored}`
                      : `${team.games.at(-1).sum_goals_scored}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_goals_conc}`
                      : `${team.games.at(-1).sum_goals_conc}`}
                  </td>
                  <td className="px-1 py-2 text-right tabular-nums">
                    {round <= team.games.length
                      ? `${team.games[round - 1].sum_gd}`
                      : `${team.games.at(-1).sum_gd}`}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
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
