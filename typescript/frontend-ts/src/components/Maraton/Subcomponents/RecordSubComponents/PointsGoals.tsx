import { PointsGoalsResponse } from '../../../types/games/streaks'

const PointsGoals = ({ data }: { data: PointsGoalsResponse }) => {
  return (
    <div className="ml-4 xl:ml-0">
      <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        Högsta
      </h3>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt
          </h3>
          <div className="table">
            {data.avgMaxAll.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt Hemma
          </h3>
          <div className="table">
            {data.avgMaxHome.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt Borta
          </h3>
          <div className="table">
            {data.avgMaxAway.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        Lägsta
      </h3>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt
          </h3>
          <div className="table">
            {data.avgMinAll.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt Hemma
          </h3>
          <div className="table">
            {data.avgMinHome.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Genomsnitt Borta
          </h3>
          <div className="table">
            {data.avgMinAway.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        Högsta
      </h3>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt
          </h3>
          <div className="table">
            {data.sumMaxAll.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt Hemma
          </h3>
          <div className="table">
            {data.sumMaxHome.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt Borta
          </h3>
          <div className="table">
            {data.sumMaxAway.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        Lägsta
      </h3>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt
          </h3>
          <div className="table">
            {data.sumMinAll.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt Hemma
          </h3>
          <div className="table">
            {data.sumMinHome.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Totalt Borta
          </h3>
          <div className="table">
            {data.sumMinAway.map((team, index) => {
              return (
                <div
                  className="recordCard"
                  key={`${team.data}-${Math.random()}`}
                >
                  <div className="pos">{index + 1}</div>
                  <div className="flex flex-col">
                    <div className="record1st">
                      <div className="name">{team.lag.name}</div>
                      <div className="count">{team.data}</div>
                    </div>
                    <div className="record2nd">
                      <div className="dates">{team.season.year}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsGoals
