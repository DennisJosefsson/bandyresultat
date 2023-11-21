const Seasons = ({ seasons, allSeasons, compObject }) => {
  return (
    <div>
      <div>
        <h3 className="text-sm font-semibold md:text-base lg:text-right">
          Säsonger
        </h3>
        <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
          <thead>
            <tr key={`head-seasons`}>
              <th scope="col" className="w-32 text-left"></th>
              <th scope="col" className="w-8 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {allSeasons.map((team) => {
              return (
                <tr key={team.team} className="rounded">
                  <td>{team.casual_name}</td>
                  <td className="text-right">{team.seasons}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!compObject.women && (
        <div className="w-full">
          <h3 className="text-sm font-semibold md:text-base lg:text-right">
            Säsonger sedan 1931
          </h3>
          <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
            <thead>
              <tr key={`head-seasons`}>
                <th scope="col" className="w-32 text-left"></th>
                <th scope="col" className="w-8 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((team) => {
                return (
                  <tr key={team.team} className="rounded">
                    <td>{team.casual_name}</td>
                    <td className="text-right">{team.seasons}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Seasons
