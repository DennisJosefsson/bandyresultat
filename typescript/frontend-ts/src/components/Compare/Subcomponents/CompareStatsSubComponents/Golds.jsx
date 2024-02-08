const Golds = ({ golds }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold md:text-base lg:text-right">
        SM-Guld
      </h3>
      <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
        <thead>
          <tr key={`head-golds`}>
            <th scope="col" className="w-32"></th>
            <th scope="col" className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {golds.map((team) => {
            return (
              <tr key={team.team} className="rounded">
                <td>{team.casual_name}</td>
                <td className="text-right">{team.guld}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Golds
