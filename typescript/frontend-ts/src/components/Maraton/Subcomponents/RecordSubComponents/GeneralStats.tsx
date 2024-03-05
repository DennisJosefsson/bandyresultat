import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import { GeneralStatsResponse } from '../../../types/games/streaks'

type GeneralStatsProps = {
  data: GeneralStatsResponse
}

const GeneralStats = ({ data }: GeneralStatsProps) => {
  const { women } = useGenderContext()
  return (
    <div className="ml-4 xl:ml-0">
      {!women && (
        <>
          <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Säsonger
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Sedan 1931
              </h3>
              <div className="table">
                {data.seasons.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.seasons}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.seasons}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Säsonger totalt
              </h3>
              <div className="table">
                {data.allSeasons?.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.seasons}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.seasons}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Slutspel
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Sedan 1931
              </h3>
              <div className="table">
                {data.playoffs.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.playoffs}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.playoffs}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Slutspel totalt
              </h3>
              <div className="table">
                {data.allPlayoffs?.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.playoffs}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.playoffs}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Guld
              </h3>
              <div className="table">
                {data.golds.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.guld}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.guld}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Spelade
              </h3>
              <div className="table">
                {data.finals.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.finals}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.finals}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {women && (
        <>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Säsonger
              </h3>
              <div className="table">
                {data.seasons.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.seasons}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.seasons}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Slutspel
              </h3>
              <div className="table">
                {data.playoffs.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.playoffs}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.playoffs}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Guld
              </h3>
              <div className="table">
                {data.golds.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.guld}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.guld}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Spelade
              </h3>
              <div className="table">
                {data.finals.map((team, index) => {
                  return (
                    <div
                      className="recordCard"
                      key={`${team.finals}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.casual_name}</div>
                          <div className="count">{team.finals}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GeneralStats
