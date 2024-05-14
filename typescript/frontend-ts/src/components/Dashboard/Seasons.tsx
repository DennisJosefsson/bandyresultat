import { useState, KeyboardEvent } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import {
  Loading,
  DataError,
} from '../utilitycomponents/Components/LoadingAndError/LoadingOrError'
import useScrollTo from '../../hooks/domHooks/useScrollTo'
import useGetAllSeasons from '../../hooks/dataHooks/seasonHooks/useGetAllSeasons'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const { seasons, isLoading, error } = useGetAllSeasons()

  useScrollTo()

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl font-inter text-foreground">
      <FilterComponent
        seasonFilter={seasonFilter}
        setSeasonFilter={setSeasonFilter}
        handleKeyDown={handleKeyDown}
      />

      <div className="self-center">
        <SeasonsList
          seasons={seasons.filter((season) =>
            season.year.includes(seasonFilter),
          )}
        />
      </div>
    </div>
  )
}

export default Seasons
