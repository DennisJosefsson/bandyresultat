import { CompareResponseObjectType } from '../../../types/teams/compare'
import { CompareFormState } from '../../../types/teams/teams'

type PlayoffProps = {
  playoffs: CompareResponseObjectType['playoffs']
  allPlayoffs: CompareResponseObjectType['allPlayoffs']
  compObject: CompareFormState
}

const Playoffs = ({ playoffs, allPlayoffs, compObject }: PlayoffProps) => {
  return (
    <div>
      <div>
        <h3 className="text-sm font-semibold md:text-base lg:text-right">
          Slutspel
        </h3>
        <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
          <thead>
            <tr key={`head-playoffs`}>
              <th scope="col" className="w-32 text-left"></th>
              <th scope="col" className="w-8 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {allPlayoffs.map((team) => {
              return (
                <tr key={team.team} className="rounded">
                  <td>{team.casual_name}</td>
                  <td className="text-right">{team.playoffs}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!compObject.women && (
        <div>
          <h3 className="text-sm font-semibold md:text-base lg:text-right">
            Slutspel sedan 1931
          </h3>
          <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
            <thead>
              <tr key={`head-playoffs`}>
                <th scope="col" className="w-32 text-left"></th>
                <th scope="col" className="w-8 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {playoffs.map((team) => {
                return (
                  <tr key={team.team} className="rounded">
                    <td>{team.casual_name}</td>
                    <td className="text-right">{team.playoffs}</td>
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

export default Playoffs
