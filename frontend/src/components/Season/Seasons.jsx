import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'
import { Link } from 'react-router-dom'
import Spinner from '../utilitycomponents/spinner'

const Seasons = () => {
  const { data, isLoading, error } = useQuery('allSeasons', getSeasons)
  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const seasons = data

  return (
    <div className="max-w-7xl min-h-screen mx-auto">
      <div className="self-center">
        <h1 className="text-center text-2xl font-bold mb-4">Säsonger</h1>
        <div className="grid grid-cols-4 gap-2 justify-between ml-20">
          {seasons.map((season) => {
            const seasonYear =
              parseInt(season.year.split('/')[1]) >= 1964
                ? season.year.split('/')[1]
                : season.year
            if (!season.women) {
              return (
                <div key={season.seasonId}>
                  {season.year}:{' '}
                  <Link
                    to={`/season/${seasonYear}`}
                    className="hover:font-bold"
                  >
                    Tabeller
                  </Link>{' '}
                  -{' '}
                  <Link to={`/games/${seasonYear}`} className="hover:font-bold">
                    Matcher
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Seasons
