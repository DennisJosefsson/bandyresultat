import { Link } from 'react-router-dom'

const SeasonsList = ({ seasons }) => {
  return (
    <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
      {seasons.map((season) => {
        const seasonYear =
          parseInt(season.year.split('/')[1]) >= 1964
            ? season.year.split('/')[1]
            : season.year
        if (!season.women) {
          return (
            <div
              key={season.seasonId}
              className="flex flex-row items-center justify-between bg-white px-2 py-1 text-sm lg:text-base"
            >
              <div className="w-28 font-semibold">{season.year}</div>
              <div className="rounded-md bg-slate-300 px-2 py-1 text-center lg:bg-white xl:p-0">
                <Link
                  to={`/season/${seasonYear}?tab=tables`}
                  className="font-medium tabular-nums hover:font-bold lg:font-normal"
                >
                  Tabeller
                </Link>
              </div>
              <div className="rounded-md bg-slate-300 px-2 py-1 text-center lg:bg-white xl:p-0">
                <Link
                  to={`/season/${seasonYear}?tab=games`}
                  className="font-medium hover:font-bold lg:font-normal"
                >
                  Matcher
                </Link>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default SeasonsList
