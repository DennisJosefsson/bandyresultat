import { groupConstant, sortOrder } from '../utilitycomponents/constants'

const TeamTable = ({ tableArray }) => {
  const sortedTables = tableArray.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }

    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    }
  })
  return (
    <div className="mb-6">
      {sortedTables.map((category, index) => {
        return (
          <div key={category.category} className="mb-6">
            <h2 className="font-bold text-base md:text-xl">
              {groupConstant[category.category]}
            </h2>

            <div>
              <table className="table-fixed w-full md:w-[30rem] text-sm md:text-base">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      M
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      V
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      O
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      F
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      GM
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      IM
                    </th>
                    <th
                      scope="col"
                      className="w-6 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      MS
                    </th>
                    <th
                      scope="col"
                      className="w-4 px-0.5 py-1 xl:w-8 xl:px-1 xl:py-2 text-right"
                    >
                      P
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="odd:bg-slate-300 rounded">
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
                    <td className="px-1 py-2 p text-right tabular-nums">
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
