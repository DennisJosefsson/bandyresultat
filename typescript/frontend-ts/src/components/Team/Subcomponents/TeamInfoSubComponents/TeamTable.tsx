import {
  groupConstant,
  sortOrder,
} from '../../../utilitycomponents/functions/constants'

const TeamTable = ({ tableArray }) => {
  const sortedTables = tableArray.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }
    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
  return (
    <div className="mb-6">
      {sortedTables.map((category, index) => {
        return (
          <div key={category.category} className="mb-6">
            <h2 className="text-sm font-bold xs:text-base md:text-xl">
              {groupConstant[category.category]}
            </h2>

            <div>
              <table className="w-full table-fixed text-[10px] xxs:text-xs md:w-[30rem] md:text-sm lg:text-base">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      M
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      V
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      O
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      F
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      GM
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      IM
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      MS
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 text-right xl:w-8 xl:px-1 xl:py-2"
                    >
                      P
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="rounded odd:bg-slate-300">
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_games}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_wins}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_draws}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_lost}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_goals_scored}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_goals_conceded}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">
                      {category.total_goal_difference}
                    </td>
                    <td className="p px-1 py-2 text-right tabular-nums">
                      {category.total_points}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TeamTable
