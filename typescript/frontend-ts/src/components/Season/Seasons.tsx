import { useState, KeyboardEvent } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import {
  Loading,
  DataError,
} from '../utilitycomponents/Components/LoadingOrError'

import useScrollTo from '../../hooks/domHooks/useScrollTo'
import useGetAllSeasons from '@/src/hooks/dataHooks/seasonHooks/useGetAllSeasons'
import { Card, CardContent } from '@/src/@/components/ui/card'

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
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default Seasons
