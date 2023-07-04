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
        <h2>Herrar</h2>
        <ul>
          {seasons.map((season) => {
            if (!season.women) {
              return (
                <li key={season.seasonId}>
                  <Link to={`/season/${season.seasonId}`}>{season.year}</Link>
                </li>
              )
            }
          })}
        </ul>
      </div>
      <div>
        <h2>Damer</h2>
        <ul>
          {seasons.map((season) => {
            if (season.women) {
              return (
                <li key={season.seasonId}>
                  <Link to={`/season/${season.seasonId}`}>{season.year}</Link>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default Seasons
