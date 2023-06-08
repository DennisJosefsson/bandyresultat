import { useQuery } from 'react-query'
import { getSingleSeason } from '../../requests/seasons'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../utilitycomponents/spinner'
import MetadataForm from '../Metadata/MetadataForm2'

const Season = () => {
  const { seasonId } = useParams()
  const [showModal, setShowModal] = useState(false)

  const { data, isLoading, error } = useQuery(['allSeasons', seasonId], () =>
    getSingleSeason(seasonId)
  )
  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>There was an error</div>
  }

  const season = data
  console.log(season)

  return (
    <div className="flex flex-row">
      <div className="">
        <h3>Lag:</h3>
        <ul>
          {season.teams.map((team) => {
            if (!team.teamseason.qualification)
              return <li key={team.teamId}>{team.name}</li>
          })}
        </ul>
        <hr />
        Kvallag:
        <ul>
          {season.teams.map((team) => {
            if (team.teamseason.qualification)
              return <li key={team.teamId}>{team.name}</li>
          })}
        </ul>
      </div>
      <div>
        <div className="">
          <h2>
            Säsong {season.year} {season.women ? 'Damer' : 'Herrar'}
          </h2>
          <p>
            <button onClick={() => setShowModal(true)}>
              Redigera metadata
            </button>
          </p>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Modal Title</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <MetadataForm
                      seasonId={seasonId}
                      name={season.year}
                      teams={season.teams.filter(
                        (team) => !team.teamseason.qualification
                      )}
                    />
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
        <div className="">
          <table>
            <tbody>
              {season.tables.map((team) => {
                return (
                  <tr key={team.teamId}>
                    <td>{team.position}:</td>
                    <td>
                      {season.teams.find((x) => x.teamId === team.teamId).name}
                    </td>
                    <td>{team.points}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Season
