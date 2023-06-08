import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'
import { Link } from 'react-router-dom'

const Seasons = () => {
  const { data, isLoading, error } = useQuery('allSeasons', getSeasons)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>There was an error</div>
  }

  const seasons = data

  return (
    <div className="flex flex-row space-x-12">
      <div>
        <h2>Herrar</h2>
        <ul className="grid grid-cols-4 gap-4">
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
        <ul className="grid grid-cols-4 gap-4">
          {seasons.map((season) => {
            if (season.women) {
              return (
                <li key={season.seasonId}>
                  <Link to="/season" state={{ seasonId: season.id }}>
                    {season.year}
                  </Link>
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
