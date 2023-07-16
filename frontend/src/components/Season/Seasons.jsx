import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'
import { Link } from 'react-router-dom'

const Seasons = () => {
  const { data, isLoading, error } = useQuery('allSeasons', getSeasons)
  if (isLoading) {
    return <div className="max-w-6xl mx-auto">Loading...</div>
  }

  if (error) {
    return <div className="max-w-6xl mx-auto">There was an error</div>
  }

  const seasons = data

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <h2>Säsonger</h2>
        <div className="grid grid-cols-4 gap-2">
          {seasons.map((season) => {
            const seasonYear =
              parseInt(season.year.split('/')[1]) >= 1964
                ? season.year.split('/')[1]
                : season.year
            if (!season.women) {
              return (
                <div key={season.seasonId}>
                  {season.year}:{' '}
                  <Link to={`/season/${seasonYear}`}>Tabeller</Link> -{' '}
                  <Link to={`/season/${seasonYear}`}>Matcher</Link>
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
